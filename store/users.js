export const state = () => ({
    list: []
});

export const getters = {
    getByUuid: (state) => (uuid) => {
        return state.list.find(user => user.login.uuid === uuid)
    }
};

// Sync
export const mutations = {
    setList(state, list) {
        state.list = list;
    },
    add(state, user) {
        state.list.unshift(user);
    },
}

// Async
export const actions = {
    fetch({state, commit}) {
        if (!state.list.length && process.browser) {
            return this.$axios('https://randomuser.me/api/?results=20').then(({data: {results}}) => {
                commit('setList', results);
            });
        }
    },
}