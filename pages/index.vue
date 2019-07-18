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
                        v-model="pagination.page"
                        :length="pagination.length"
                        :total-visible="pagination.totalVisible"
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
    fetch({ store, params }) {
        return store.dispatch("getPokeList");
    },

    data() {
        return {
            displayItems: ["5", "10", "20", "30"],
            pagination: {
                page: 1,
                length: 4,
                totalVisible: 4
            },
            cardsType: "list"
        };
    },

    created() {
        console.log(this.$store.state.pokeList);
    },

    computed: {
        pokeList() {
            return this.$store.state.pokeList;
        }
    },

    methods: {
        setCardsMode(type) {
            this.cardsType = type;
        },

        onSelectChanged(val) {
            this.$store.dispatch("getPokeList", val);
        }
    },

    components: {
        PokeCardTile,
        PokeCardInline
    }
};
</script>
