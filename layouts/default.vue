<template>
    <v-app>
        <v-toolbar color="red accent-1" dark>
            <router-link to="/" class="link">
                <v-icon>home</v-icon>
                <v-toolbar-title>PokeList</v-toolbar-title>
            </router-link>
        </v-toolbar>

        <v-content>
            <nuxt />
        </v-content>
    </v-app>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>
<style >
.link {
    color: inherit;
    text-decoration: none;
    width: auto;
    display: flex;
}
</style>
