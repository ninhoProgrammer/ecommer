<template>
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 md:flex-row items-center justify-center min-h-screen p-8 md:p-20">
        <!-- Imagen con caja sobrepuesta -->
        <div class="relative flex flex-grow justify-end items-center w-full h-full">
            <img :src="product.IMAGE" :alt="product.NAME" class="md:w-1/2 h-[480px] object-cover rounded-lg" />

        <!-- Cuadro encima de la imagen -->
            <div class="absolute md:top-1/2 left-1/5 md:left-1/4 bg-[var(--color-primary)] text-[var(--color-accent)] p-6 md:w-1/2 shadow-lg rounded-lg opacity-80">
                <h3 class="text-xl font-bold mb-10">{{ product.NAME }}</h3>
                <p class="text-sm line-clamp-4">{{ product.DESCRIPTION }}</p>
            </div>
        </div>

        <!-- Texto a la derecha -->
        <div class="flex flex-grow flex-col md:w-9/12 mt-10 md:mt-0 md:pl-12">
            <h4 class="gradient-overlay text-2xl mb-2 underline">Producto destacado</h4>
            <h2 class="text-3xl xl:text-6xl font-bold mb-10 md:mb-32">{{ product.NAME }}</h2>
            <p class="mb-4">{{ product.DESCRIPTION }}</p>
            <div class="flex flex-row md:justify-start items-center gap-4">
                <a class="inline-flex items-center gap-3 px-8 py-4 mt-8 bg-gradient-to-r from-red-300 to-red-600 hover:from-red-600 hover:to-red-300 text-white font-bold rounded-full shadow-xl transform hover:scale-105 transition duration-300 z-2" href="/productList">
                    <span class="text-base">
                        Ver Producto 
                    </span>
                    <div aria-hidden="true" class="flex items-center justify-center h-[32px] w-[32px] bg-white text-red-600 rounded-full ml-1 dark:bg-[#121212] dark:text-white">
                        →
                    </div>
                </a>
                <a class="inline-flex items-center gap-3 px-8 py-4 mt-8 bg-gradient-to-r from-red-300 to-red-600 hover:from-red-600 hover:to-red-300 text-white font-bold rounded-full shadow-xl transform hover:scale-105 transition duration-300 z-2" href="/productList">
                    <span class="text-base">
                        Mas Productos
                    </span>
                    <div aria-hidden="true" class="flex items-center justify-center h-[32px] w-[32px] bg-white text-red-600 rounded-full ml-1 dark:bg-[#121212] dark:text-white">
                        →
                    </div>
                </a>
            </div>
        </div>
    </div>
    
    <div v-else class="text-center py-10">
        <h2 class="gradient-overlay text-2xl md:text-4xl 2xl:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-6">
            Cargando producto destacado...
        </h2>
        
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { computed } from 'vue'

    const product = ref(null)
    const inCart = computed(() => store.cart.some(item => item.id === props.product.id))
    

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

    function viewDetails() {
        window.location.href = `/product/${product.id}`
    }
</script>

<style>
    
</style>
