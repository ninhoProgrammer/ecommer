<script setup>
    import { useStore } from '../store'
    const store = useStore()

    const total = () => {
        return store.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)
    }
</script>

<template>
    <div v-if="store.cartOpen" class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">Carrito</h2>

        <div v-if="store.cart.length === 0">
            <p>Tu carrito está vacío.</p>
        </div>

        <ul v-else>
            <li v-for="item in store.cart" :key="item.product.id" class="mb-2 border-b pb-2">
                <div class="flex justify-between items-center">
                    <div>
                        {{ item.product.name }}
                        <br />
                        <span class="text-sm text-gray-600">${{ item.product.price }} c/u</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="store.decrementQuantity(item.product.id)" class="px-2 text-lg bg-gray-200 rounded">−</button>
                        <span class="w-6 text-center">{{ item.quantity }}</span>
                        <button @click="store.incrementQuantity(item.product.id)" class="px-2 text-lg bg-gray-200 rounded">+</button>
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
        </div>
    </div>
</template>

