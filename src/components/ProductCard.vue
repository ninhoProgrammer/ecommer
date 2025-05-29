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
            store.addToCart(props.product.id)
            console.log('✅ Added to cart:', props.product)
        }1
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
    <div class="bg-white p-4 rounded-lg shadow-md">
        <img :src="product.image" alt="Product Image" class="w-80 h-48 object-cover rounded"/>
        <h2 class="text-lg font-semibold mt-2">{{ product.name }}</h2>
        <p class="text-gray-700">${{ product.price }}</p>

        <button @click="addToCart" v-if="!inCart" class="bg-blue-500 text-white mt-2 px-4 py-2 rounded w-full hover:bg-blue-600">
            Agregar al carrito
        </button>

        <button @click="removeFromCart" v-else class="bg-red-500 text-white mt-2 px-4 py-2 rounded w-full hover:bg-red-600">
            Eliminar del carrito
        </button>

        <button @click="viewDetails" class="border mt-2 border-gray-300 px-4 py-2 rounded w-full hover:bg-gray-100">
            Ver detalles
        </button>
    </div>
</template>