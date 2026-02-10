<template>
    <!-- Left Info Panel -->
    <div class="bg-(--color-primary) text-(--color-accent) p-6 md:p-10 md:w-1/4 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-lg">
        <div class="space-y-5 md:space-y-10">

            <!-- Call -->
            <div class="flex items-start gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3l2 4H7v6h2l-2 4H5a2 2 0 01-2-2V5z" />
            </svg>
            <div>
                <h3 class="text-xl font-bold mb-1">Call Us</h3>
                <p class="text-sm">
                Yoy Phone<br />
                Yoy Phone
                </p>
            </div>
            </div>

            <!-- Location -->
            <div class="flex items-start gap-4 pr-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.656 0 3-1.344 3-3S13.656 5 12 5 9 6.344 9 8s1.344 3 3 3zm0 2c-2.21 0-4-1.79-4-4S9.79 5 12 5s4 1.79 4 4-1.79 4-4 4zm0 2c-2.485 0-9 1.343-9 4v1h18v-1c0-2.657-6.515-4-9-4z" />
            </svg>
            <div>
                <h3 class="text-xl font-bold mb-1">Location</h3>
                <p class="text-sm">
                this your location,<br />
                this your location,<br />
                </p>
            </div>
            </div>

            <!-- Working Hours -->
            <div class="flex items-start gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3M12 2a10 10 0 110 20 10 10 0 010-20z" />
            </svg>
            <div>
                <h3 class="text-xl font-bold mb-1">Working Hours</h3>
                <p class="text-sm">
                Mon - Fri: 10am - 8pm<br />
                Sat, Sun: Closed
                </p>
            </div>
            </div>

            <!-- Email -->
            <div class="flex items-start gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-6m-4-4l4 4m0 0l-4 4m4-4H8" />
                </svg>
                <div>
                    <h3 class="text-xl font-bold mb-1">Email Us</h3>
                    <p class="text-sm">
                    Email us at<br />
                    </p>
                    <a href="mailto:your@email.com" class="hover:text-(--color-tertiary) hover:underline">your@email.com</a>
                </div>
            </div>

        </div>
    </div>

    <!-- Right Form Panel -->
    <div class="bg-(--color-secondary) p-10 md:w-1/2 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none text-(--color-accent) shadow-lg pr-10 z-0 hover:shadow-2xl">
        <h2 class="text-2xl font-bold mb-8 ">Contact Us</h2>

        <form action="#" method="POST" class="space-y-6">
            <div>
                <input type="text" placeholder="Enter your Name" class="w-full border-b-2 border-(--color-accent) focus:outline-none focus:border-red-500 py-2 placeholder-(--color-accent)" required>
            </div>
            <div>
                <input type="email" placeholder="Enter a valid email address" class="w-full border-b-2 border-(--color-accent) focus:outline-none focus:border-red-500 py-2 placeholder-(--color-accent)" required>
            </div>
            <div>
                <textarea rows="4" placeholder="Your Message" class="w-full border-b-2 border-(--color-accent) focus:outline-none focus:border-red-500 py-2 placeholder-(--color-accent)" required></textarea>
            </div>
            <button type="submit" class="border w-full text-(--color-accent) border-gray-300 px-4 py-2 rounded hover:bg-gray-300 hover:text-gray-800 hover:shadow-2xl" @click="handleSubmit">
                <span v-if="status === ''">Enviar</span>
                <span v-else>{{ status }}</span>
            </button>
            
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const status = ref('');

function handleSubmit(e) {
    status.value = 'Enviando...';
}
</script>


<style>
    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 400px;
    }
</style>