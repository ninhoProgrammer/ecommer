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
            const response = await fetch('http://localhost/php-api-ecommerce/product/get_products.php')
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

    async loadTopProduct() {
        try {
            const response = await fetch('http://localhost/php-api-ecommerce/product/get_products.php')
            if (!response.ok) {
                const text = await response.text()
                throw new Error(`HTTP ${response.status}: ${text}`)
            }

            const result = await response.json()
            if (!result.success) {
                throw new Error(result.error || 'Unknown error from server')
            }

            const allProducts = result.data

            // Crear un mapa para almacenar el mejor producto por categoría
            const topProductsMap = {}

            for (const product of allProducts) {
                const category = product.CATEGORY
                const currentTop = topProductsMap[category]

                if (!currentTop || product.TIMES_PURCHASED > currentTop.TIMES_PURCHASED) {
                    topProductsMap[category] = product
                }
            }

            // Convertir el mapa en un array y guardar en el store
            store.products = Object.values(topProductsMap).map(product => ({
                id: product.ID,
                name: product.NAME,
                price: product.PRICE,
                image: product.IMAGE,
                category: product.CATEGORY,
                timesPurchased: product.TIMES_PURCHASED
            }))

        } catch (err) {
            console.error('❌ Error loading top products per category:', err)
        }
    },
    
    async loadTopProductPerCategory() {
        try {
            const response = await fetch('http://localhost/php-api-ecommerce/product/get_products.php')
            if (!response.ok) {
                const text = await response.text()
                throw new Error(`HTTP ${response.status}: ${text}`)
            }

            const result = await response.json()
            if (!result.success) {
                throw new Error(result.error || 'Unknown error from server')
            }

            const allProducts = result.data

            const topProductsMap = {}

            for (const product of allProducts) {
                const isActive = parseInt(product.IS_ACTIVE) === 1
                const hasStock = parseInt(product.STOCK) > 0
                if (!isActive || !hasStock) continue

                const categoryId = product.CATEGORY_ID
                const timesPurchased = parseFloat(product.TIMES_PURCHASED)

                if (
                    !topProductsMap[categoryId] ||
                    timesPurchased > parseFloat(topProductsMap[categoryId].TIMES_PURCHASED)
                ) {
                    topProductsMap[categoryId] = product
                }
            }

            store.products = Object.values(topProductsMap).map(product => ({
                id: product.ID,
                name: product.NAME,
                description: product.DESCRIPTION,
                price: product.PRICE,
                image: product.IMAGE,
                categoryId: product.CATEGORY_ID,
                timesPurchased: parseFloat(product.TIMES_PURCHASED)
            }))
        } catch (err) {
            console.error('❌ Error loading top products per category:', err)
        }
    },
        
    addToCart(product) {
        const item = store.cart.find(i => i.id === product.id)
        if (item) {
            item.quantity += 1
        } else {
            store.cart.push({ ...product, quantity: 1 })
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

