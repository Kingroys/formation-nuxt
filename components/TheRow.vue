<template>
    <tr>
        <td><img :src="getImage()"></td>
        <td>{{ user.gender }}</td>
        <td>{{ user.dob.age }}</td>
        <td>{{ user.name.first }} {{ user.name.last }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td><a :href="`/users/${user.login.uuid}`">Voir</a></td>
    </tr>
</template>

<script>
export default {
    name: 'TheRow',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        getImage() {
            return this.user.picture.thumbnail ? this.user.picture.thumbnail : 'https://via.placeholder.com/48?Text=No';
        }
    }
}
</script>

<style>

</style>