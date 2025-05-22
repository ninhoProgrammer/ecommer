<script setup>
    import { ref } from 'vue'

    const name = ref('')
    const price = ref('')
    const imageUrl = ref('')
    const message = ref('')

    const addProduct = async () => {
        const newProduct = {
            name: name.value,
            price: parseFloat(price.value),
            image_url: imageUrl.value
        }

        try {
            const response = await fetch('http://localhost/php-api-ecommerce/add_product.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })

            const result = await response.json()
            if (response.ok) {
            message.value = '✅ Product added successfully!'
            name.value = ''
            price.value = ''
            imageUrl.value = ''
            } else {
            message.value = '❌ Error: ' + result.error
            }
        } 
        catch (err) {
            message.value = '❌ Network error: ' + err.message
        }
    }
</script>

<template>
    <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
        <h2 class="text-2xl font-bold mb-4">Add New Product</h2>

        <input v-model="name" type="text" placeholder="Product Name" class="w-full border px-4 py-2 mb-3 rounded" />
        <input v-model="price" type="number" step="0.01" placeholder="Price" class="w-full border px-4 py-2 mb-3 rounded" />
        <input v-model="imageUrl" type="text" placeholder="Image URL" class="w-full border px-4 py-2 mb-3 rounded" />

        <button @click="addProduct" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Product</button>

        <p v-if="message" class="mt-4 text-sm">{{ message }}</p>
    </div>
</template>
