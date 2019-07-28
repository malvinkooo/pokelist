<template>
    <v-flex xs12 class="my-2">
        <v-card @click="$emit('cardClicked', id)" class="pa-3 card">
            <v-layout>
                <v-flex xs3>
                    <div class="img-container">
                        <div class="img-inner">
                            <img :src="frontImg" class="img-front" />
                            <img :src="backImg" class="img-back" />
                        </div>
                    </div>
                </v-flex>
                <v-flex xs9>
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">{{ name }}</div>
                            <div>Вес: {{ weight }}. Рост: {{ height }}. Опыт: {{ base_experience }}.</div>
                            <v-btn
                                flat
                                color="red accent-1"
                                class="ma-0"
                                @click="$emit('cardClicked', id)"
                            >Подробнее</v-btn>
                        </div>
                    </v-card-title>
                </v-flex>
            </v-layout>
        </v-card>
    </v-flex>
</template>
<script>
export default {
    data() {
        return {
            defaultPokeImg: "./default_poke.png"
        };
    },

    props: ["name", "weight", "height", "base_experience", "sprites", "id"],

    computed: {
        frontImg() {
            return this.sprites.front_default
                ? this.sprites.front_default
                : this.defaultPokeImg;
        },

        backImg() {
            return this.sprites.back_default
                ? this.sprites.back_default
                : this.defaultPokeImg;
        }
    }
};
</script>
<style scoped>
.card {
    cursor: pointer;
}

.headline {
    text-transform: capitalize;
}

.img-container {
    background-color: transparent;
    width: 95px;
    height: 95px;
    perspective: 1000px;
    margin: 0 auto;
}

.img-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    margin: 0 auto;
}

.img-back,
.img-front {
    position: absolute;
    left: 0;
    backface-visibility: hidden;
}

.img-back {
    transform: rotateY(180deg);
}

.img-container:hover .img-inner {
    transform: rotateY(180deg);
}
</style>