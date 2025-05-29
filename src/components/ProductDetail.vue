<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const product = ref(null)
    const error = ref('')

    onMounted(async () => {
        const id = route.params.id
        console.log('🔍 Loading product with ID:', id)
        try {
            const response = await fetch(`http://localhost/php-api-ecommerce/get_product.php?id=${id}`)
            const result = await response.json()
            if (!response.ok) {
                throw new Error(result.error || 'Failed to load product')
            }

            if (result.success) {
                console.log('✅ Product loaded:', result.data)
                product.value = result.data
            } 
            else {
                error.value = result.error || 'Product not found'
            }
        } 
        catch (err) {
            error.value = 'Network error: ' + err.message
        }
    })
</script>

<template>
    <div class="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
        <div v-if="product">
            <img :src="product.image" alt="Product image" class="w-full h-64 object-cover rounded mb-4" />
            <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
            <p class="text-xl text-gray-700 mb-4">${{ product.price }}</p>
        </div>

        <div v-else-if="error" class="text-red-600 text-center">
            ❌ {{ error }}
        </div>

        <div v-else class="text-center text-gray-500">
            Loading...
        </div>
    </div>
</template>