// Define an array of product objects
const products = [
  {
    imageName: "chickenSalad.jpg",
    imageAlt: "Chickensalad with cucumbers, avocados and onions in bowl",
    name: "Sliced Chicken Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },
  {
    imageName: "italianSalad.jpeg",
    imageAlt:
      "A delightful blend of fresh lettuce, cucumbers, black olives, and feta cheese, drizzled with balsamic vinaigrette, capturing the essence of Italy.",
    name: "Italian Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },
  {
    imageName: "chickenSalad.jpg",
    imageAlt: "Chickensalad with cucumbers, avocados and onions in bowl",
    name: "Sliced Chicken Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },
  {
    imageName: "chickenSalad.jpg",
    imageAlt: "Chickensalad with cucumbers, avocados and onions in bowl",
    name: "Sliced Chicken Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },
  {
    imageName: "chickenSalad.jpg",
    imageAlt: "Chickensalad with cucumbers, avocados and onions in bowl",
    name: "Sliced Chicken Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },
  {
    imageName: "chickenSalad.jpg",
    imageAlt: "Chickensalad with cucumbers, avocados and onions in bowl",
    name: "Sliced Chicken Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },
  {
    imageName: "chickenSalad.jpg",
    imageAlt: "Chickensalad with cucumbers, avocados and onions in bowl",
    name: "Sliced Chicken Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },
  {
    imageName: "chickenSalad.jpg",
    imageAlt: "Chickensalad with cucumbers, avocados and onions in bowl",
    name: "Sliced Chicken Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },
  {
    imageName: "chickenSalad.jpg",
    imageAlt: "Chickensalad with cucumbers, avocados and onions in bowl",
    name: "Sliced Chicken Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },
  {
    imageName: "chickenSalad.jpg",
    imageAlt: "Chickensalad with cucumbers, avocados and onions in bowl",
    name: "Sliced Chicken Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },
  {
    imageName: "chickenSalad.jpg",
    imageAlt: "Chickensalad with cucumbers, avocados and onions in bowl",
    name: "Sliced Chicken Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },
  {
    imageName: "chickenSalad.jpg",
    imageAlt: "Chickensalad with cucumbers, avocados and onions in bowl",
    name: "Sliced Chicken Salad",
    description:
      "Tender grilled chicken breast served atop a bed of crisp greens, cherry tomatoes, and zesty Italian dressing.",
    allergens: "G, L, M, P, E, S",
    price: "13,90€",
  },

  // ...add more product objects with different details
];

/*   G = Gluteeniton
  L = Laktoositon
  M = Maidoton
  P = Pähkinätön
  E = Ei sisällä kananmunaa
  S = Soijaton
  V = Vegaani 
  K = Kasvissyöjä */

// Function to create a product section HTML
function createProductHTML(product) {
  return `
      <section class="product">
        <img src="image/${product.imageName}" class="productImage" alt="${product.imageAlt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productsDescription">${product.description}</p>
        <div class="moreInfo">
          <p class="productAllergens">${product.allergens}</p>
          <p class="productPrice">${product.price}</p>
          <button class="productAdd">&#43;</button>
        </div>
      </section>
    `;
}

// Function to render all products to the DOM
function renderProducts(products) {
  const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = products.map(createProductHTML).join("");
}

// Call renderProducts() on window load or document DOMContentLoaded event as needed
window.onload = () => renderProducts(products);
