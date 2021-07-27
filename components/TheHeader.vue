<template>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label for="gender">Genre</label>
                <select id="gender" class="form-control" :value="selectedGender" @change="event => $emit('update:selectedGender', event.target.value)">
                    <option value="">Genre</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                </select>
            </div>
        </div>
        <div class="col">
            <div class="form-group">
                <label for="query">Recherche</label>
                <input id="query" class="form-control" type="text" :value="searchQuery" @change="event => $emit('update:searchQuery', event.target.value)" placeholder="Query..."/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheHeader",
    props: ['selectedGender', 'searchQuery'],
}
</script>

<style scoped>

</style>