document.addEventListener("DOMContentLoaded", function () {
    const authToggle = document.getElementById("auth-toggle");
    const authModal = document.getElementById("auth-modal");
    const signInForm = document.getElementById("signInForm");
    const signUpForm = document.getElementById("signUpForm");
    const toggleAuthButtons = document.querySelectorAll("#toggle-auth");
    const closeModalButtons = document.querySelectorAll("#close-modal");
    const bookList = document.getElementById("book-list");
    const categoryList = document.getElementById("category-list");
    const addToCartButton = document.getElementById("addToCart");
    const headerDiv = authToggle.parentElement;

    let isSignUp = false;
    let isLoggedIn = false;
    let loggedInUsername = null;

    // Check if user is already logged in
    if (localStorage.getItem("loggedInUser")) {
        isLoggedIn = true;
        loggedInUsername = localStorage.getItem("loggedInUser");
        addToCartButton.style.display = "block";
        updateAuthToggleText(loggedInUsername);
        createLogoutButton();
    } else {
        addToCartButton.style.display = "none";
    }

    // Initially show Sign In form
    signInForm.classList.remove("hidden");
    signUpForm.classList.add("hidden");

    function toggleAuthMode() {
        if (isLoggedIn) return;
        isSignUp = !isSignUp;
        if (isSignUp) {
            signInForm.classList.add("hidden");
            signUpForm.classList.remove("hidden");
        } else {
            signInForm.classList.remove("hidden");
            signUpForm.classList.add("hidden");
        }
    }

    function showModal() {
        if (isLoggedIn) return;
        authModal.classList.remove("hidden");
        authModal.classList.add("modal-enter");
        requestAnimationFrame(() => {
            authModal.classList.add("modal-enter-active");
            authModal.classList.remove("modal-enter");
        });
    }

    function hideModal() {
        authModal.classList.add("modal-leave");
        requestAnimationFrame(() => {
            authModal.classList.add("hidden");
            authModal.classList.remove("modal-leave");
        });
    }

    function updateAuthToggleText(username) {
        authToggle.querySelector("span:first-child").textContent = "Welcome" + " " + username;
        authToggle.classList.remove("space-x-8");
        authToggle.querySelector("span:last-child").style.display = "none";
    }

    function createLogoutButton() {
        if (document.getElementById("logout-button")) return;
        const logoutButton = document.createElement("button");
        logoutButton.id = "logout-button";
        logoutButton.textContent = "Logout";
        logoutButton.classList.add(
            "bg-red-600",
            "hover:bg-red-700",
            "text-sm",
            "text-white",
            "font-semibold",
            "px-3",
            "py-1",
            "rounded-full",
            "transition-all",
            "duration-300",
            "ml-4"
        );
        headerDiv.appendChild(logoutButton);

        logoutButton.addEventListener("click", () => {
            isLoggedIn = false;
            loggedInUsername = null;
            localStorage.removeItem("loggedInUser");
            addToCartButton.style.display = "none";
            authToggle.querySelector("span:first-child").textContent = "Sign Up / Sign In";
            authToggle.classList.add("space-x-8");
            authToggle.querySelector("span:last-child").style.display = "inline";
            logoutButton.remove();
            // alert("Logged out successfully!");
            window.location.href = "/index.html";
        });
    }

    authToggle.addEventListener("click", showModal);
    closeModalButtons.forEach(button => button.addEventListener("click", hideModal));
    toggleAuthButtons.forEach(button => button.addEventListener("click", toggleAuthMode));

    // Handle Sign In form submission
    document.getElementById("auth-form-SignIn").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = signInForm.querySelector("#username").value;
        const password = signInForm.querySelector("#password").value;

        const storedUser = JSON.parse(localStorage.getItem(username));
        if (!storedUser) {
            alert("Username not found!");
            return;
        }
        if (storedUser.password !== password) {
            alert("Incorrect password!");
            return;
        }
        isLoggedIn = true;
        loggedInUsername = username;
        localStorage.setItem("loggedInUser", username);
        addToCartButton.style.display = "block";
        updateAuthToggleText(username);
        createLogoutButton();
        alert("Signed in successfully!");

        hideModal();
        document.getElementById("auth-form-SignIn").reset();
    });

    // Handle Sign Up form submission
    document.getElementById("auth-form-SignUp").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = signUpForm.querySelector("#username").value;
        const email = signUpForm.querySelector("#email").value;
        const password = signUpForm.querySelector("#password").value;
        const confirmPassword = signUpForm.querySelector("#confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }
        if (localStorage.getItem(username)) {
            alert("Username already exists!");
            return;
        }
        const user = { username, email, password };
        localStorage.setItem(username, JSON.stringify(user));
        alert("User registered successfully! Please sign in.");

        toggleAuthMode();
        document.getElementById("auth-form-SignUp").reset();
    });

    const toggleSwitch = document.getElementById("toggle-switch");
    const body = document.body;

    toggleSwitch.addEventListener("change", () => {
        if (toggleSwitch.checked) {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");
        } else {
            body.classList.add("light-mode");
            body.classList.remove("dark-mode");
        }
        updateBookItemStyles();
    });

    function updateBookItemStyles() {
        const bookItems = document.querySelectorAll(".book-item");
        const bookAuthors = document.querySelectorAll(".book-item p");
        bookItems.forEach((item) => {
            item.classList.toggle("text-white", body.classList.contains("dark-mode"));
        });
        bookAuthors.forEach((author) => {
            author.classList.toggle("text-gray-400", body.classList.contains("dark-mode"));
            author.classList.toggle("text-gray-600", !body.classList.contains("dark-mode"));
        });
    }

    // Fetch categories and books
    fetch("https://books-backend.p.goit.global/books/category-list")
        .then((response) => response.json())
        .then((categories) => {
            categories.sort((a, b) => a.list_name.localeCompare(b.list_name));
            categories.forEach((category) => {
                const button = document.createElement("button");
                button.textContent = category.list_name;
                button.setAttribute("data-category", category.list_name);
                button.classList.add(
                    "filter-btn",
                    "transition-all",
                    "text-start",
                    "text-gray-500",
                    "duration-300",
                    "hover:text-blue-700"
                );
                categoryList.appendChild(button);
            });
        })
        .catch((error) => console.error("Error fetching categories:", error));

    categoryList.addEventListener("click", (e) => {
        if (e.target.classList.contains("filter-btn")) {
            document.querySelectorAll(".filter-btn").forEach((btn) => {
                btn.classList.remove("active-category");
                btn.classList.add("text-gray-500");
            });
            e.target.classList.add("active-category");
            e.target.classList.remove("text-gray-500");
            const category = e.target.getAttribute("data-category");
            fetchBooksByCategory(category);
        }
    });

    function fetchBooksByCategory(category) {
        fetch(`https://books-backend.p.goit.global/books/top-books`)
            .then((response) => response.json())
            .then((books) => {
                if (category === "All") {
                    displayBooks(books.flatMap((cat) => cat.books));
                } else {
                    const categoryBooks = books.find((cat) => cat.list_name === category);
                    if (categoryBooks) {
                        displayBooks(categoryBooks.books);
                    }
                }
            })
            .catch((error) => console.error("Error fetching books:", error));
    }

    function displayBooks(books) {
        bookList.innerHTML = "";
        books.forEach((book) => {
            const bookItem = document.createElement("div");
            bookItem.classList.add("book-item", "p-2", "rounded-lg", "cursor-pointer");
            bookItem.innerHTML = `
                <div class="relative">
                    <img src="${book.book_image}" alt="${book.title}" class="h-[300px] w-[100%] border border-black img-card object-inherit rounded-lg mb-4">
                    <div class="bottom-overlay rounded-b-lg">
                        <p class="">QUICK VIEW</p>
                    </div>
                </div>
                <h3 class="text-md text-start font-semibold">${book.title}</h3>
                <p class="text-xs text-start text-gray-600">${book.author}</p>
            `;
            bookItem.addEventListener("click", () => showBookDetails(book));
            bookList.appendChild(bookItem);
        });
        updateBookItemStyles();
    }

    function getUserShoppingListKey() {
        return loggedInUsername ? `shoppingList_${loggedInUsername}` : null;
    }

    function showBookDetails(book) {
        const modal = document.createElement("div");
        modal.classList.add(
            "fixed",
            "inset-0",
            "bg-gray-600",
            "bg-opacity-50",
            "overflow-y-auto",
            "h-full",
            "w-full",
            "flex",
            "items-center",
            "justify-center",
            "z-50"
        );

        const shoppingListKey = getUserShoppingListKey();
        const shoppingList = isLoggedIn ? JSON.parse(localStorage.getItem(shoppingListKey)) || [] : [];
        const isInList = isLoggedIn && shoppingList.some(item => item._id === book._id);
        const buttonText = isInList ? "REMOVE FROM SHOPPING LIST" : "ADD TO SHOPPING LIST";

        modal.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
                <div class="flex gap-4">
                    <img src="${book.book_image}" alt="${book.title}" class="h-[35vh] object-cover rounded-lg mb-3">
                    <div class="flex gap-7 justify-between items-start mb-4">
                        <div class="flex flex-col gap-3">
                            <h2 class="text-xl font-bold text-start">${book.title}</h2>
                            <p class="text-sm text-start text-gray-400 font-semibold mb-2">${book.author}</p>
                            <p class="text-sm mb-4 text-start">${book.description || "There is no description of this book."}</p>
                            <div class="flex justify-between items-center">
                                <a href="${book.amazon_product_url}"><img src="/assets/img/amazon-shop.png" alt="amazon-shop"></a>
                                <a href=""><img src="/assets/img/apple-shop.png" alt="apple-shop"></a>
                                <a href=""><img src="/assets/img/bookshop.png" alt="bookshop"></a>
                            </div>
                        </div>
                        <button class="text-gray-500 hover:text-gray-700 close-modal">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <button id="toggle-shopping-list" class="w-full p-2 rounded-full mt-4 border border-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xl">${buttonText}</button>
            </div>
        `;

        document.body.appendChild(modal);

        const toggleButton = modal.querySelector("#toggle-shopping-list");
        toggleButton.addEventListener("click", () => {
            if (!isLoggedIn) {
                alert("For add to cart, please login.");
                return;
            }

            let currentList = JSON.parse(localStorage.getItem(shoppingListKey)) || [];
            const isCurrentlyInList = currentList.some(item => item._id === book._id);

            if (isCurrentlyInList) {
                currentList = currentList.filter(item => item._id !== book._id);
                toggleButton.textContent = "ADD TO SHOPPING LIST";
                // alert(`${book.title} removed from your shopping list!`);
            } else {
                currentList.push(book);
                toggleButton.textContent = "REMOVE FROM SHOPPING LIST";
                // alert(`${book.title} added to your shopping list!`);
            }

            localStorage.setItem(shoppingListKey, JSON.stringify(currentList));
        });

        modal.querySelector(".close-modal").addEventListener("click", () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    fetchBooksByCategory("All");
    document.querySelector('[data-category="All"]').classList.add("active-category");

    // Link "Add to Cart" button to cart page
    // addToCartButton.addEventListener("click", () => {
    //     window.location.href = "/cart.html";
    // });
});



// add to card code

document.addEventListener("DOMContentLoaded", function () {
    const shoppingListDiv = document.getElementById("shopping-list");

    function getUserShoppingListKey() {
        const username = localStorage.getItem("loggedInUser");
        return username ? `shoppingList_${username}` : null;
    }

    function displayShoppingList() {
        const shoppingListKey = getUserShoppingListKey();
        if (!shoppingListKey) {
            shoppingListDiv.innerHTML = "<p class='text-center text-gray-600'>Please sign in to view your shopping list.</p>";
            return;
        }

        const shoppingList = JSON.parse(localStorage.getItem(shoppingListKey)) || [];
        shoppingListDiv.innerHTML = "";

        if (shoppingList.length === 0) {
            shoppingListDiv.innerHTML = "<p class='text-center text-gray-600'>Your shopping list is empty.</p>";
            return;
        }

        shoppingList.forEach((book) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("p-4", "border", "rounded-lg", "flex", "gap-4");
            itemDiv.innerHTML = `
                <img src="${book.book_image}" alt="${book.title}" class="h-[150px] w-[100px] object-cover rounded-lg">
                <div class="flex flex-col justify-between">
                    <div>
                        <h3 class="text-lg font-semibold">${book.title}</h3>
                        <p class="text-sm text-gray-600">${book.author}</p>
                    </div>
                    <button class="remove-btn text-red-600 hover:text-red-800 font-semibold">Remove</button>
                </div>
            `;
            shoppingListDiv.appendChild(itemDiv);

            itemDiv.querySelector(".remove-btn").addEventListener("click", () => {
                let currentList = JSON.parse(localStorage.getItem(shoppingListKey)) || [];
                currentList = currentList.filter(item => item._id !== book._id);
                localStorage.setItem(shoppingListKey, JSON.stringify(currentList));
                displayShoppingList();
                // alert(`${book.title} removed from your shopping list!`);
            });
        });
    }

    displayShoppingList();
});