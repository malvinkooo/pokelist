<template>
    <v-flex xs12 class="my-2">
        <v-card class="pa-3">
            <v-layout>
                <v-flex xs3>
                    <div class="img-container">
                        <div class="img-inner">
                            <v-img :src="frontImg" contain class="img-front"></v-img>
                            <v-img :src="backImg" contain class="img-back"></v-img>
                        </div>
                    </div>
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
        },

        backImg() {
            return this.sprites.back_default;
        }
    }
};
</script>
<style>
.headline {
    text-transform: capitalize;
}

.img-container {
    background-color: transparent;
    width: 100%;
    height: 100%;
    perspective: 1000px;
}

.img-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.img-back,
.img-front {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.img-back {
    transform: rotateY(180deg);
}

.img-container:hover .img-inner {
    transform: rotateY(180deg);
}
</style>