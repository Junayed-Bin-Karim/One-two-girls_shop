document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            title: "Handbag",
            category: "Handbag",
            price: 500,
            image: "images/Products/Handbag/bag2.jpeg",
            description: "Beautiful floral print summer dress with comfortable fit."
        },
        {
            id: 2,
            title: "Ear Rings",
            category: "Jewelry",
            price: 300,
            image: "images/Products/Jewelry/earrings1.jpeg",
            description: "Stylish handbag with multiple compartments and durable material."
        },
        {
            id: 3,
            title: "Handbag",
            category: "custom",
            price: 650,
            image: "images/Products/Handbag/handbag1.jpeg",
            description: "Personalized necklace with your name in elegant script."
        },
        {
            id: 4,
            title: "Handbag",
            category: "Handbag",
            price: 400,
            image: "images/products/Handbag/bag3.jpeg",
            description: "Classic denim jacket with modern fit and comfortable wear."
        },
        {
            id: 5,
            title: "Handbag",
            category: "Handbag",
    
            price: 1200,
            image:  "images/Products/Handbag/bag4.jpeg",
            description: "Elegant pearl earrings perfect for any occasion."
        },
        {
            id: 6,
            title: "Handbag",
            category: "custom",
            price: 900,
            image: "images/products/Handbag/bag5.jpeg",
            description: "T-shirt with your custom design or text printed on it."
        },
        {
            id: 7,
            title: "Design Handbag",
            category: "Handbag",
            price: 750,
            image: "images/products/Handbag/bag6.jpeg",
            description: "Luxurious silk scarf with vibrant patterns."
        },
        {
            id: 8,
            title: "Bracelet",
            category: "Jewelry",
            price: 350,
            image: "images/products/Jewelry/bracelet.jpeg",
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














// Product Details Modal
const productModal = document.getElementById('productModal');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalAddToCart = document.getElementById('modalAddToCart');
const modalCustomize = document.getElementById('modalCustomize');
const closeModal = document.querySelector('.close-modal');

// Open product details
function openProductDetails(product) {
    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;
    modalProductTitle.textContent = product.name;
    modalProductPrice.textContent = `৳${product.price.toFixed(2)}`;
    modalProductDescription.textContent = product.description || 'No description available';
    
    // Set product ID on modal buttons
    modalAddToCart.dataset.id = product.id;
    modalCustomize.dataset.id = product.id;
    
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
closeModal.addEventListener('click', () => {
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close when clicking outside modal
window.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Update product cards to include details button
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">৳${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn-details">Details</button>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// Event delegation for details buttons
document.getElementById('productContainer').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-details')) {
        const productCard = e.target.closest('.product-card');
        const productId = productCard.dataset.id;
        const product = products.find(p => p.id == productId);
        openProductDetails(product);
    }
});








// Mobile swipe functionality
let touchStartX = 0;
let touchEndX = 0;
const productContainer = document.getElementById('productContainer');

productContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

productContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        const scrollAmount = window.innerWidth * 0.8;
        productContainer.scrollBy({left: scrollAmount, behavior: 'smooth'});
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        const scrollAmount = window.innerWidth * 0.8;
        productContainer.scrollBy({left: -scrollAmount, behavior: 'smooth'});
    }
}































