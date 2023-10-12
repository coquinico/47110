alert("Bienvenido a la tienda. Tenemos los siguientes productos:\n\n" +
    "1. Medias - $10\n" +
    "2. Bolso - $50\n" +
    "3. Enterito - $100\n" +
    "4. Guantes - $35\n" +
    "5. Guantes Everlast - $80\n\n" +
    "Por favor, ingresa el nombre del producto que deseas comprar y la cantidad deseada. Presiona Cancelar para finalizar la compra.");
    
function calcularCostoProducto(nombreProducto, cantidad) {
    let costo = 0;
    
    switch (nombreProducto) {
        case "Medias":
            costo = 10 * cantidad;
            break;
        case "Bolso":
            costo = 50 * cantidad;
            break;
        case "Enterito":
            costo = 100 * cantidad;
            break;
        case "Guantes":
            costo = 35 * cantidad;
            break;
        case "Guantes Everlast":
            costo = 80 * cantidad;
            break;
        case "Zapatillas":
                costo = 100 * cantidad;
                break;
        default:
            alert("Producto no encontrado");
            break;
    }
    
    return costo;
}


let costoTotal = 0;


while (true) {

    let productoDeseado = prompt("Escribe el nombre del producto que deseas comprar (o presiona Cancelar para finalizar):");

    if (productoDeseado === null) {
        break; 
    }


    let cantidad = parseInt(prompt("¿Cuántas unidades deseas?"));

    let costoProducto = calcularCostoProducto(productoDeseado, cantidad);
    
    if (costoProducto > 0) {
        costoTotal += costoProducto;
        alert(`Costo de ${productoDeseado}: $${costoProducto}`);
    }

        
    }


if (costoTotal > 0) {
    alert(`Costo total de los productos elegidos: $${costoTotal}`);
} else {
    alert("No se ha seleccionado ningún producto.");
}

