// ---------------------------Cart---------------------------

let cart = JSON.parse(localStorage.getItem("cart")) || {}; // Load cart from localStorage

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ---------------------------Add-To-Cart---------------------------
function addItem(button, itemName, price) {
    if (!cart[itemName]) {
        cart[itemName] = { price: price, quantity: 1 };
        button.classList.add("disabled");
        button.innerText = "Added";
    }
    saveCart();
    updateCart();
}

// ---------------------------Reset-Add-Button---------------------------
function resetAddButton(itemName) {
    let buttons = document.querySelectorAll(".add-btn");
    buttons.forEach(btn => {
        if (btn.getAttribute("onclick").includes(`addItem(this, '${itemName}',`)) {
            btn.classList.remove("disabled");
            btn.innerText = "Add";
        }
    });
}

// ---------------------------Update-Cart-Food-Pages---------------------------
function updateCart() {
    let cartContainer = document.getElementById("cart-content");
    
    // Update "Add" buttons in Food.html
    updateFoodPageButtons();

    if (!cartContainer) return; // Prevent errors if cart is not on the page

    cartContainer.innerHTML = "";

    if (Object.keys(cart).length === 0) {
        cartContainer.innerHTML = "Place your order now";
        return;
    }

    let total = 0;
    let cartHTML = "<ul>";
    for (let item in cart) {
        let subtotal = cart[item].price * cart[item].quantity;
        total += subtotal;

        cartHTML += `
            <li class="menu-item">
                <span class="item-name">${item}</span> 
                <div>
                    <span class="qty-price">₹${cart[item].price}</span>
                    <div class="quantity-container">
                        <button class="qty-btn" onclick="decreaseQuantity('${item}')">-</button>
                        <span class="qty-span">${cart[item].quantity}</span>
                        <button class="qty-btn" onclick="increaseQuantity('${item}')">+</button>
                    </div>
                </div>
            </li>`;
    }
    cartHTML += "</ul>";

    cartContainer.innerHTML = cartHTML;
}

function updateFoodPageButtons() {
    let buttons = document.querySelectorAll(".add-btn");
    let cart = JSON.parse(localStorage.getItem("cart")) || {}; // Reload cart from storage

    buttons.forEach(btn => {
        let match = btn.getAttribute("onclick").match(/'([^']+)'/);
        if (match) {
            let itemName = match[1]; // Extract item name

            if (cart[itemName]) {
                btn.classList.add("disabled");
                btn.innerText = "Added";
            } else {
                btn.classList.remove("disabled");
                btn.innerText = "Add";
            }
        }
    });
}

// ---------------------------Increase-Quantity---------------------------
function increaseQuantity(itemName) {
    if (cart[itemName]) {
        cart[itemName].quantity++;
        saveCart();
        updateCart();
    }
}

// ---------------------------Decrease-Remove-Quantity---------------------------
function decreaseQuantity(itemName) {
    if (cart[itemName]) {
        if (cart[itemName].quantity > 1) {
            cart[itemName].quantity--;
        } else {
            delete cart[itemName]; // Remove item from cart
            resetAddButton(itemName);
        }
        saveCart();
        updateCart();
    }
}

// ---------------------------Finalize-Purchase-Button---------------------------
function finalizePurchase() {
    if (Object.keys(cart).length === 0) {
        alert("Please add items to the cart first.");
        return;
    }

    let total = 0;
    for (let item in cart) {
        total += cart[item].price * cart[item].quantity;
    }

    let cartContainer = document.getElementById("cart-content");
    cartContainer.innerHTML += `<p><strong>Total:</strong> ₹${total}</p>`;
}

// ---------------------------Clear-Cart-Button---------------------------
function clearCart() {
    cart = {};
    saveCart();
    updateCart();
    let buttons = document.querySelectorAll(".add-btn");
    buttons.forEach(btn => {
        btn.classList.remove("disabled");
        btn.innerText = "Add";
    });
}

