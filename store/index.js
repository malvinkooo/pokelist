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
}
