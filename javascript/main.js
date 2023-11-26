let productos;
const url = "productos.json";

async function fetchProductos() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    productos = await response.json();
    return productos;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

fetchProductos()
  .then((productos) => {
    console.log(productos);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

//seleccionar todos los botones
const buttons = document.querySelectorAll(".productos button");

//mensaje bienvenida
const mensajeBienvenida = ["¡Bienvenido!, Selecciona los productos deseados"];

//search
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("input", performSearch);

//chequear si el mensaje de bienvenida fue mostrado usando LOCAL STORAGE
const mensajeBienvenidaMostrado = localStorage.getItem(
  "mensajeBienvenidaMostrado"
);
if (!mensajeBienvenidaMostrado) {
  alert("¡Bienvenido! Selecciona los productos deseados");

  localStorage.setItem("mensajeBienvenidaMostrado", true);
}


buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const productName = event.target.getAttribute("data-product");
    removeFromCart(productName);
  });
});

let costoTotal = 0;

let carrito = [];


const cartLink = document.querySelector(".cart a");

cartLink.addEventListener("click", function () {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
  }
});
//funcion para restar productos del stock
function restarDelStock(producto, cantidad) {
  if (producto.stock >= cantidad) {
    producto.stock -= cantidad;
    return true;
  } else {
    return false;
  }
}
//crear prod carrito
function createSidebarProduct(product, quantity) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("sidebar-product");

  productContainer.innerHTML = `
        <span>${product.nombre} - Quantity: ${quantity}</span>
        <button onclick="removeFromCart('${product.nombre}')">Remove</button>
    `;

  return productContainer;
}
//funcion para agregar un producto al carrito
function addToCart(productName) {
  const product = productos.find((item) => item.nombre === productName);
  const quantityInput = document.querySelector(
    `#${productName} .quantity-input`
  );
  const quantity = parseInt(quantityInput.value);

  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = ""; // Clear previous content

  carrito.forEach((item) => {
    sidebar.appendChild(createSidebarProduct(item.producto, item.cantidad));
  });
  //cantidad es mayor al stock disponible
  if (quantity > product.stock) {
    alert(
      `La cantidad ingresada para ${productName} es mayor al stock disponible (Stock: ${product.stock})`
    );
    return; // Detener la ejecución de la función si la cantidad es mayor al stock
  }

  const existingItemIndex = carrito.findIndex(
    (item) => item.producto.nombre === productName
  );

  if (existingItemIndex !== -1) {
    carrito[existingItemIndex].cantidad += quantity;
  } else {
    carrito.push({ producto: product, cantidad: quantity });
  }

  costoTotal += product.precio * quantity;

  updateCartDisplay();

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Agregado al carrito",
    showConfirmButton: false,
    timer: 1000,
  });

  // guardar el carrito en el local storage
  saveCartToLocalStorage();
}

//eliminar del carrito
function removeFromCart(productName) {
  const existingItemIndex = carrito.findIndex(
    (item) => item.producto.nombre === productName
  );
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = ""; // Clear previous content

  carrito.forEach((item) => {
    sidebar.appendChild(createSidebarProduct(item.producto, item.cantidad));
  });
  if (existingItemIndex !== -1) {
    const removedItem = carrito.splice(existingItemIndex, 1)[0];
    costoTotal -= removedItem.producto.precio * removedItem.cantidad;
    updateCartDisplay();
    saveCartToLocalStorage();
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Eliminado del carrito",
      showConfirmButton: false,
      timer: 1000,
    });
  }
}



// Display del carrito en el sidebar
function updateSidebarDisplay() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = ""; // Clear previous content

  carrito.forEach((item) => {
    sidebar.appendChild(createSidebarProduct(item.producto, item.cantidad));
  });

  // Agregar costo total y checkout button al sidebar
  const totalCostElement = document.createElement("div");
  totalCostElement.textContent = `Total: $${costoTotal.toFixed(2)}`;

  const checkoutButton = document.createElement("button");
  checkoutButton.textContent = "Checkout";
  checkoutButton.addEventListener("click", handleCheckout);

  sidebar.appendChild(totalCostElement);
  sidebar.appendChild(checkoutButton);
}

// Actualizar la visualización del carrito
function updateCartDisplay() {
  cartLink.textContent = `Carrito (${carrito.length}) - $${costoTotal.toFixed(
    2
  )}`;
  updateSidebarDisplay();
}

// Función para manejar el checkout
function handleCheckout() {
 
  alert("Checkout completed!");
  // vaciar carrito despues del checkout
  carrito = [];
  costoTotal = 0;
  updateCartDisplay();
  saveCartToLocalStorage();
}


//array a JSON y guardar en Local
function saveCartToLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("carrito");
  if (savedCart) {
    carrito = JSON.parse(savedCart);

    costoTotal = carrito.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );
    updateCartDisplay();
  }
}
loadCartFromLocalStorage();

//realizar busqueda
function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredProducts = productos.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm)
  );

  displayFilteredProducts(filteredProducts);
}

// Function to create an element for each product and add it to the DOM
function displayFilteredProducts(filteredProducts) {
  const cardsContainer = document.querySelector(".cards");

  // Clear previous content
  cardsContainer.innerHTML = "";

  filteredProducts.forEach((product) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("productos");

    productContainer.innerHTML = `
        
            <h2>${product.nombre}</h2>
            <span>$${product.precio}</span>
            <div class="quantity-container">
                <button onclick="addToCart('${product.nombre}')">Add to Cart</button>
            </div>
        `;

    cardsContainer.appendChild(productContainer);
  });
}