// ---------------------------Back-To-Food---------------------------
function goBackToFood() {
    localStorage.setItem("cart", JSON.stringify(cart)); // Ensure cart is saved
    window.location.href = "Food.html";
}

// ---------------------------Food-Menu---------------------------
const menuData = [
    {
        category: "Beverages",
        image: "../img/beverages.jpg",
        items: [
            { name: "Classic Mojito", price: 150 },
            { name: "Watermelon Mojito", price: 170 },
            { name: "Aerated Water", price: 80 },
            { name: "Mineral Water", price: 50 },
            { name: "Fresh Lemon Water", price: 100 },
            { name: "Fresh Lemon Soda", price: 150 },
            { name: "Masala Chaas", price: 80 },
            { name: "Dry Fruit Lassi", price: 170 },
            { name: "Lassi", price: 140 }
        ]
    },
    {
        category: "Starters",
        image: "../img/starters.jpg",
        items: [
            { name: "Karari Roomali", price: 200 },
            { name: "Cheesy Cigar Rolls", price: 220 },
            { name: "Smoked Paneer Tikka", price: 250 },
            { name: "Paneer Pudina Tikka", price: 240 },
            { name: "Loaded Nachos", price: 180 },
            { name: "Crispy Chilli Water Chestnuts", price: 190 },
            { name: "Cantonese Spring Rolls", price: 210 },
            { name: "Crispy Veg Lai Style", price: 200 },
            { name: "Assorted Kebab Platter", price: 300 },
            { name: "Chinese Platter", price: 320 },
            { name: "Paneer Tikka", price: 250 },
            { name: "Szechwan Chilli Paneer Dry", price: 230 },
            { name: "Crispy Veg. Pepper Salt", price: 200 },
            { name: "Veg Manchurian Dry", price: 220 },
            { name: "Hara Kebab/ Dahi Kebab", price: 260 },
            { name: "Punjabi Samosa/ Cutlets", price: 150 },
            { name: "Dal Makhni Kulchette", price: 270 },
            { name: "Masala Khakhra Papad", price: 100 },
            { name: "Chaats", price: 180 }
        ]
    },
    {
        category: "Pizza and Accompaniment",
        image: "../img/pizzas.jpg",
        items: [
            { name: "Moroccan Salad", price: 180 },
            { name: "Waldrof Salad", price: 190 },
            { name: "Green Salad", price: 150 },
            { name: "Garlic Toast", price: 100 },
            { name: "Raita", price: 120 },
            { name: "Papad", price: 50 },
            { name: "Masala Papad", price: 70 },
            { name: "Cheesy Mexican Pizza", price: 350 },
            { name: "Paneer Exotica Pizza", price: 400 },
            { name: "Smoked Paneer Pizza", price: 380 },
            { name: "Double Cheese Margherita", price: 320 },
        ]
    },
    {
        category: "Soups",
        image: "../img/soups.jpg",
        items: [
            { name: "Khowsuey", price: 120 },
            { name: "Sweet Corn Veg", price: 110 },
            { name: "Hot & Sour/Manchow", price: 130 },
            { name: "Asian Bowl", price: 150 },
            { name: "Cream of Tomato", price: 100 },
            { name: "Creamy Water Chestnut", price: 160 },
            { name: "Truffle Potato Leek Soup", price: 180 }
        ]
    },
    {
        category: "World Cuisine + Rice & Noodles",
        image: "../img/world-cuisine.jpg",
        items: [
            { name: "Baked Spinach with Dumplings", price: 280 },
            { name: "Spaghetti/Penne", price: 260 },
            { name: "Baked Macaroni/Vegetable", price: 240 },
            { name: "Baked Lasagne", price: 290 },
            { name: "Szechwan Noodles", price: 220 },
            { name: "Hakka Noodles", price: 230 },
            { name: "Szechwan Rice", price: 200 },
            { name: "Veg Fried Rice", price: 190 },
            { name: "Mexican Hot Pot Rice", price: 250 },
            { name: "American Chop Suey", price: 270 },
            { name: "Szechwan Chilli Paneer", price: 300 },
            { name: "Manchurian with Gravy", price: 280 }
        ]
    },
    {
        category: "Indian",
        image: "../img/indian.jpg",
        items: [
            { name: "Smoked Paneer", price: 290 },
            { name: "Paneer Kofta with Gravy", price: 320 },
            { name: "Balti Paneer", price: 300 },
            { name: "Tawa Paneer Anardana", price: 310 },
            { name: "Paneer Tikka Lababdar", price: 330 },
            { name: "Lucknavi Tawa Paneer", price: 310 },
            { name: "Subz Tiranga", price: 290 },
            { name: "Malai Kofta", price: 280 },
            { name: "Avadhi Subz Handi", price: 320 },
            { name: "Dal Makhani", price: 250 },
            { name: "Cheese Butter Masala", price: 330 },
            { name: "Paneer Butter Masala", price: 320 },
            { name: "Veg Kolhapuri/Veg Jaipuri", price: 280 },
            { name: "Dum Aloo Kashmiri", price: 270 }
        ]
    },
    {
        category: "Rice & Roti",
        image: "../img/rice-and-roti.jpg",
        items: [
            { name: "Puri (Speciality)", price: 100 },
            { name: "Naan", price: 40 },
            { name: "Cheese Naan (Speciality)", price: 80 },
            { name: "Garlic Naan/Hariyali Naan", price: 70 },
            { name: "Roomali Roti", price: 60 },
            { name: "Butter Roti", price: 50 },
            { name: "Veg Handi Biryani", price: 200 },
            { name: "Dal Khichdi", price: 180 },
            { name: "Veg Pulao", price: 170 },
            { name: "Jeera Rice", price: 120 },
            { name: "Peas Pulao", price: 130 },
            { name: "Steamed Rice", price: 100 },
            { name: "Stuffed Kulcha", price: 90 },
            { name: "Tandoori Kulcha", price: 100 },
            { name: "Pudina/Lachhedar Paratha", price: 80 }
        ]
    },
    {
        category: "Desserts",
        image: "../img/desserts.jpg",
        items: [
            { name: "Shahi Kulfi Falooda", price: 200 },
            { name: "Tiramisu Meltdown", price: 250 },
            { name: "Baked Shahi Jamun", price: 180 },
            { name: "Baked Saffron Yogurt", price: 160 }
        ]
    },
    {
        category: "Sizzlers",
        image: "../img/sizzlers.jpg",
        items: [
            { name: "Asian Delicacy Sizzler", price: 350 },
            { name: "Avadhi Sizzler", price: 370 },
            { name: "Italian Fiesta Sizzler", price: 390 },
            { name: "Vegetable Kiev Sizzler", price: 400 }
        ]
    }
];

// Function to load menu dynamically with alternating order
function loadMenu() {
    let menuContainer = document.getElementById("menu-section");
    menuContainer.innerHTML = ""; // Clear existing content

    menuData.forEach((category, index) => {
        let div = document.createElement("div");
        div.classList.add("menu-container");

        let menuList = `
            <div class="menu-list">
                <h2>${category.category}</h2>
                <ul>
                    ${category.items.map(item => `
                        <li>
                            <span class="item-name">${item.name}</span>
                            <div>
                                <span class="item-price">₹${item.price}</span>
                                <button class="add-btn" onclick="addItem(this, '${item.name}', ${item.price})">Add</button>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>`;

        let menuImage = `
            <div class="menu-image">
                <img src="${category.image}" alt="${category.category}">
            </div>`;

        // Apply alternate ordering (even index → menu first, odd index → image first)
        div.innerHTML = index % 2 === 0 ? `${menuList}${menuImage}` : `${menuImage}${menuList}`;

        menuContainer.appendChild(div);
    });
}

// Call the function when the page loads
window.onload = loadMenu;
