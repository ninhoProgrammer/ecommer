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
    <header class="fixed top-4 left-0 right-0 z-50 w-11/12 mx-auto transition-all duration-300">
  <div class="flex items-center justify-between p-3 px-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl">
    
    <div class="flex items-center">
      <a href="/" class="text-xl xl:text-2xl font-black tracking-tight text-(--color-accent) hover:opacity-80 transition-opacity">
        Mi<span class="text-(--color-primary)">Tienda</span>
      </a>
    </div>

    <div v-if="isClient" class="hidden text-(--color-secondary) md:flex items-center bg-(--color-accent) rounded-xl px-4 py-1 hover:shadow-2xl transition-shadow">
        <nav class="flex space-x-1">
            <div v-if="currentPath === '/'" class="space-x-2">
              <a href="/" class="nav-link hover:text-(--color-primary) hover:scale-115 transition-colors hover:border-b-2 hover:border-(--color-secondary)">Inicio</a>
              <a href="#product" class="nav-link hover:text-(--color-primary) transition-colors hover:border-b-2 hover:border-(--color-secondary)">Top</a>
              <a href="#exhibition" class="nav-link hover:text-(--color-primary) transition-colors hover:border-b-2 hover:border-(--color-secondary)">Destacado</a>
              <a href="#about" class="nav-link hover:text-(--color-primary) transition-colors hover:border-b-2 hover:border-(--color-secondary)">Nosotros</a>
              <a href="#contact" class="nav-link hover:text-(--color-primary) transition-colors hover:border-b-2 hover:border-(--color-secondary)">Contacto</a>
            </div>
            <div v-else class="space-x-2">
                <a href="/" class="nav-link hover:text-(--color-primary) transition-colors hover:border-b-2 hover:border-(--color-secondary)">Inicio</a>
                <a href="/productList" class="nav-link hover:text-(--color-primary) transition-colors hover:border-b-2 hover:border-(--color-secondary)">Productos</a>
            </div>
        </nav>
    </div>

    <div class="flex items-center gap-3">
        <div v-if="currentPath !== '/login'" class="relative">
            <button 
                @click="toggleCart"
                class="p-2.5 rounded-full bg-(--color-accent) text-(--color-tertiary) hover:scale-110 active:scale-95 transition-all shadow-md group"
                >
                <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span v-if="cartCount > 0" class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-(--color-accent)">
                    {{ cartCount }}
                </span>
            </button>
      </div>

      <button 
        @click="toggleMenu" 
        class="md:hidden p-2 rounded-xl bg-black/5 text-(--color-accent) hover:bg-black/10 transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>

  <transition name="fade-slide">
    <div v-if="showMobileMenu" class="md:hidden absolute top-20 left-0 w-full p-4">
      <nav class="flex flex-col gap-2 p-4 rounded-2xl bg-(--color-tertiary) shadow-2xl border-4 border-(--color-tertiary)">
        <template v-if="currentPath === '/'">
          <a href="/" class="mobile-nav-link">Inicio</a>
          <a href="#product" class="mobile-nav-link">Top</a>
          <a href="#exhibition" class="mobile-nav-link">Destacado</a>
          <a href="#about" class="mobile-nav-link">Nosotros</a>
          <a href="#contact" class="mobile-nav-link">Contacto</a>
        </template>
        <template v-else>
          <a href="/" class="mobile-nav-link">Inicio</a>
          <a href="/productList" class="mobile-nav-link">Productos</a>
        </template>
      </nav>
    </div>
  </transition>
</header>
</template>

