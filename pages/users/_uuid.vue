<template>
    <div class="container-fluid">
        <img :src="user.picture.thumbnail">
        <h1>{{ user.name.first }} {{ user.name.last }}</h1>
        <hr/>
        <ul class="list-group">
            <li class="list-group-item">{{ user.gender }}</li>
            <li class="list-group-item">{{ user.dob.age }}</li>
            <li class="list-group-item">{{ user.email }}</li>
            <li class="list-group-item">{{ user.phone }}</li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "uuid",
    computed: {
        ...mapGetters('users', [
            'getByUuid'
        ]),
        user() {
            return this.getByUuid(this.$route.params.uuid);
        },
    }
}
</script>

<style scoped>

</style>