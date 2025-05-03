document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            title: "Floral Summer Dress",
            category: "clothing",
            price: 1200,
            image: "images/Products/Clothing/florasummerdress1.jpeg",
            description: "Beautiful floral print summer dress with comfortable fit."
        },
        {
            id: 2,
            title: "Designer Handbag",
            category: "accessories",
            price: 1000,
            image: "images/Products/Accessories/handbag1.jpeg",
            description: "Stylish handbag with multiple compartments and durable material."
        },
        {
            id: 3,
            title: "Custom Name Necklace",
            category: "custom",
            price: 500,
            image: "images/Products/Accessories/earrings1.jpeg",
            description: "Personalized necklace with your name in elegant script."
        },
        {
            id: 4,
            title: "Denim Jacket",
            category: "clothing",
            price: 2000,
            image: "images/product4.jpg",
            description: "Classic denim jacket with modern fit and comfortable wear."
        },
        {
            id: 5,
            title: "Pearl Earrings",
            category: "accessories",
            price: 800,
            image:  "images/Products/Accessories/earrings1.jpeg",
            description: "Elegant pearl earrings perfect for any occasion."
        },
        {
            id: 6,
            title: "Custom Printed T-Shirt",
            category: "custom",
            price: 900,
            image: "images/product6.jpg",
            description: "T-shirt with your custom design or text printed on it."
        },
        {
            id: 7,
            title: "Silk Scarf",
            category: "accessories",
            price: 750,
            image: "images/product7.jpg",
            description: "Luxurious silk scarf with vibrant patterns."
        },
        {
            id: 8,
            title: "Embroidered Skirt",
            category: "clothing",
            price: 1600,
            image: "images/product8.jpg",
            description: "Hand-embroidered skirt with traditional designs."
        }
    ];

    // Shopping cart
    let cart = [];

    // DOM Elements
    const productContainer = document.getElementById('productContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckout = document.querySelector('.close-checkout');
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutOrderSummary = document.getElementById('checkoutOrderSummary');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const paymentMethod = document.getElementById('paymentMethod');
    const mobilePaymentDetails = document.getElementById('mobilePaymentDetails');
    const confirmationModal = document.getElementById('confirmationModal');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    const customOrderForm = document.getElementById('customOrderForm');
    const colorInput = document.getElementById('color');
    const designDescription = document.getElementById('designDescription');
    const customPreview = document.getElementById('customPreview');
    const previewText = document.getElementById('previewText');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    // Display products
    function displayProducts(filter = 'all') {
        productContainer.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(product => product.category === filter);
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <span class="product-category">${product.category}</span>
                    <div class="product-price">৳${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                        <button class="btn view-details">Details</button>
                    </div>
                </div>
            `;
            productContainer.appendChild(productCard);
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Filter products
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter products
            displayProducts(this.dataset.filter);
        });
    });

    // Add to cart
    function addToCart(e) {
        const productId = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === productId);
        
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        showCartNotification();
    }

    // Update cart
    function updateCart() {
        // Update cart count
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = cartCount;
        
        // Update cart modal
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '৳0.00';
            return;
        }
        
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">৳${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <span class="remove-item" data-id="${item.id}">&times;</span>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = `৳${total.toFixed(2)}`;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', updateQuantity);
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Update quantity
    function updateQuantity(e) {
        const productId = parseInt(e.target.dataset.id);
        const item = cart.find(item => item.id === productId);
        const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
        
        if (e.target.classList.contains('minus')) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            }
        } else if (e.target.classList.contains('plus')) {
            item.quantity += 1;
        } else if (e.target.classList.contains('quantity-input')) {
            const newQuantity = parseInt(e.target.value);
            if (!isNaN(newQuantity) && newQuantity >= 1) {
                item.quantity = newQuantity;
            } else {
                e.target.value = item.quantity;
            }
        }
        
        input.value = item.quantity;
        updateCart();
    }

    // Remove item
    function removeItem(e) {
        const productId = parseInt(e.target.dataset.id);
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Show cart notification
    function showCartNotification() {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = 'Item added to cart!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    // Toggle cart modal
    cartIcon.addEventListener('click', function() {
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeCart.addEventListener('click', function() {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Proceed to checkout
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) return;
        
        cartModal.style.display = 'none';
        checkoutModal.style.display = 'block';
        
        // Update checkout order summary
        checkoutOrderSummary.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <span>${item.title} x ${item.quantity}</span>
                <span>৳${itemTotal.toFixed(2)}</span>
            `;
            checkoutOrderSummary.appendChild(orderItem);
        });
        
        checkoutTotal.textContent = `৳${total.toFixed(2)}`;
    });

    // Close checkout modal
    closeCheckout.addEventListener('click', function() {
        checkoutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Payment method change
    paymentMethod.addEventListener('change', function() {
        if (this.value === 'bkash' || this.value === 'nagad' || this.value === 'rocket') {
            mobilePaymentDetails.style.display = 'block';
        } else {
            mobilePaymentDetails.style.display = 'none';
        }
    });

    // Place order
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real app, you would send this data to your server
        const orderData = {
            customer: {
                name: document.getElementById('fullName').value,
                phone: document.getElementById('checkoutPhone').value,
                email: document.getElementById('checkoutEmail').value,
                address: document.getElementById('deliveryAddress').value
            },
            payment: {
                method: paymentMethod.value,
                account: document.getElementById('mobileAccount')?.value || null,
                transactionId: document.getElementById('transactionId')?.value || null
            },
            items: cart,
            total: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
        };
        
        console.log('Order placed:', orderData);
        
        // Show confirmation
        checkoutModal.style.display = 'none';
        confirmationModal.style.display = 'block';
        
        // Clear cart
        cart = [];
        updateCart();
        
        // Reset form
        checkoutForm.reset();
        mobilePaymentDetails.style.display = 'none';
    });

    // Continue shopping
    continueShoppingBtn.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Custom order form
    customOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customOrder = {
            productType: document.getElementById('productType').value,
            size: document.getElementById('size').value,
            color: document.getElementById('color').value,
            designDescription: document.getElementById('designDescription').value,
            image: document.getElementById('customImage').files[0] || null
        };
        
        // In a real app, you would send this data to your server
        console.log('Custom order requested:', customOrder);
        
        // Show success message
        alert('Your custom order request has been submitted! We will contact you shortly to discuss the details.');
        
        // Reset form
        customOrderForm.reset();
        customPreview.src = 'images/custom-preview.png';
        previewText.textContent = 'Describe your design to see a preview';
    });

    // Update custom preview
    colorInput.addEventListener('input', updateCustomPreview);
    designDescription.addEventListener('input', updateCustomPreview);

    function updateCustomPreview() {
        const color = colorInput.value;
        const description = designDescription.value;
        
        // In a real app, you might have more sophisticated preview generation
        if (description) {
            previewText.textContent = description;
            customPreview.style.border = `5px solid ${color}`;
        } else {
            previewText.textContent = 'Describe your design to see a preview';
            customPreview.style.border = 'none';
        }
    }

    // Contact form
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const contactData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // In a real app, you would send this data to your server
        console.log('Contact form submitted:', contactData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });

    // Newsletter form
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // In a real app, you would send this data to your server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        
        // Reset form
        newsletterForm.reset();
    });

    // Initialize the page
    displayProducts();
});













checkoutForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const orderData = {
        customer: {
            name: document.getElementById('fullName').value,
            phone: document.getElementById('checkoutPhone').value,
            email: document.getElementById('checkoutEmail').value,
            address: document.getElementById('deliveryAddress').value
        },
        payment: {
            method: paymentMethod.value,
            account: document.getElementById('mobileAccount')?.value || null,
            transactionId: document.getElementById('transactionId')?.value || null
        },
        items: cart,
        total: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    };
    
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby1UBUOlEnWDDglIqQOEwRCrj2U7MlNRfgdlvY5Y1PfvGv4Lgy7aXgk8Bcvh9NpINKzDA/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            checkoutModal.style.display = 'none';
            confirmationModal.style.display = 'block';
            cart = [];
            updateCart();
            checkoutForm.reset();
            mobilePaymentDetails.style.display = 'none';
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to save order. Please try again or contact us.');
    }
});













  // Hamburger Menu Functionality
const hamburger = document.querySelector('.hamburger-menu');
const nav = document.querySelector('nav');
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
});

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
    });
});







