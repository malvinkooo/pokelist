<template>
    <div>
        <v-container>
            <v-layout justify-space-between align-center>
                <v-flex xs12 sm8 md3>
                    <v-select :items="displayItems" label="Показать" @change="onSelectChanged"></v-select>
                </v-flex>
                <v-flex xs12 sm8 md2 text-xs-right>
                    <v-btn icon class="ma-0" @click="setCardsMode('list')">
                        <v-icon
                            large
                            :color="cardsType === 'list' ? 'red accent-1': ''"
                        >view_headline</v-icon>
                    </v-btn>
                    <v-btn icon class="ma-0" @click="setCardsMode('tile')">
                        <v-icon large :color="cardsType === 'tile' ? 'red accent-1': ''">apps</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container>
            <v-layout row wrap justify-flex-start v-if="cardsType === 'list'">
                <PokeCardInline v-for="(poke, index) in pokeList" v-bind="poke" :key="index"></PokeCardInline>
            </v-layout>

            <v-layout row wrap justify-flex-start v-else-if="cardsType === 'tile'">
                <PokeCardTile v-for="(poke, index) in pokeList" v-bind="poke" :key="index"></PokeCardTile>
            </v-layout>
        </v-container>

        <v-container>
            <v-layout>
                <v-flex text-xs-right>
                    <v-pagination
                        class="mt-4"
                        color="red accent-1"
                        v-model="currentPage"
                        :length="pagination.length"
                        :total-visible="pagination.totalVisible"
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
    fetch({store, query}) {
        return store.dispatch("getPokeList", {
                page: Number(query.page),
                offset: Number(query.offset),
                limit: Number(query.limit)
            }
        );
    },

    data() {
        return {
            displayItems: ["5", "10", "20", "30"],
            pagination: {
                length: null,
                totalVisible: 6
            },
            cardsType: "list",
        };
    },

    created() {
        this.pagination['length'] = Math.ceil(this.$store.state.count / this.$store.state.currentLimit);
    },

    computed: {
        pokeList() {
            return this.$store.state.pokeList;
        },

        currentPage() {
            return this.$store.state.currentPage;
        }
    },

    methods: {
        setCardsMode(type) {
            this.cardsType = type;
        },

        onSelectChanged(val) {
            let offset = this.currentPage === 1 ? 0 : ((this.currentPage - 1) * Number(val));
            console.log(offset);

            this.$router.push(`/?page=${this.currentPage}&offset=${offset}&limit=${Number(val)}`);
            this.$store.dispatch("getPokeList", {page: this.currentPage, limit: Number(val), offset});
        },

        onPageChange(page) {
            let offset = page === 1 ? 0 : ((page - 1) * this.$store.state.currentLimit);

            this.$router.push(`/?page=${page}&offset=${offset}&limit=${this.$store.state.currentLimit}`);
            this.$store.dispatch("getPokeList", {page, limit: this.$store.state.currentLimit, offset});
        },
    },

    components: {
        PokeCardTile,
        PokeCardInline
    }
};
</script>
