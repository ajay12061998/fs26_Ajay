const products = [
    { id: 1, name: "Product-1", price: 100 },
    { id: 2, name: "Product-2", price: 200 },
    { id: 3, name: "Product-3", price: 300 }
];

let cart = [];
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const totalPrice = document.getElementById("total-price");

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    if (cart.length === 0) {
        cartEmpty.style.display = "block";
    } else {
        cartEmpty.style.display = "none";
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>$${item.price * item.quantity}</span>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    totalPrice.textContent = total;
}

function addProductToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function removeProductFromCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity === 0) {
            cart = cart.filter(item => item.id !== product.id);
        }
    }
    updateCart();
}

function renderProducts() {
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <span>${product.name} ($${product.price})</span>
            <div>
                <button onclick="handleRemove(${product.id})">-</button>
                <span id="qty-${product.id}">0</span>
                <button onclick="handleAdd(${product.id})">+</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

function handleAdd(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        addProductToCart(product);
        document.getElementById(`qty-${id}`).textContent = cart.find(p => p.id === id)?.quantity || 0;
    }
}

function handleRemove(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        removeProductFromCart(product);
        document.getElementById(`qty-${id}`).textContent = cart.find(p => p.id === id)?.quantity || 0;
    }
}

renderProducts();