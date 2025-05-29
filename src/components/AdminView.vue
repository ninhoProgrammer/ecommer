<script setup>
    import { ref, onMounted } from 'vue'

    const compras = ref([])

    onMounted(async () => {
        const res = await fetch('http://localhost/api/compras.php')
        compras.value = await res.json()
    })
</script>

<template>
    <div class="max-w-2xl mx-auto p-6">
        <h1 class="text-2xl font-bold mb-4">Historial de Compras</h1>

        <table class="w-full border-collapse">
        <thead>
            <tr class="bg-gray-200">
            <th class="text-left p-2">ID</th>
            <th class="text-left p-2">Producto</th>
            <th class="text-left p-2">Cantidad</th>
            <th class="text-left p-2">Fecha</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="c in compras" :key="c.id" class="border-t">
            <td class="p-2">{{ c.id }}</td>
            <td class="p-2">{{ c.name }}</td>
            <td class="p-2">{{ c.cantidad }}</td>
            <td class="p-2">{{ new Date(c.creado).toLocaleString() }}</td>
            </tr>
        </tbody>
        </table>

        <div v-if="compras.length === 0" class="mt-4 text-gray-500">
            No hay compras registradas.
        </div>
    </div>
</template>