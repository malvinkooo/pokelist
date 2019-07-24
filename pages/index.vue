<template>
    <div>
        <v-container>
            <v-layout justify-space-between align-center>
                <v-flex xs12 sm8 md3>
                    <v-select
                        :items="displayItems"
                        label="Показать"
                        :value="currentLimit"
                        @change="onSelectChanged"
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm8 md2 text-xs-right>
                    <v-btn icon class="ma-0" @click="toggleCardsType">
                        <v-icon
                            large
                            color="red accent-1"
                        >{{ isCardsList ? "view_headline" : "apps"}}</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container>
            <v-layout row wrap justify-flex-start v-if="isCardsList">
                <PokeCardInline v-for="(poke, index) in pokeList" v-bind="poke" :key="index" @cardClicked="onCardClick"></PokeCardInline>
            </v-layout>

            <v-layout row wrap justify-flex-start v-else>
                <PokeCardTile v-for="(poke, index) in pokeList" v-bind="poke" :key="index" @cardClicked="onCardClick"></PokeCardTile>
            </v-layout>
        </v-container>

        <v-container>
            <v-layout>
                <v-flex text-xs-right>
                    <v-pagination
                        class="mt-4"
                        color="red accent-1"
                        v-model="currentPage"
                        :length="length"
                        :total-visible="totalVisible"
                        @input="onPageChange"
                    ></v-pagination>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import PokeCardInline from "~/components/PokeCardInline.vue";
import PokeCardTile from "~/components/PokeCardTile.vue";

import axios from "axios";

export default {
    fetch({ store, query }) {
        return store.dispatch("getPokeList", {
            offset: Number(query.offset) || undefined,
            limit: Number(query.limit) || undefined
        });
    },

    data() {
        return {
            displayItems: [5, 10, 20, 30],
            totalVisible: 6,
            isCardsList: true
        };
    },

    computed: {
        pokeList() {
            return this.$store.getters.pokeList;
        },

        currentPage() {
            const { currentOffset, currentLimit } = this.$store.state;
            return currentOffset / currentLimit
                ? currentOffset / currentLimit + 1
                : 1;
        },

        currentLimit: {
            get() {
                return this.$store.state.currentLimit;
            },

            set(newLimit) {
                this.$store.commit("setCurrentLimit", newLimit);
            }
        },

        length() {
            const { count, currentLimit } = this.$store.state;
            return Math.ceil(count / currentLimit);
        }
    },

    methods: {
        toggleCardsType() {
            this.isCardsList = !this.isCardsList;
        },

        onSelectChanged(val) {
            let offset =
                this.currentPage === 1
                    ? 0
                    : (this.currentPage - 1) * Number(val);

            this.$router.push(`/?offset=${offset}&limit=${Number(val)}`);
            this.$store.dispatch("getPokeList", {
                page: this.currentPage,
                limit: Number(val),
                offset
            });
        },

        onPageChange(page) {
            let offset =
                page === 1 ? 0 : (page - 1) * this.$store.state.currentLimit;

            this.$router.push(
                `/?offset=${offset}&limit=${this.$store.state.currentLimit}`
            );
            this.$store.dispatch("getPokeList", {
                page,
                limit: this.$store.state.currentLimit,
                offset
            });
        },

        onCardClick(id) {
            this.$router.push(`/${id}`);
        }
    },

    components: {
        PokeCardTile,
        PokeCardInline
    }
};
</script>
