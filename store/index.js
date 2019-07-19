import axios from "axios";

export const state = () => ({
    pokeList: [],
    count: null,
    currentPage: null,
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

    setCurrentPage(state, page) {
        state.currentPage = page;
    }
}

export const actions = {
    getPokeList(context, {page=1, offset=0, limit=5}) {
        context.commit("setCurrentOffset", offset);
        context.commit("setCurrentLimit", limit);
        context.commit("setCurrentPage", page);

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

    getPokeInfo(context, pokeName) {
        return axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    }
}