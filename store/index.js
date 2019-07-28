import axios from "axios";

export const state = () => ({
    pokeList: [],
    count: null,
    currentLimit: null,
    currentOffset: null,
});

export const mutations = {
    setPokeList(state, pokeList) {
        state.pokeList = pokeList;
    },

    setTotalPokeCount(state, count) {
        state.count = count;
    },

    setCurrentOffset(state, offset) {
        state.currentOffset = offset;
    },

    setCurrentLimit(state, limit) {
        state.currentLimit = limit;
    },
}

export const getters = {
    pokeList: state => {
        return state.pokeList;
    },
}

export const actions = {
    getPokeList(context, {
        offset = 0,
        limit = 5
    }) {
        context.commit("setCurrentOffset", offset);
        context.commit("setCurrentLimit", limit);

        return axios
            .get(`https://pokeapi.co/api/v2/pokemon/?limit=${context.state.currentLimit}&offset=${context.state.currentOffset}`)
            .then(response => {
                context.commit("setTotalPokeCount", response.data.count);

                let arr = response.data.results.map(poke => context.dispatch("getPokeInfo", poke.name))

                return Promise.all(arr)
                    .then(res => {
                        context.commit("setPokeList", res.map(itm => itm.data));
                    })
            })
    },

    getPokeInfo(context, poke) {
        return axios
            .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    },

    getAbility(context, ability) {
        return axios.get(`https://pokeapi.co/api/v2/ability/${ability}/`)
    },

    getAbilitiesList(context, abilitiesList) {
        let result = null;
        const abilitiesPromises = abilitiesList.map(itm => context.dispatch("getAbility", itm.ability.name));

        return Promise.all(abilitiesPromises)
            .then(res => {
                result = res.map(itm => {
                    const {
                        name,
                        effect_entries
                    } = itm.data;

                    return {
                        name,
                        effect_entries
                    }
                });

                return result;
            })
    },

    getStat(context, stat) {
        return axios.get(`https://pokeapi.co/api/v2/stat/${stat}/`)
    },

    getStatsList(context, statsList) {
        let result = null;
        const statsPromises = statsList.map(itm => context.dispatch("getStat", itm.stat.name));

        return Promise.all(statsPromises)
            .then(res => {
                result = res.map(itm => {
                    const {
                        name,
                        affecting_moves,
                        affecting_natures
                    } = itm.data;

                    return {
                        name,
                        affecting_moves,
                        affecting_natures
                    }
                });

                return result;
            })
    },

    getType(context, type) {
        return axios.get(`https://pokeapi.co/api/v2/type/${type}/`)
    },

    getTypesList(context, typesList) {
        let result = null;
        const typesPromises = typesList.map(itm => context.dispatch("getType", itm.type.name));

        return Promise.all(typesPromises)
            .then(res => {
                result = res.map(itm => {
                    const {
                        name,
                        damage_relations
                    } = itm.data;
                    return {
                        name,
                        damage_relations
                    }
                });

                return result;
            })
    },

    getSpecies(context, species) {
        return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${species}/`)
            .then(res => {
                const {
                    base_happiness,
                    capture_rate,
                    color,
                    habitat
                } = res.data;

                return {
                    base_happiness,
                    capture_rate,
                    color,
                    habitat
                }
            })
    },

    getLocationAreas(context, poke) {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}/encounters`)
            .then(res => res.data)
    },

    getPokeDetails(context, pokeId) {
        return context.dispatch("getPokeInfo", pokeId)
            .then(response => {
                const {
                    abilities,
                    stats,
                    types,
                    species,
                    name,
                    height,
                    weight,
                    sprites,
                    base_experience
                } = response.data;

                const data = {
                    abilities: null,
                    stats: null,
                    types: null,
                    species: null,
                    location_area_encounters: null,
                    name,
                    height,
                    weight,
                    sprites,
                    base_experience
                };

                return context.dispatch("getAbilitiesList", abilities)
                    .then(abilitiesResults => (data.abilities = abilitiesResults, data))
                    .then(data => {
                        return context.dispatch("getStatsList", stats)
                            .then(res => (data.stats = res, data))
                    })
                    .then(data => {
                        return context.dispatch("getTypesList", types)
                            .then(res => (data.types = res, data))
                    })
                    .then(data => {
                        return context.dispatch("getSpecies", species.name)
                            .then(res => (data.species = res, data))
                    })
                    .then(data => {
                        return context.dispatch("getLocationAreas", pokeId)
                            .then(res => (data.location_area_encounters = res, data))
                    })
            });
    }
}
