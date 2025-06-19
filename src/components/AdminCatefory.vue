<script setup>
    import { ref, onMounted } from 'vue'

    const products = ref([])

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost/php-api-ecommerce/product/get_products.php')
            const data = await res.json()
            if (data.success) {
                products.value = data.data
            }
        } catch (err) {
            console.error('Error al cargar productos:', err)
        }
    }

    const deleteProduct = async (id) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            await fetch(`http://localhost/php-api-ecommerce/product/delete_product.php?id=${id}`, {
            method: 'DELETE'
            })
            fetchProducts()
        }
    }

    const toggleActive = async (prod) => {
        const newStatus = prod.IS_ACTIVE ? 0 : 1
        await fetch('http://localhost/php-api-ecommerce/product/update_status.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: prod.ID, is_active: newStatus })
        })
        fetchProducts()
    }

    const addStock = async (id) => {
        const quantity = prompt('¿Cuántas unidades deseas agregar al stock?', '1')
        if (quantity && !isNaN(quantity)) {
            await fetch('http://localhost/php-api-ecommerce/product/add_stock.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, quantity: parseInt(quantity) })
            })
            fetchProducts()
        }
    }

    onMounted(() => {
        fetchProducts()
    })
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold mb-4">📦 Administración de Productos</h2>

        <table class="min-w-full bg-white rounded shadow overflow-hidden">
        <thead class="bg-gray-100 text-left">
            <tr>
            <th class="px-4 py-2">Imagen</th>
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Precio</th>
            <th class="px-4 py-2">Estado</th>
            <th class="px-4 py-2">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="prod in products" :key="prod.ID" class="border-t">
            <td class="px-4 py-2">
                <img :src="prod.IMAGE" alt="img" class="w-16 h-16 object-cover rounded" />
            </td>
            <td class="px-4 py-2">{{ prod.NAME }}</td>
            <td class="px-4 py-2">${{ prod.PRICE }}</td>
            <td class="px-4 py-2">
                <span :class="prod.IS_ACTIVE ? 'text-green-600' : 'text-yellow-600'">
                    {{ prod.IS_ACTIVE ? 'Activo' : 'Suspendido' }}
                </span>
            </td>
            <td class="px-4 py-2 space-x-2">
                <button @click="deleteProduct(prod.ID)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Eliminar
                </button>
                <button @click="toggleActive(prod)" :class="prod.IS_ACTIVE ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'" class="text-white px-3 py-1 rounded">
                
                 {{ prod.IS_ACTIVE ? 'Suspender' : 'Reactivar' }}
                </button>
                <button @click="addStock(prod.ID)" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    Agregar stock
                </button>
            </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
