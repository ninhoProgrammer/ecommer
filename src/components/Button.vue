<script setup>
    defineProps(['text', 'href']);
</script>


<template>
    <a :href="href" class="inline-flex items-center gap-1 md:gap-3 px-4 md:px-8 py-2 md:py-4 mt-8 bg-linear-to-r from-(--color-degrade) to-(--color-primary) hover:from--(--color-primary) hover:to-(--color-degrade) text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 z-2">
        <span class="text-base">
           {{ text }}
        </span>
        <div aria-hidden="true" class="flex items-center justify-center h-8 w-12 bg-(--color-secondary) hover:bg-(--color-tertiary) rounded-full ml-1">
            →
        </div>
    </a>
</template>