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
        <h1 class="text-6xl text-gray-800 font-bold mb-10">Productos top</h1>

        <div v-if="store.products.length === 0" class="text-gray-500">
            Cargando productos...
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ProductCard v-for="product in store.products" :key="product.id" :product="product" class="w-full"/>
        </div>
    </div>
</template>