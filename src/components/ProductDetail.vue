<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { useStore } from '../store'

    const props = defineProps({
        id: {
            type: String,
            required: true
        }
    })

    const store = useStore()
    const product = ref(null)
    const loading = ref(true)
    const error = ref(null)

    const inCart = computed(() =>
        product.value ? store.cart.some(item => item.id === product.value.id) : false
    )

    function addToCart() {
        if (!product.value) return
        if (!inCart.value) {
            store.addToCart(product.value)
            console.log('✅ Added to cart:', product.value)
        }
    }

    function removeFromCart() {
        if (!product.value) return
        store.removeFromCart(product.value.id)
        console.log('🗑️ Removed from cart:', product.value)
    }

    const goBack = () => window.history.back()

    onMounted(async () => {
        try {
            const response = await fetch(`http://localhost/php-api-ecommerce/product/get_product.php?id=${props.id}`)
            const result = await response.json()
            
            if (!result.success) throw new Error('No se pudo cargar el producto')
            
            product.value = 
            {
                id: result.data.ID,
                name: result.data.NAME,
                description: result.data.DESCRIPTION,
                price: result.data.PRICE,
                image: result.data.IMAGE
            }
        } 
        catch (err) {
            error.value = err.message
        } 
        finally {
            loading.value = false
        }
    })
</script>

<template>
    <div v-if="loading" class="text-center py-6 text-gray-500">Cargando producto...</div>

    <div v-else-if="error" class="text-center text-red-500 py-6">{{ error }}</div>

    <div v-else class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <!-- Imagen del producto con difuminado -->
        <div class="relative h-64">
            <img :src="product.image" alt="Imagen del producto" class="w-full h-full object-cover" />
            <div class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white/70 to-transparent rounded-b-xl"></div>
        </div>

        <!-- Detalles del producto -->
        <div class="p-6 space-y-3">
            <h1 class="text-2xl font-bold text-gray-800">{{ product.name }}</h1>
            <p class="text-gray-700 text-sm">{{ product.description }}</p>
            <p class="text-xl font-semibold text-blue-600">${{ product.price }}</p>

            <!-- Botones -->
            <div class="space-y-2">
                <button @click="addToCart" v-if="!inCart" class="bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600">
                    Agregar al carrito
                </button>

                <button @click="removeFromCart" v-else class="bg-red-500 text-white w-full px-4 py-2 rounded hover:bg-red-600">
                    Eliminar del carrito
                </button>

                <button @click="goBack" class="w-full border border-gray-300 py-2 px-4 rounded hover:bg-gray-100">
                    Volver
                </button>
            </div>
        </div>
    </div>
</template>




