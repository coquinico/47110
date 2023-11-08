const buttons = document.querySelectorAll('.productos button');
const mensajeBienvenida = [
    "¡Bienvenido!, Selecciona los productos deseados",]


  alert(mensajeBienvenida);
const productos = [
    { nombre: "Medias", precio: 10, stock: 50 },
    { nombre: "Enterito", precio: 100, stock: 20 },
    { nombre: "Guantes", precio: 100, stock: 10 },
    { nombre: "Zapatillas", precio: 35, stock: 30 },
    { nombre: "Guantes Everlast", precio: 80, stock: 15},
    { nombre: "Bolso", precio: 80, stock: 15}
];
let costoTotal = 0;
let carrito = [];
const cartLink = document.querySelector('.cart a');

cartLink.addEventListener('click', function() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
    } else {
        let message = 'Productos en el carrito:\n';
        let totalCost = 0;
        carrito.forEach(item => {
            const subtotal = item.producto.precio * item.cantidad;
            message += `${item.producto.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${subtotal}\n`;
            totalCost += subtotal;
        });
        message += `Precio total: $${totalCost}`;
        alert(message);
    }
});

function restarDelStock(producto, cantidad) {
    if (producto.stock >= cantidad) {
        producto.stock -= cantidad;
        return true; 
    } else {
        return false; 
    }
}

//función para agregar al carrito
function addToCart(producto, cantidad) {
    carrito.push({ producto, cantidad });
}

//función para calcular el costo total del carrito
function calcularCostoTotalCarrito(carrito) {
    let costoTotal = 0;
    carrito.forEach(item => {
        costoTotal += item.producto.precio * item.cantidad;
    });
    return costoTotal;
}

// bucle para realizar la compra
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const producto = productos[index];
        const cantidad = parseInt(prompt(`¿Cuántas unidades de ${producto.nombre} deseas?`));

        if (isNaN(cantidad) || cantidad <= 0) {
            alert("La cantidad ingresada no es válida");
            return;
        }

        const costoProducto = producto.precio * cantidad;

        if (costoProducto > 0) {
            const seResto = restarDelStock(producto, cantidad);
            if (seResto) {
                costoTotal += costoProducto;
                addToCart(producto, cantidad);
                alert(`Costo del producto ${producto.nombre}: $${costoProducto}`);
            } else {
                alert("No hay suficiente stock de este producto.");
            }
        }
    });
});


