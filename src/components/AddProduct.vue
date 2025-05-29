<script setup>
    import { ref, watch } from 'vue'

    const name = ref('')
    const price = ref('')
    const imageUrl = ref('')
    const preview = ref('')
    const message = ref('')
    const loading = ref(false)

    // Mostrar vista previa en tiempo real
    watch(imageUrl, (newUrl) => {
        preview.value = newUrl
    })

    const addProduct = async () => {
        message.value = ''
        loading.value = true

        const newProduct = {
            name: name.value.trim(),
            price: parseFloat(price.value),
            image: imageUrl.value.trim()
        }

        if (!newProduct.name || isNaN(newProduct.price) || !newProduct.image) {
            message.value = '❌ Please fill in all fields correctly.'
            loading.value = false
            return
        }

        try {
            const response = await fetch('http://localhost/php-api-ecommerce/add_product.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            })

            const result = await response.json()

            if (response.ok) {
                message.value = '✅ Product added successfully!'
                name.value = ''
                price.value = ''
                imageUrl.value = ''
                preview.value = ''
            } 
            else {
                message.value = '❌ Error: ' + result.error
            }
        } 
        catch (err) {
            message.value = '❌ Network error: ' + err.message
        } 
        finally {
            loading.value = false
        }
    }
</script>

<template>
    <div class="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md space-y-4">
        <h2 class="text-2xl font-bold text-center text-gray-800">🛍️ Add New Product</h2>

        <input v-model="name" type="text" placeholder="Product Name" class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <input v-model="price" type="number" step="0.01" placeholder="Price" class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <input v-model="imageUrl" type="text" placeholder="Image URL" class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <div v-if="preview" class="text-center">
            <p class="text-sm text-gray-600 mb-1">Image Preview:</p>
            <img :src="preview" alt="Preview" class="w-32 h-32 object-cover mx-auto rounded shadow" />
        </div>

        <button @click="addProduct" :disabled="loading" class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50">
            {{ loading ? 'Adding...' : 'Add Product' }}
        </button>

        <p v-if="message" class="text-sm text-center mt-2" :class="message.startsWith('✅') ? 'text-green-600' : 'text-red-600'">
            {{ message }}
        </p>
    </div>
</template>
