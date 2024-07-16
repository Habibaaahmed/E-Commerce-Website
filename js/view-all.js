let slideIndex = 0;

function showSlide(n) {
    const slides = document.querySelectorAll('.slider img');
    if (n < 0) {
        slideIndex = slides.length - 1;
    } else if (n >= slides.length) {
        slideIndex = 0;
    } else {
        slideIndex = n;
    }
    
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
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

showSlide(slideIndex);
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');

    fetch('https://fakestoreapi.com/products')
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

                productBox.appendChild(productImage);
                productBox.appendChild(productTitle);
                productBox.appendChild(productPrice);
                productBox.appendChild(productRating);
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
});
