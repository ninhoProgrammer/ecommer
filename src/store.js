import { reactive, watch } from 'vue'

function isBrowser() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

const store = reactive({
    products: [],
    cartOpen: false,
    cart: [],

    async loadProducts() {
        try {
            const response = await fetch('http://localhost/php-api-ecommerce/get_products.php')
            if (!response.ok) {
                const text = await response.text()
                throw new Error(`HTTP ${response.status}: ${text}`)
            }
            const result = await response.json()
            if (!result.success) {
                throw new Error(result.error || 'Unknown error from server')
            }

            store.products = result.data.map(product => ({
                id: product.ID,
                name: product.NAME,
                price: product.PRICE,
                image: product.IMAGE
            }))
        } catch (err) {
            console.error('❌ Error loading products:', err)
        }
    },

    addToCart(id) {
        const item = store.cart.find(i => i.id === id)
        if (item) {
            item.quantity += 1
        } else {
            const product = store.products.find(p => p.id === id)
            if (product) {
                store.cart.push({ ...product, quantity: 1 })
            }
        }
    },

    removeFromCart(id) {
        store.cart = store.cart.filter(i => i.id !== id)
    },

    incrementQuantity(id) {
        const item = store.cart.find(i => i.id === id)
        if (item) item.quantity += 1
    },

    decrementQuantity(id) {
        const item = store.cart.find(i => i.id === id)
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1
            } else {
                store.cart = store.cart.filter(i => i.id !== id)
            }
        }
    },

    clearCart() {
        store.cart = []
    },

    toggleCart() {
        console.log('🛒 Toggling cart visibility')
        store.cartOpen = !store.cartOpen
    }
})

if (isBrowser()) {
    store.cart = loadCart()
    watch(
        () => store.cart,
        (newCart) => {
            localStorage.setItem('cart', JSON.stringify(newCart))
        },
        { deep: true }
    )

    window.addEventListener('storage', (event) => {
        if (event.key === 'cart') {
            try {
                store.cart = JSON.parse(event.newValue) || []
            } catch {
                store.cart = []
            }
        }
    })
}

function loadCart() {
    if (isBrowser()) {
        const saved = localStorage.getItem('cart')
        try {
            return saved ? JSON.parse(saved) : []
        } catch {
            return []
        }
    }
    return []
}

export const useStore = () => store

