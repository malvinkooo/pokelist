<template>
    <v-container>
        <v-layout wrap v-if="poke">
            <v-flex xs12 mt-3 mb-4>
                <router-link :to="lastPokeListPage" class="link">
                    <v-icon>arrow_back</v-icon>
                </router-link>
            </v-flex>
            <v-flex xs12 sm3>
                <v-img :src="frontImg" contain max-height="200"></v-img>
            </v-flex>
            <v-flex xs12 sm9>
                <v-card-title primary-title>
                    <div>
                        <div class="headline my-2">{{ poke.name }}</div>
                        <div>Вес: {{ poke.weight }}</div>
                        <div>Рост: {{ poke.height }}</div>
                        <div>Опыт: {{ poke.base_experience }}</div>
                    </div>
                </v-card-title>
            </v-flex>
            <v-flex xs12>
                <v-card class="my-2">
                    <v-card-title>
                        <h4 class="display-1">Abilities:</h4>
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex
                                xs12
                                sm6
                                class="px-1"
                                v-for="(ability, index) in poke.abilities"
                                :key="index"
                            >
                                <h5 class="headline">{{ ability.name }}</h5>

                                <div v-for="(effect, index) in ability.effect_entries" :key="index">
                                    <p>
                                        <span class="font-weight-medium">Effect:</span>
                                        {{ effect.effect }}
                                    </p>
                                    <p>
                                        <span class="font-weight-medium">Short effect:</span>
                                        {{ effect.short_effect }}
                                    </p>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>

                <v-card class="my-2">
                    <v-card-title>
                        <h4 class="display-1">Stats:</h4>
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex v-for="(stat, index) in poke.stats" :key="index" xs12 sm6>
                                <h5 class="headline">{{ stat.name }}</h5>
                                <p>
                                    <span class="font-weight-medium">Affecting moves, decrease:</span>
                                    <span
                                        v-for="(move, index) in stat.affecting_moves.decrease"
                                        :key="index"
                                    >{{ move.move.name }},</span>
                                </p>
                                <p>
                                    <span class="font-weight-medium">Affecting moves, increase:</span>
                                    <span
                                        v-for="(move, index) in stat.affecting_moves.increase"
                                        :key="index"
                                    >{{ move.move.name }},</span>
                                </p>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>

                <v-card class="my-2">
                    <v-card-title>
                        <h4 class="display-1">Types:</h4>
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex
                                xs12
                                class="px-1"
                                v-for="(type, index) in poke.types"
                                :key="index"
                            >
                                <h5 class="headline">{{ type.name }}</h5>
                                <p class="font-weight-bold">Damage relations:</p>

                                <v-layout wrap>
                                    <v-flex xs12 sm6>
                                        <p>
                                            <span class="font-weight-medium">Double damage from:</span>
                                            <span
                                                v-for="(itm, index) in type.damage_relations.double_damage_from"
                                                :key="index"
                                            >{{ itm.name }},</span>
                                        </p>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <p>
                                            <span class="font-weight-medium">Double damage to:</span>
                                            <span
                                                v-for="(itm, index) in type.damage_relations.double_damage_to"
                                                :key="index"
                                            >{{ itm.name }},</span>
                                        </p>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <p>
                                            <span class="font-weight-medium">Half damage from:</span>
                                            <span
                                                v-for="(itm, index) in type.damage_relations.half_damage_from"
                                                :key="index"
                                            >{{ itm.name }},</span>
                                        </p>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <p>
                                            <span class="font-weight-medium">Half damage to:</span>
                                            <span
                                                v-for="(itm, index) in type.damage_relations.half_damage_to"
                                                :key="index"
                                            >{{ itm.name }},</span>
                                        </p>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <p>
                                            <span class="font-weight-medium">No damage from:</span>
                                            <span
                                                v-for="(itm, index) in type.damage_relations.no_damage_from"
                                                :key="index"
                                            >{{ itm.name }},</span>
                                        </p>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <p>
                                            <span class="font-weight-medium">No damage to:</span>
                                            <span
                                                v-for="(itm, index) in type.damage_relations.no_damage_to"
                                                :key="index"
                                            >{{ itm.name }},</span>
                                        </p>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>

                <v-card v-if="poke.location_area_encounters.length" class="my-2">
                    <v-card-title>
                        <h4 class="display-1">Location area encounters:</h4>
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex
                                xs12
                                sm6
                                class="px-1"
                                v-for="(area, index) in poke.location_area_encounters"
                                :key="index"
                            >
                                <div>
                                    <p>{{ area.location_area.name }}</p>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>

                <v-card class="my-2">
                    <v-card-title>
                        <h4 class="display-1">Species:</h4>
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex xs12 class="px-1">
                                <v-layout wrap>
                                    <v-flex xs12 sm6>
                                        <div class="my-2">
                                            <p class="font-weight-medium my-0">Base happiness:</p>
                                            <span>{{ poke.species.base_happiness }}</span>
                                        </div>
                                    </v-flex>

                                    <v-flex xs12 sm6>
                                        <div class="my-2">
                                            <p class="font-weight-medium my-0">Capture rate:</p>
                                            <span>{{ poke.species.capture_rate }}</span>
                                        </div>
                                    </v-flex>

                                    <v-flex xs12 sm6>
                                        <div class="my-2">
                                            <p class="font-weight-medium my-0">Color:</p>
                                            <span>{{ poke.species.color.name }}</span>
                                        </div>
                                    </v-flex>

                                    <v-flex xs12 sm6 v-if="poke.species.habitat">
                                        <div class="my-2">
                                            <p class="font-weight-medium my-0">Habitat:</p>
                                            <span>{{ poke.species.habitat.name }}</span>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            poke: null,
            defaultPokeImg: "./default_poke.png"
        };
    },

    asyncData({ params, store }) {
        return store.dispatch("getPokeDetails", params.id).then(response => {
            return {
                poke: response
            };
        });
    },

    computed: {
        frontImg() {
            return this.poke.sprites.front_default
                ? this.poke.sprites.front_default
                : this.defaultPokeImg;
        },

        lastPokeListPage() {
            return `/?offset=${this.$store.state.currentOffset}&limit=${this.$store.state.currentLimit}`
        },
    },
};
</script>
<style scoped>
.theme--light.v-sheet {
    border-top: 2px solid #ff8a80;
}

.v-image__image--contain {
    background-size: auto;
}

p {
    word-break: break-word;
}
</style>  