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
        store.loadProducts()
    })
</script>

<template>
    <div class="container mt-6 px-6 py-10">
        <h1 class="gradient-overlay text-6xl text-center font-bold mb-4">Productos</h1>

        <div v-if="store.products.length === 0" class="text-center py-10">
            <h2 class="gradient-overlay text-2xl md:text-4xl 2xl:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-6">
                Cargando producto...
            </h2>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ProductCard v-for="product in store.products" :key="product.id" :product="product" class="w-full"/>
        </div>
    </div>
</template>