//Simulador de compras de prendas
//En este proyecto me avocaré a una tienda online de ropa 

function calcularPrecio (precioPrenda, cantidadPrenda, porcentajeDescuento, costoEnvio) {
    //Calculo los descuentos
    let descuento = (precioPrenda * porcentajeDescuento) / 100;
    //Se lo aplico al precio
    let precioConDescuento = precioPrenda - descuento;
    return (precioConDescuento * cantidadPrenda) + costoEnvio;
}

const envio = 800; //Valor estimativo de envío

//El usuario pondrá el precio de la prenda elegida +  la cantidad que desee comprar
let prenda = parseFloat(prompt("Ingrese el precio de la prenda que desea comprar:"));
let cantidad = parseInt(prompt("Ingrese la cantidad de unidades que desea comprar de esta prenda:"));
//Se aplica el cupón de descuento cuando ingrese 
let descuento = parseInt(prompt("Ingresa tu cupón de descuento:")) 

//Mostramos el precio final 
let precioFinal = calcularPrecio(prenda, cantidad, descuento, envio);
alert("El precio total de tu compra es $" + precioFinal);
alert("¡Que lo disfrutes!");

//Hacer un switch con un prompt con opciones que el usuario pueda seleccionar la prenda, y que el descuento esté en el switch con cada producto .