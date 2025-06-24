<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { useStore } from '../store.js';

    const store = useStore();
    const isClient = ref(false);
    const currentPath = ref('/');
    const showMobileMenu = ref(false);

    onMounted(() => {
        isClient.value = true;
        currentPath.value = window.location.pathname;
    });

    const cartCount = computed(() => store.cart.length);

    const toggleCart = () => {
        store.toggleCart();
    };

    const toggleMenu = () => {
        showMobileMenu.value = !showMobileMenu.value;
    };

    // Ocultar menú móvil al hacer click fuera
    const handleClickOutside = (event) => {
        const header = document.querySelector('header');
        if (showMobileMenu.value && header && !header.contains(event.target)) {
            showMobileMenu.value = false;
        }
    };

    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });

    import { onBeforeUnmount } from 'vue';
    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
    });
</script>

<template>
    <header class="flex items-center text-[var(--color-accent)] w-screen md:w-full p-2 rounded-2xl bg-[var(--color-tertiary)] top-0 z-10 fixed">
        <div class="flex flex-grow">
            <a href="/" class="text-xl xl:text-2xl font-bold">Mi Tienda</a>
        </div>

        <!-- Botón hamburguesa: visible solo en móvil -->
        <button class="md:hidden ml-2 p-2 rounded bg-[var(--color-tertiary)] hover:text-[var(--color-primary)]" @click="toggleMenu" aria-label="Abrir menú">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        </button>
        
        <div v-if="isClient && currentPath === '/'" :class="['flex-grow items-center', showMobileMenu ? 'block absolute top-16 left-0 w-full bg-[var(--color-tertiary)] shadow-lg z-50 p-4 md:static md:p-0 md:bg-transparent md:shadow-none' : 'hidden md:flex']">
            <nav class="space-x-4 flex flex-col md:flex-row md:space-x-4">
                <a href="/" class="text-lg hover:bg-[var(--color-accent)] hover:p-2 hover:rounded-2xl hover:text-[var(--color-tertiary)]">Inicio</a>
                <a href="#about" class="text-lg hover:bg-[var(--color-accent)] hover:p-2 hover:rounded-2xl hover:text-[var(--color-tertiary)]">Nosotros</a>
                <a href="#contact" class="text-lg hover:bg-[var(--color-accent)] hover:p-2 hover:rounded-2xl hover:text-[var(--color-tertiary)]">Contacto</a>
            </nav>
        </div>
        <div v-else :class="['flex-grow items-center', showMobileMenu ? 'block absolute top-16 left-0 w-full bg-[var(--color-tertiary)] shadow-lg z-50 p-4 md:static md:p-0 md:bg-transparent md:shadow-none' : 'hidden md:flex']">
            <nav class="space-x-4 flex flex-col md:flex-row md:space-x-4">
                <a href="/" class="text-lg hover:bg-[var(--color-accent)] hover:p-2 hover:rounded-2xl hover:text-[var(--color-tertiary)]">Inicio</a>
                <a href="/productList" class="text-lg hover:bg-[var(--color-accent)] hover:p-2 hover:rounded-2xl hover:text-[var(--color-tertiary)]">Productos</a>
            </nav>
        </div>

        <!-- Botón carrito: siempre visible -->
        <div class="relative flex items-center ml-auto">
            <button class="bg-[var(--color-secondary)] px-4 py-2 rounded-full hover:bg-[var(--color-primary)]" @click="toggleCart">
                <svg class="mr-2 w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h9a1 1 0 011 1v7" />
                </svg>
                <span v-if="isClient" class="bg-red-500 px-2 py-1 text-xs rounded-full absolute top-0 right-0">
                    {{ cartCount }}
                </span>
            </button>
        </div>
    </header>
</template>

