<script setup>
    import { ref, watch, onMounted } from 'vue'

    const name = ref('')
    const description = ref('')
    const price = ref('')
    const stock = ref('')
    const imageUrl = ref('')
    const preview = ref('')
    const message = ref('')
    const loading = ref(false)
    const categoryId = ref('')
    const categories = ref([])

    // Obtener las categorías desde la API
    const fetchCategories = async () => {
        try {
            const res = await fetch('http://localhost/php-api-ecommerce/category/get_categories.php')
            const data = await res.json()
            
            if (data.success) {
                categories.value = data.data // Asegúrate de que la estructura sea correcta
            } 
            else {
                console.error('Error al obtener categorías:', data)
            }
        } 
        catch (err) {
            console.error('Error de red al obtener categorías:', err)
        }
    }

    onMounted(() => {
        fetchCategories()
    })

    // Vista previa de la imagen
    watch(imageUrl, (newUrl) => {
        preview.value = newUrl
    })

    const addProduct = async () => {
        message.value = ''
        loading.value = true

        const newProduct = {
            name: name.value.trim(),
            description: description.value.trim(),
            price: parseFloat(price.value),
            stock: parseInt(stock.value) || 0, // Asignar 0 si no se proporciona stock
            image: imageUrl.value.trim(),
            category_id: parseInt(categoryId.value)
        }

        if (!newProduct.name || !newProduct.description || isNaN(newProduct.price) || !newProduct.image || isNaN(newProduct.category_id)) {
            message.value = '❌ Please fill in all fields correctly.'
            loading.value = false
            return
        }

        try {
            const response = await fetch('http://localhost/php-api-ecommerce/product/add_product.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            })

            const result = await response.json()

            if (response.ok) {
                message.value = '✅ Product added successfully!'
                name.value = ''
                description.value = ''
                price.value = ''
                stock.value = '' 
                imageUrl.value = ''
                categoryId.value = ''
                preview.value = ''
                } else {
                message.value = '❌ Error: ' + result.error
            }
        } catch (err) {
            message.value = '❌ Network error: ' + err.message
        } finally {
            loading.value = false
        }
    }
</script>

<template>
    <div class="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md space-y-4">
        <h2 class="text-2xl font-bold text-center text-gray-800">🛍️ Add New Product</h2>

        <input v-model="name" type="text" placeholder="Product Name" class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <input v-model="description" type="text" placeholder="Description" class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <input v-model="price" type="number" step="0.01" placeholder="Price" class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <input v-model="stock" type="number" placeholder="Stock" class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <select v-model="categoryId" class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option disabled value="">Select Category</option>
            <option v-for="cat in categories" :key="cat.ID" :value="cat.ID">
                {{ cat.NAME }}
            </option>
        </select>

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
