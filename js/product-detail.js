document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail-container');

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const productDetailBox = document.createElement('div');
            productDetailBox.className = 'product-detail-box';

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.title;

            const productInfo = document.createElement('div');
            productInfo.className = 'product-info';

            const productTitle = document.createElement('h2');
            productTitle.textContent = product.title;

            const productPrice = document.createElement('p');
            productPrice.className = 'price';
            productPrice.textContent = `$${product.price}`;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;

            const productRating = document.createElement('div');
            productRating.className = 'rating';
            productRating.innerHTML = getStars(product.rating.rate);


            productInfo.appendChild(productTitle);
            productInfo.appendChild(productRating);
            productInfo.appendChild(productPrice);
            productInfo.appendChild(productDescription);
            

            productDetailBox.appendChild(productImage);
            productDetailBox.appendChild(productInfo);

            productDetailContainer.appendChild(productDetailBox);
        })
        .catch(error => console.error('Error fetching product details:', error));
        function getStars(rating) {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5 ? 1 : 0;
            const emptyStars = 5 - fullStars - halfStar;
            return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
        }
});