document.addEventListener('DOMContentLoaded', function() {
    // Review Slider Functionality
    const slider = document.querySelector('.review-slider');
    const slides = document.querySelectorAll('.review-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slideCount = slides.length;
    let currentIndex = 0;
    let autoSlideInterval;
    const slideWidth = 100 / slideCount;
    
    // Set initial position
    updateSliderPosition();
    
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slideCount - 1;
        updateSliderPosition();
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0;
        updateSliderPosition();
        resetAutoSlide();
    });
    
    // Update slider position
    function updateSliderPosition() {
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
        
        // Update active slide indicator if you have one
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0;
            updateSliderPosition();
        }, 5000); // Change slide every 5 seconds
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Start auto slide on page load
    startAutoSlide();
    
    // Pause auto slide when hovering over slider
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval);
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, {passive: true});
    
    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) {
            // Swipe left - next slide
            currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0;
        } else if (difference < -50) {
            // Swipe right - previous slide
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slideCount - 1;
        }
        updateSliderPosition();
    }
    
    // Star rating functionality for review form
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingInput = document.getElementById('reviewRating');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('active');
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        star.addEventListener('mouseout', () => {
            const currentRating = parseInt(ratingInput.value);
            
            stars.forEach((s, index) => {
                if (index < currentRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
    




    
    // Review form submission
    const reviewForm = document.getElementById('reviewForm');
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('reviewerName').value;
        const email = document.getElementById('reviewerEmail').value;
        const content = document.getElementById('reviewContent').value;
        const rating = document.getElementById('reviewRating').value;
        
        // Here you would typically send this data to your server
        // For demonstration, we'll just create a new review card
        if (name && email && content && rating > 0) {
            createNewReviewCard(name, rating, content);
            reviewForm.reset();
            resetStars();
            
            // Show success message
            alert('Thank you for your review!');
        } else {
            alert('Please fill out all fields and provide a rating.');
        }
    });
    
    function createNewReviewCard(name, rating, content) {
        const newReview = document.createElement('div');
        newReview.className = 'review-slide';
        
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Create stars HTML
        let starsHtml = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        
        newReview.innerHTML = `
            <div class="review-card">
                <div class="reviewer-info">
                    <img src="images/Customer Reviews/default-avatar.jpg" alt="${name}" class="reviewer-avatar">
                    <div class="reviewer-details">
                        <h4>${name}</h4>
                        <div class="review-rating">
                            ${starsHtml}
                        </div>
                    </div>
                </div>
                <p class="review-text">"${content}"</p>
                <div class="review-date">${dateStr}</div>
            </div>
        `;
        
        // Add the new review to the slider
        slider.appendChild(newReview);
        
        // Update slide count and width
        const newSlideCount = document.querySelectorAll('.review-slide').length;
        slider.style.width = `${newSlideCount * 100}%`;
    }
    
    function resetStars() {
        stars.forEach(star => {
            star.classList.remove('active', 'fas');
            star.classList.add('far');
        });
        ratingInput.value = 0;
    }
});


















// Update the delivery charge calculation function
function calculateDelivery() {
    const deliveryAddress = document.getElementById('deliveryAddress').value.toLowerCase();
    let deliveryCharge = 0;
    
    if (deliveryAddress.includes('dinajpur')) {
        deliveryCharge = 60;
        showDeliveryNotification("Dinajpur delivery: 60 Taka");
    } else if (deliveryAddress.trim() !== '') {
        deliveryCharge = 130;
        showDeliveryNotification("Outside Dinajpur delivery: 130 Taka");
    } else {
        hideDeliveryNotification();
    }
    
    document.getElementById('deliveryCharge').textContent = `৳${deliveryCharge.toFixed(2)}`;
    return deliveryCharge;
}

// Add these new functions for the notification
function showDeliveryNotification(message) {
    const notification = document.querySelector('.delivery-notification');
    if (notification) {
        notification.style.display = 'block';
        // You can update the message here if needed
    }
}

function hideDeliveryNotification() {
    const notification = document.querySelector('.delivery-notification');
    if (notification) {
        notification.style.display = 'none';
    }
}










// Update your checkout button event listener
document.getElementById('checkoutBtn').addEventListener('click', function() {
    // Show the checkout modal
    document.getElementById('checkoutModal').style.display = 'block';
    
    // Show the delivery notification by default
    showDeliveryNotification();
    updateCheckoutTotal();
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
        await fetch('https://script.google.com/macros/s/AKfycbwB3qs9xz4cCmYZFk3N9MRGOBtvOTr9kku098yiZ-Yk99AHqZlujniAEhuN6gFs5iB-EA/exec', {
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

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
                      .setMimeType(ContentService.MimeType.JSON)
                      .setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins

});
















