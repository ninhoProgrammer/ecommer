<script setup>
    import { useStore } from '../store'
    import { computed } from 'vue'

    const props = defineProps({
        product: {
            type: Object,
            required: true
        }
    })

    const store = useStore()

    const inCart = computed(() => store.cart.some(item => item.id === props.product.id))

    function addToCart() {
        if (!inCart.value) {
            store.addToCart(props.product)
            console.log('✅ Added to cart:', props.product)
        }
    }

    function removeFromCart() {
        store.removeFromCart(props.product.id)
        console.log('🗑️ Removed from cart:', props.product)
    }

    function viewDetails() {
        window.location.href = `/product/${props.product.id}`
    }
</script>

<template>
    <div class="bg-white w-72 h-[380px] rounded-xl shadow-lg overflow-hidden flex flex-col justify-between transition-transform hover:scale-105">
        <div class="relative h-48 w-full">
            <img :src="product.image" alt="Product Image" class="w-full h-full object-cover" />
            <div class="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-white/90 to-transparent"></div>
        </div>

        <div class="px-4 pt-2">
            <h2 class="text-lg font-semibold truncate">{{ product.name }}</h2>
            <p class="text-gray-700">${{ product.price }}</p>
        </div>

        <div class="px-4 pb-4 mt-2 flex flex-col gap-2">
        <button @click="addToCart" v-if="!inCart" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Agregar al carrito
        </button>

        <button @click="removeFromCart" v-else class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Eliminar del carrito
        </button>

        <button @click="viewDetails" class="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
            Ver detalles
        </button>
        </div>
    </div>
</template>