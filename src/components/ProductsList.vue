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
    <div class="container mx-auto px-4 text-center py-6">
        <div class="flex items-center justify-center mb-10">
            <span class="inline-block w-12 h-1 bg-[var(--color-secondary)] rounded-full mr-4"></span>

            <h1 class="text-5xl sm:text-6xl font-extrabold drop-shadow-lg text-transparent bg-clip-text bg-[var(--color-secondary)] 
                [text-shadow:2px_2px_0_#9d9e9e,-2px_2px_0_#dd0c0c,2px_-2px_0_#dd0c0c,-2px_-2px_0_#dd0c0c,2px_0px_0_#dd0c0c,0px_2px_0_#dd0c0c,-2px_0px_0_#dd0c0c,0px_-2px_0_#dd0c0c]">
                🏆 Productos Top
            </h1>

            <span class="inline-block w-12 h-1 bg-[var(--color-secondary)] rounded-full ml-4"></span>
        </div>

        <div v-if="store.products.length === 0" class="text-gray-500">
            Cargando productos...
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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