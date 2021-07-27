<template>
    <div class="container-fluid">
        <h1>Create</h1>
        <hr/>
        <div id="form-container">
            <span v-if="errorVisibility" class="errors">Tous les champs sont obligatoires !</span>
            <form @submit.prevent="addUser">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="gender">Genre</label>
                            <select id="gender" v-model="form.gender" class="form-control">
                                <option disabled value="">Genre</option>
                                <option value="female">Femme</option>
                                <option value="male">Homme</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="firstname">Prénom</label>
                            <input id="firstname" type="text" class="form-control" v-model="form.name.first" placeholder="Prénom"/>
                        </div>
                        <div class="form-group">
                            <label for="lastname">Nom</label>
                            <input id="lastname" type="text" v-model="form.name.last" placeholder="Nom" class="form-control"/>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="age">Age</label>
                            <input id="age" type="text" v-model="form.dob.age" placeholder="Age" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input id="email" type="text" v-model="form.email" placeholder="email" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label for="phone">Téléphone</label>
                            <input id="phone" type="text" v-model="form.phone" placeholder="tel" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <input type="submit" class="btn btn-primary" value="Valider" />
                    </div>
                </div>
            </form>
        </div>
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
        phone: '',
        login: {
            uuid: ''
        }
    };
};

export default {
    name: "create",
    data() {
        return {
            form: emptyForm(),
            errorVisibility: false,
        }
    },
    methods: {
        addUser() {
            if (this.isValidForm()) {
                const uuid = 't' + Math.random() * 1000;
                this.errorVisibility = false;
                this.form.login.uuid = uuid;
                this.$store.commit('users/add', this.form);
                this.form = emptyForm();
                this.$router.push('/users/' + uuid);
            } else {
                this.errorVisibility = true;
            }
        },
        isValidForm() {
            return this.form.gender && this.form.dob.age && this.form.name.first && this.form.name.last && this.form.email && this.form.phone;
        },
    }
}
</script>

<style scoped>
.errors {
    color: red;
    font-weight: bold;
}
</style>