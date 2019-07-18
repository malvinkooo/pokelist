<template>
    <v-flex xs12 sm6 lg4>
        <v-card class="ma-2 pt-2">
            <v-img
                src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                contain
                height="200px"></v-img>

            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ name }}</div>
                    <span class="grey--text">{{ weight }}</span>
                </div>
            </v-card-title>

            <v-card-actions>
                <v-btn flat color="red accent-1" class="ma-0">Подробнее</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>
<script>
export default {
    props: ["name", "weight"]
}
</script>