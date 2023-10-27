const productos = [
    { nombre: "Medias", precio: 10, stock: 50 },
    { nombre: "Bolso", precio: 50, stock: 20 },
    { nombre: "Enterito", precio: 100, stock: 10 },
    { nombre: "Guantes", precio: 35, stock: 30 },
    { nombre: "Guantes Everlast", precio: 80, stock: 15 }
];

function restarDelStock(producto, cantidad) {
    if (producto.stock >= cantidad) {
        producto.stock -= cantidad;
        return true; 
    } else {
        return false; 
    }
}

// funcion costo del producto
function calcularCostoProducto(producto, cantidad) {
    return producto.precio * cantidad;
}

// buscar un producto por nombre o número
function buscarProducto(entrada) {
    if (!isNaN(entrada)) {
        const index = parseInt(entrada) - 1;
        if (index >= 0 && index < productos.length) {
            return productos[index];
        }
    } else {
        return productos.find(producto => producto.nombre.toLowerCase() === entrada.toLowerCase());
    }
    return null;
}

// función costo total del carrito
function calcularCostoTotalCarrito(funcionCostoProducto, carrito) {
    let costoTotal = 0;
    carrito.forEach(item => {
        costoTotal += funcionCostoProducto(item.producto, item.cantidad);
    });
    return costoTotal;
}


alert("Bienvenido a la tienda. Tenemos los siguientes productos:\n\n" +
    "1. Medias - $10\n" +
    "2. Bolso - $50\n" +
    "3. Enterito - $100\n" +
    "4. Guantes - $35\n" +
    "5. Guantes Everlast - $80\n\n" +
    "Por favor, ingresa el nombre o el número del producto que deseas comprar y la cantidad deseada. Presiona Cancelar para finalizar la compra.");

let costoTotal = 0;
let carrito = [];

// Bucle para realizar la compra
while (true) {
    let entradaProducto = prompt("Escribe el nombre o el número del producto que deseas comprar (o presiona Cancelar para finalizar):");

    if (entradaProducto === null) {
        break;
    }

    let producto = buscarProducto(entradaProducto);

    if (!producto) {
        alert("Producto no encontrado");
        continue;
    }

    let cantidad = parseInt(prompt("¿Cuántas unidades deseas?"));

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("La cantidad ingresada no es válida");
        continue;
    }

    let costoProducto = calcularCostoProducto(producto, cantidad);

    if (costoProducto > 0) {
        let seResto = restarDelStock(producto, cantidad);
        if (seResto) {
            costoTotal += costoProducto;
            alert(`Costo del producto ${producto.nombre}: $${costoProducto}`);
        } else {
            alert("No hay suficiente stock de este producto.");
        }
    }
}



if (costoTotal > 0) {
    alert(`Costo total de los productos elegidos: $${costoTotal}`);
} else {
    alert("No se ha seleccionado ningún producto.");
}

