<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { useStore } from '../store.js';

    const store = useStore();
    const isClient = ref(false);

    onMounted(() => {
        isClient.value = true;
    });

    // Computed para obtener el número de productos en el carrito
    const cartCount = computed(() => store.cart.length);

    // Función para manejar el clic en el carrito
    const toggleCart = () => {
        console.log('click en carrito'); // ✅ Esto debe verse
        // Llama a la función toggleCart del store
        store.toggleCart();
    };
</script>

<template>
    <header class="flex text-white w-full p-4 rounded-2xl bg-blue-900 top-0 z-10 fixed">
        <div class="flex flex-grow">
            <a href="/" class="text-2xl font-bold">Mi Tienda</a>
        </div>

        <nav class=" flex flex-grow items-center space-x-4">
            <a href="/" class="hover:bg-red-600 ">Inicio</a>
            <a href="/about" class="hover:text-blue-300">Acerca de</a>
            <a href="/contact" class="hover:text-blue-300">Contacto</a>
        </nav>

        <div class=" relative">
            <button class="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-blue-500" @click="toggleCart">
            <span class="mr-2">Carrito</span>
            <span v-if="isClient" class="bg-red-500 text-white px-2 py-1 text-xs rounded-full absolute top-0 right-0">
                {{ store.cart.length }}
            </span>
            </button>
        </div>
        
    </header>
</template>

