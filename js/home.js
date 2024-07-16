let slideIndex = 0;
let intervalId;

function showSlide(n) {
    const slides = document.querySelectorAll('.slider img');
    const indicators = document.querySelectorAll('.indicator');
    
    if (n < 0) {
        slideIndex = slides.length - 1;
    } else if (n >= slides.length) {
        slideIndex = 0;
    } else {
        slideIndex = n;
    }
    
    slides.forEach((slide, index) => {
        slide.style.display = (index === slideIndex) ? 'block' : 'none';
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === slideIndex);
    });
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function goToSlide(n) {
    showSlide(n);
}

function startSlider() {
    intervalId = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(intervalId);
}

document.addEventListener('DOMContentLoaded', (event) => {
    showSlide(slideIndex); // Initialize the slider
    startSlider();
});
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');

    fetch('https://fakestoreapi.com/products?limit=8')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productBox = document.createElement('div');
                productBox.className = 'product-box';

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.title;

                const productTitle = document.createElement('h4');
                productTitle.textContent = product.title;

                const productPrice = document.createElement('p');
                productPrice.className = 'price';
                productPrice.textContent = `$${product.price}`;

                const productRating = document.createElement('div');
                productRating.className = 'rating';
                productRating.innerHTML = getStars(product.rating.rate);

                // Create Add to Cart Button
                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Add to Cart';
                addToCartButton.className = 'add-to-cart-button';

                // Event listener for Add to Cart Button
                addToCartButton.addEventListener('click', () => {
                    addToCart(product); 
                    
                });

                // Append elements to productBox
                productBox.appendChild(productImage);
                productBox.appendChild(productTitle);
                productBox.appendChild(productPrice);
                productBox.appendChild(productRating);
                productBox.appendChild(addToCartButton); // Append the button to the productBox

                productBox.addEventListener('click', () => {
                    window.location.href = `product-detail.html?id=${product.id}`;
                });

                productContainer.appendChild(productBox);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    function getStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
    }

    function addToCart(product) {
        let cartItems = localStorage.getItem('cartItems');
        cartItems = cartItems ? JSON.parse(cartItems) : [];

        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
});
