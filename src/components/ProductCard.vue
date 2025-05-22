<script setup>
    import { useStore } from '../store'

    const props = defineProps({
        product: Object
    })

    const store = useStore()

    const addToCart = () => {
        store.message = `✅ ${props.product.name} agregado al carrito!`
        store.addToCart(props.product.id)
    };
</script>

<template>
    <div class="bg-white p-4 rounded-lg shadow-md">
        <img :src="product.image" class="w-full h-48 object-cover rounded" />
        <h2 class="text-lg font-semibold mt-2">{{ product.name }}</h2>
        <p>${{ product.price }}</p>
        <button @click="addToCart" class="bg-blue-500 text-white mt-2 px-4 py-2 rounded w-full z-30 hover:bg-blue-600">
            Agregar al carrito
        </button>
    </div>
</template>

  
  