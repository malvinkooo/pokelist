<template>
    <v-app>
        <v-toolbar color="red accent-1" dark>
            <v-icon>home</v-icon>
            <v-toolbar-title>PoleList</v-toolbar-title>
        </v-toolbar>

        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [
                {
                    icon: "apps",
                    title: "Welcome",
                    to: "/"
                },
                {
                    icon: "bubble_chart",
                    title: "Inspire",
                    to: "/inspire"
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: "Vuetify.js"
        };
    }
};
</script>
