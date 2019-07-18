<template>
    <v-container>
        <v-layout justify-space-between align-center>
            <v-flex xs12 sm8 md3>
                <v-select :items="displayItems" label="Показать"></v-select>
            </v-flex>
            <v-flex xs12 sm8 md2 text-xs-right>
                <v-btn icon class="ma-0" @click="setCardsMode('list')">
                    <v-icon large :color="cardsType === 'list' ? 'red accent-1': ''">view_headline</v-icon>
                </v-btn>
                <v-btn icon class="ma-0" @click="setCardsMode('tile')">
                    <v-icon large :color="cardsType === 'tile' ? 'red accent-1': ''">apps</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <v-layout row wrap justify-space-between>
            <PokeCardInline v-if="cardsType === 'list'"></PokeCardInline>
            <PokeCardTile v-else-if="cardsType === 'tile'"></PokeCardTile>
        </v-layout>

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
</template>

<script>
import PokeCardInline from "~/components/PokeCardInline.vue";
import PokeCardTile from "~/components/PokeCardTile.vue";

import axios from 'axios';

export default {
    fetch ({ store, params }) {
        console.log("store!!!!!!!!!!!!!!:", store);
        return axios.get("https://pokeapi.co/api/v2/evolution-chain/?limit=5&offset=5").then(res => {
            store.commit('setPokeList', res.data.results)
            store.commit('setTotalPokeCount', res.data.count)
        });
    },

    data() {
        return {
            displayItems: ["10", "20", "30"],
            pagination: {
                page: 1,
                length: 4,
                totalVisible: 4
            },
            cardsType: "list",
        };
    },

    created() {
        console.log(this.$store.state.count);
    },

    methods: {
        setCardsMode(type) {
            this.cardsType = type;
        }
    },

    components: {
        PokeCardTile,
        PokeCardInline
    }
};
</script>
