document.addEventListener('DOMContentLoaded', function() {
    // Sample product data for Handbags and Jewelry only
    const products = [
        // Handbags
        {
            id: 1,
            title: "Designer Leather Handbag",
            category: "handbag",
            price: 2500,
            image: "images/handbag1.jpg",
            description: "Premium quality leather handbag with multiple compartments"
        },
        {
            id: 2,
            title: "Evening Clutch Purse",
            category: "handbag",
            price: 1800,
            image: "images/handbag2.jpg",
            description: "Elegant clutch for special occasions"
        },
        {
            id: 3,
            title: "Casual Canvas Tote",
            category: "handbag",
            price: 1200,
            image: "images/handbag3.jpg",
            description: "Spacious tote bag for everyday use"
        },
        
        // Jewelry
        {
            id: 4,
            title: "Silver Pearl Necklace",
            category: "jewelry",
            price: 3500,
            image: "images/jewelry1.jpg",
            description: "Elegant silver necklace with pearl accents"
        },
        {
            id: 5,
            title: "Gold Plated Bracelet",
            category: "jewelry",
            price: 2800,
            image: "images/jewelry2.jpg",
            description: "Beautiful gold plated bracelet"
        },
        {
            id: 6,
            title: "Diamond Stud Earrings",
            category: "jewelry",
            price: 4200,
            image: "images/jewelry3.jpg",
            description: "Classic diamond stud earrings"
        },
        {
            id: 7,
            title: "Gemstone Ring",
            category: "jewelry",
            price: 3200,
            image: "images/jewelry4.jpg",
            description: "Handcrafted gemstone ring"
        }
    ];

    // Shopping cart
    let cart = [];

    // DOM Elements
    const handbagsContainer = document.getElementById('handbagsContainer');
    const jewelryContainer = document.getElementById('jewelryContainer');
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

    // Display products by category
    function displayProducts() {
        handbagsContainer.innerHTML = '';
        jewelryContainer.innerHTML = '';
        
        products.forEach(product => {
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
            
            // Add to appropriate container based on category
            if (product.category === 'handbag') {
                handbagsContainer.appendChild(productCard);
            } else if (product.category === 'jewelry') {
                jewelryContainer.appendChild(productCard);
            }
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Add to cart function
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

    // Update cart function
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

    // Update quantity function
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

    // Remove item function
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
                // Show confirmation
                checkoutModal.style.display = 'none';
                confirmationModal.style.display = 'block';
                
                // Clear cart
                cart = [];
                updateCart();
                
                // Reset form
                checkoutForm.reset();
                mobilePaymentDetails.style.display = 'none';
            } else {
                alert('Error saving order: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save order. Please try again or contact us.');
        }
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
            material: document.getElementById('material').value,
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








// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  mobileMenuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = '';
});

mobileMenuOverlay.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = '';
});
