import { reactive, watch } from 'vue'

function isBrowser() 
{
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

const loadCart = () => {
    if (isBrowser()) {
        const saved = localStorage.getItem('cart')
        try {
            return saved ? JSON.parse(saved) : []
        } 
        catch {
            return []
        }
    }
    return []
}

const store = reactive({
    products: [
        { id: 1, name: 'Producto 1', price: 10.99, image: '/MakeWeb_MM.svg' },
        { id: 2, name: 'Producto 2', price: 15.99, image: '/MakeWeb_MM.svg' },
        { id: 3, name: 'Producto 3', price: 20.99, image: '/MakeWeb_MM.svg' }
    ],
    /* async loadProducts() {
        try {
            const response = await fetch('http://localhost/php-api-ecommerce/get_products.php')
            const data = await response.json()
            store.products = data
            console.log('Products loaded:', data)
        } catch (err) {
            console.error('Error loading products:', err)
        }
        }, */
    cart: loadCart(),
    cartOpen: false,

    addToCart(id) {
        const product = store.products.find(p => p.id === id)
        if (!product) return

        const item = store.cart.find(i => i.product.id === id)
        if (item) {
        item.quantity += 1
        } 
        else {
        store.cart.push({ product, quantity: 1 })
        }
    },

    removeFromCart(id) {
        store.cart = store.cart.filter(i => i.product.id !== id)
    },

    incrementQuantity(id) {
        const item = store.cart.find(i => i.product.id === id)
        if (item) item.quantity += 1
    },

    decrementQuantity(id) {
        const item = store.cart.find(i => i.product.id === id)
        if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1
        } else {
            store.cart = store.cart.filter(i => i.product.id !== id)
        }
        }
    },

    clearCart() {
        store.cart = []
    },

    toggleCart() {
        store.cartOpen = !store.cartOpen
    }
    })

    // ✅ Guarda en localStorage si estamos en el navegador
    if (isBrowser()) {
        watch(
            () => store.cart,
            (newCart) => {
            localStorage.setItem('cart', JSON.stringify(newCart))
            },
            { deep: true }
        )

        // ✅ Sincroniza entre pestañas
        window.addEventListener('storage', (event) => {
            if (event.key === 'cart') {
            try {
                const updatedCart = JSON.parse(event.newValue)
                store.cart = updatedCart || []
            } catch {
                store.cart = []
            }
            }
        })
    }

export const useStore = () => store
