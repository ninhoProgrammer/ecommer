<script setup>
    import { onMounted } from 'vue'
    import { useStore } from '../store'
    import ProductCard from './ProductCard.vue'

    const store = useStore()

    defineProps({
        product: {
            type: Array,
            required: true
        }
    })

    onMounted(() => {
        store.loadTopProductPerCategory()
    })
</script>

<template>
    <div class="items-center text-center p-4 md:p-10">
        <div class="flex items-center justify-center mb-5 md:mb-10">
            <span class="inline-block w-12 h-1 rounded-full mr-4"></span>

            <h1 class="gradient-overlay text-4xl 2xl:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-6">
                🏆 Productos Top
            </h1>

            <span class="inline-block w-12 h-1 rounded-full ml-4"></span>
        </div>

        <div v-if="store.products.length === 0" class="text-center py-10">
            <h2 class="gradient-overlay text-2xl md:text-4xl 2xl:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-6">
                Cargando producto...
            </h2>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
            <ProductCard v-for="product in store.products" :key="product.id" :product="product" class="w-full"/>
        </div>
    </div>
</template>

<style scoped>
            .text-outline {
                /* Para navegadores Chromium */
                -webkit-text-stroke: 2px #dd0c0c;
                /* Fallback para otros navegadores */
                text-shadow:
                    2px 2px 0 #222,
                    -2px 2px 0 #222,
                    2px -2px 0 #222,
                    -2px -2px 0 #222,
                    2px 0px 0 #222,
                    0px 2px 0 #222,
                    -2px 0px 0 #222,
                    0px -2px 0 #222;
            }
            </style>