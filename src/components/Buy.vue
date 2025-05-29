<script setup>
    import { useStore } from '../store'
    const store = useStore()

    const total = () => {
        return store.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
    }
</script>

<template>
    <div class="max-w-xl mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Resumen de Compras</h1>

        <div v-if="store.cart.length === 0">
            <p>No tienes productos en el carrito.</p>
        </div>

        <ul v-else class="space-y-4">
            <li v-for="item in store.cart" :key="item.id" class="border p-3 rounded">
                <div class="flex justify-between">
                    <div>
                        <h2 class="font-semibold">{{ item.name }}</h2>
                        <p>Cantidad: {{ item.quantity }}</p>
                        <p>Precio unitario: ${{ item.price }}</p>
                    </div>
                    <div class="text-right font-semibold">
                        ${{ (item.quantity * item.price).toFixed(2) }}
                    </div>
                </div>
            </li>
        </ul>

        <div v-if="store.cart.length" class="mt-4 text-right font-bold text-lg">
            Total: ${{ total() }}
        </div>
    </div>
</template>