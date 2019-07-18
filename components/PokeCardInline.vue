<template>
    <v-flex xs12 class="my-2">
        <v-card class="pa-3">
            <v-layout>
                <v-flex xs3>
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                        height="125px"
                        contain
                    ></v-img>
                </v-flex>
                <v-flex xs9>
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">{{ name }}</div>
                            <div>{{ weight }}</div>
                            <v-btn flat color="red accent-1" class="ma-0">Подробнее</v-btn>
                        </div>
                    </v-card-title>
                </v-flex>
            </v-layout>
        </v-card>
    </v-flex>
</template>
<script>
export default {
    props: ["name", "weight"]
}
</script>