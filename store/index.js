import axios from "axios";

export const state = () => ({
    pokeList: [],
    count: null,
});

export const mutations = {
    setPokeList(state, pokeList) {
        state.pokeList = pokeList;
    },

    setTotalPokeCount(state, count) {
        state.count = count;
    },

    setDetect(state, param) {
        state.detect = param;
    }
}

export const actions = {
    getPokeList(context) {
        return axios
            .get("https://pokeapi.co/api/v2/pokemon/?limit=5&offset=0")
            .then(response => {
                context.commit("setTotalPokeCount", response.data.count);

                let arr = response.data.results.map(poke => context.dispatch("getPokeInfo", poke.name))

                return Promise.all(arr)
                    .then(res => {
                        context.commit("setPokeList", res.map(itm => itm.data));
                    })
            })
    },

    getPokeInfo(context, pokeName) {
        return axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    }
}