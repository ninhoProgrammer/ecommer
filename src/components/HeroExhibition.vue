<template>
  <div v-if="product" class="flex flex-col md:flex-row items-center justify-center bg-gray-50 min-h-screen p-6">
    <!-- Imagen con caja sobrepuesta -->
    <div class="relative w-full md:w-1/2 h-96">
      <img :src="product.IMAGE" :alt="product.NAME" class="w-full h-full object-cover rounded-lg" />

      <!-- Cuadro encima de la imagen -->
      <div class="absolute top-1/3 left-1/4 bg-lime-400 text-black p-6 w-64 shadow-lg">
        <h3 class="text-xl font-bold mb-2">{{ product.NAME }}</h3>
        <p class="text-sm line-clamp-4">{{ product.DESCRIPTION }}</p>
      </div>
    </div>

    <!-- Texto a la derecha -->
    <div class="w-full md:w-1/2 mt-10 md:mt-0 md:pl-12">
      <h4 class="text-sm uppercase text-gray-500 mb-2">Producto destacado</h4>
      <h2 class="text-3xl font-bold mb-4">{{ product.NAME }}</h2>
      <p class="text-gray-600 mb-6">{{ product.DESCRIPTION }}</p>
      <button class="px-5 py-2 border border-gray-800 hover:bg-gray-800 hover:text-white transition">
        Ver producto
      </button>
    </div>
  </div>
  
  <div v-else class="text-center py-10 text-gray-500">
    Cargando producto destacado...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const product = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost/php-api-ecommerce/product/get_products.php')
    const data = await res.json()
    if (data.success && data.data.length > 0) {
      // Puedes ajustar aquí cómo elegir el producto que mostrarás
      // Ej: el primero, el que tenga más ventas, etc.
      product.value = data.data.sort((a, b) => b.TIMES_PURCHASED - a.TIMES_PURCHASED)[0]
    }
  } catch (err) {
    console.error('Error al cargar el producto:', err)
  }
})
</script>

<style scoped>
/* Si quieres limitar líneas del texto */
.line-clamp-4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
