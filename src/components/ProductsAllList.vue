<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '../store'
import ProductCard from './ProductCard.vue'

const store = useStore()
const search = ref('')

onMounted(() => {
    if (store.products.length === 0) {
        store.loadProducts()
    }
})

const filteredProducts = computed(() => {
    if (!search.value) return store.products

    return store.products.filter(product =>
        product.name.toLowerCase().includes(search.value.toLowerCase())
    )
})
</script>
<template>
    <div class="px-6 py-10">

        <h1 class="gradient-overlay text-6xl text-center font-bold mb-6">
            Productos
        </h1>

        <!-- 🔍 Buscador -->
        <div class="max-w-xl mx-auto mb-10">
            <input
                v-model="search"
                type="text"
                placeholder="Buscar producto..."
                class="w-full px-5 py-3 rounded-xl bg-(--color-primary) text-white
                       placeholder-(--color-accent) border focus:border-(--color-degrade)
                       focus:outline-none focus:ring-2 focus:ring-(--color-secondary) transition"
            />
        </div>

        <!-- Loading -->
        <div v-if="store.products.length === 0" class="flex flex-col items-center py-20 gap-4">
            <div class="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <h2 class="text-2xl font-bold">Cargando productos...</h2>
        </div>

        <!-- Sin resultados -->
        <div v-else-if="filteredProducts.length === 0" class="text-center py-20 text-xl opacity-70">
            No se encontraron productos 😢
        </div>

        <!-- Productos -->
        <div v-else
             class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ProductCard
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
            />
        </div>

    </div>
</template>