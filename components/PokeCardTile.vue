<template>
    <v-flex xs12 sm6 lg4>
        <v-card class="ma-2 pt-2">
            <v-img
                src=""
                contain
                height="200px"></v-img>

            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ name }}</div>
                    <span class="grey--text">Вес: {{ weight }}. Рост: {{ height }}. Опыт: {{ base_experience }}.</span>
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
    created() {
        console.log(this.sprites);
    },

    props: ["name", "weight", "height", "base_experience", "sprites"]
}
</script>
<style>
.headline {
    text-transform: capitalize;
}
</style>