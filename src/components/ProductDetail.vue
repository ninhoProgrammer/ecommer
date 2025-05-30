<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const product = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost/php-api-ecommerce/get_product.php?id=${props.id}`)
    const result = await response.json()
    if (!result.success) throw new Error('No se pudo cargar el producto')
    // Normaliza las propiedades a minúsculas
    product.value = {
      id: result.data.ID,
      name: result.data.NAME,
      price: result.data.PRICE,
      image: result.data.IMAGE
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

function getImageUrl(image) {
  if (!image) return ''
  if (image.startsWith('http')) return image
  return `http://localhost/php-api-ecommerce${image}`
}
</script>

<template>
  <div v-if="loading">Cargando producto...</div>
  <div v-else-if="error" class="text-red-500">{{ error }}</div>
  <div v-else class="p-4 border rounded-lg shadow-md">
    <img :src="getImageUrl(product.image)" class="w-full h-64 object-cover rounded" alt="Imagen del producto" />
    <h1 class="text-2xl font-bold mt-4">{{ product.name }}</h1>
    <p class="text-lg mt-2">${{ product.price }}</p>
  </div>
</template>




