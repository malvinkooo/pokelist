<template>
    <v-flex xs12 sm6 lg4>
        <v-card class="ma-2 pt-2">
            <div class="img-container">
                <div class="img-inner">
                    <v-img :src="frontImg" contain class="img-front"></v-img>
                    <v-img :src="backImg" contain class="img-back"></v-img>
                </div>
            </div>

            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ name }}</div>
                    <span
                        class="grey--text"
                    >Вес: {{ weight }}. Рост: {{ height }}. Опыт: {{ base_experience }}.</span>
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
    width: 100px;
    height: 100px;
    perspective: 1000px;
    margin: 0 auto;
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

.v-image__image--contain {
    background-size: auto;
}
</style>