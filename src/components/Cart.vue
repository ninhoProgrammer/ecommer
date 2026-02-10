<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from '../store'

const store = useStore()
const cartRef = ref(null)

const handleClickOutside = (e) => {
    if (!store.cartOpen) return
    if (cartRef.value && !cartRef.value.contains(e.target)) {
        store.cartOpen = false
    }
}

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside)
})

const total = () => {
    return store.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
}
</script>

<template>
    <div ref="cartRef" v-if="store.cartOpen" class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">Carrito</h2>

        <div v-if="store.cart.length === 0">
            <p>Tu carrito está vacío.</p>
        </div>

        <ul v-else>
            <li v-for="item in store.cart" :key="item.id" class="mb-2 border-b pb-2">
                <div class="flex justify-between items-center">
                    <div>
                        {{ item.name }}
                        <br />
                        <span class="text-sm text-gray-600">${{ item.price }} c/u</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="store.decrementQuantity(item.id)" class="px-2 text-lg bg-gray-200 rounded">−</button>
                        <span class="w-6 text-center">{{ item.quantity }}</span>
                        <button @click="store.incrementQuantity(item.id)" class="px-2 text-lg bg-gray-200 rounded">+</button>
                    </div>
                </div>
            </li>
        </ul>

        <div class="mt-4 font-semibold">
            Total: ${{ total() }}
        </div>

        <div class="flex flex-col text-center mt-4">
            <a href="/buy" class="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded">Pagar</a>
            <a @click="store.clearCart" class="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded">
                Vaciar carrito
            </a>
            <a @click="store.toggleCart" class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded">
                Cerrar
            </a>
            <a href="/login" class="mt-4 w-full bg-(--color-primary) hover:bg-(--color-secondary) text-white px-4 py-2 rounded">
                Cerrar sesion
            </a>
        </div>
    </div>
</template>

