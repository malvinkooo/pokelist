<template>
    <v-flex xs12 class="my-2">
        <v-card class="pa-3">
            <v-layout>
                <v-flex xs3>
                    <v-img
                        :src="frontImg"
                        height="auto"
                        max-height="100px"
                        width="auto"
                        max-width="100%"
                        contain
                    ></v-img>
                </v-flex>
                <v-flex xs9>
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">{{ name }}</div>
                            <div>Вес: {{ weight }}. Рост: {{ height }}. Опыт: {{ base_experience }}.</div>
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
    props: ["name", "weight", "height", "base_experience", "sprites"],

    computed: {
        frontImg() {
            return this.sprites.front_default;
        }
    }
};
</script>
<style>
.headline {
    text-transform: capitalize;
}
</style>