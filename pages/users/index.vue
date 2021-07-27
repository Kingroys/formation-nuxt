<template>
    <div class="container-fluid">
        <div>
            <h1>Users</h1>
            <hr/>
            <TheHeader
                :selectedGender.sync="selectedGender"
                :searchQuery.sync="searchQuery"
            ></TheHeader>
        </div>
        <table id="tbl-users" class="table table-hover">
            <thead>
            <tr>
                <th></th>
                <th>Genre</th>
                <th @click="sortByAge()">
                    <i
                        class="fa"
                        :class="{'fa-sort-numeric-asc': orderByType === 'asc', 'fa-sort-numeric-desc': orderByType === 'desc'}"
                        aria-hidden="true"
                        v-if="orderByType"
                    ></i>
                    Age
                </th>
                <th>Nom</th>
                <th>Email</th>
                <th>Tel</th>
                <th>Lien</th>
            </tr>
            </thead>
            <tbody v-cloak>
            <TheRow
                v-for="user in filteredUsers"
                :key="user.email"
                :user="user"
            ></TheRow>
            </tbody>
        </table>
    </div>
</template>

<script>
const emptyForm = () => {
    return {
        picture: {
            thumbnail: ''
        },
        gender: '',
        dob: {
            age: ''
        },
        name: {
            first: '',
            last: ''
        },
        email: '',
        phone: ''
    };
};

import {mapState} from 'vuex';
import ClientOnly from 'vue-client-only';

export default {
    name: 'Index',
    components: {
        ClientOnly
    },
    data() {
        return {
            selectedGender: '',
            searchQuery: '',
            orderByType: '',
            formVisibility: false,
            errorVisibility: false,
            form: emptyForm(),
        }
    },
    methods: {
        fetchUsers() {
            return this.$store.dispatch('users/fetch');
        },
        sortByAge() {
            switch (this.orderByType) {
                case '':
                    this.orderByType = 'asc';
                    break;
                case 'asc':
                    this.orderByType = 'desc';
                    break;
                case 'desc':
                    this.orderByType = '';
                    break;
            }
        },
    },
    computed: {
        ...mapState('users', {
            'users': 'list'
        }),
        filteredUsers() {
            let users = [...this.users];
            if (this.selectedGender !== '') {
                users = users.filter(user => user.gender === this.selectedGender);
            }
            if (this.searchQuery !== '') {
                users = users.filter(user => user.name.first.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            if (this.orderByType !== '') {
                users = users.sort((a, b) => {
                    const sortResult = a.dob.age - b.dob.age;
                    return this.orderByType === 'desc' ? -sortResult : sortResult;
                });
            }

            return users;
        }
    },
    created() {
        return this.fetchUsers();
    }
}
</script>

<style>
[v-cloak] {
    display: none;
}

.active {
    font-weight: bold;
}
</style>