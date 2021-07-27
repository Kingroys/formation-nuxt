<template>
    <div class="container-fluid">
        <NuxtLink to="/users" exact-active-class="active">Users</NuxtLink>
        <NuxtLink to="/users/create" exact-active-class="active">Create</NuxtLink>
        <NuxtChild />
    </div>
</template>

<script>
export default {
    name: 'Index',
}
</script>
