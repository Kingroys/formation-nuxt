<template>
    <div class="container-fluid">
        <div>
            <h1>Random users</h1>
            <hr/>
            <button @click="fetchUsers" class="btn btn-primary">Random users</button>
            <select v-model="selectedGender">
                <option value="">Genre</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
            </select>
            <input type="text" v-model="searchQuery" placeholder="Query..."/>

            <button @click="toggleFormVisibility" class="btn btn-secondary">Formulaire</button>
            <div
                id="form-container"
                v-if="formVisibility"
            >
                <span v-if="errorVisibility" class="errors">Tous les champs sont obligatoires !</span>
                <br>
                <form @submit.prevent="addUser">
                    <div class="row">
                        <div class="col">
                            <select v-model="form.gender" class="form-control">
                                <option disabled value="">Genre</option>
                                <option value="female">Femme</option>
                                <option value="male">Homme</option>
                            </select>
                            <input type="text" v-model="form.name.first" placeholder="Prénom" class="form-control" />
                            <input type="text" v-model="form.name.last" placeholder="Nom" class="form-control" />
                        </div>
                        <div class="col">
                            <input type="text" v-model="form.dob.age" placeholder="Age" class="form-control" />
                            <input type="text" v-model="form.email" placeholder="email" class="form-control" />
                            <input type="text" v-model="form.phone" placeholder="tel" class="form-control" />
                        </div>
                        <input type="submit" class="btn btn-primary" value="Valider">
                    </div>
                </form>
            </div>
        </div>
        <table id="tbl-users" class="table table-hover">
            <thead>
            <tr>
                <th></th>
                <th>Genre</th>
                <th @click="setOrderBy()">
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
            </tr>
            </thead>
            <tbody v-cloak>
            <tr v-for="user in filteredUsers">
                <td><img :src="user.picture.thumbnail"></td>
                <td>{{user.gender}}</td>
                <td>{{user.dob.age}}</td>
                <td>{{ user.name.first }} {{user.name.last}}</td>
                <td>{{user.email}}</td>
                <td>{{user.phone}}</td>
            </tr>
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

export default {
    name: 'Index',
    data() {
        return {
            users: [],
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
            this.$axios('https://randomuser.me/api/?results=20').then(({data: {results}}) => {
                this.users = results;
                console.log(results);
            });
        },
        setOrderBy() {
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
        toggleFormVisibility() {
            this.formVisibility = !this.formVisibility;
        },
        addUser() {
            if (this.isValidForm()) {
                this.errorVisibility = false;
                this.users = [{...this.form, id: 1}, ...this.users];
                this.form = emptyForm();
            } else {
                this.errorVisibility = true;
            }
        },
        isValidForm() {
            return true;
        }
    },
    computed: {
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
        this.fetchUsers();
    }
}
</script>

<style>
[v-cloak] {
    display: none;
}
.errors {
    color: red;
    font-weight: bold;
}
</style>