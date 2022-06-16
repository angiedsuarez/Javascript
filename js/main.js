//Simulador de compras de prendas
//En este proyecto me avocaré a una tienda online de ropa 

function agregarProducto(idProducto, cantidad, porcentajeDescuento) {
    //Calculo los descuentos
    let productoAgregar = productos.find(producto => producto.Id === idProducto)  
    console.log(productoAgregar)  
    let descuento = (productoAgregar.Precio * porcentajeDescuento) / 100;
    //Se lo aplico al precio
    let precioConDescuento = productoAgregar.Precio - descuento;
    const productoCarrito = {
        Id: carrito.length +1,
        Nombre: productoAgregar.Nombre,
        Precio: precioConDescuento,
        Cantidad: cantidad
    };
    carrito.push(productoCarrito)
}

const productos = [
    {
        "Id": 1,
        "Nombre": "Remera",
        "Precio": 1150,
    },
    {
        "Id": 2,
        "Nombre": "Pantalon",
        "Precio": 2000,
    },
    {
        "Id": 3,
        "Nombre": "Campera",
        "Precio": 5000,
    }
]

let carrito = []

const envio = 800; //Valor estimativo de envío

//El usuario pondrá el precio de la prenda elegida +  la cantidad que desee comprar
let idProducto = prompt("Ingrese el numero producto que desea comprar:" + "\n" + productos.map((producto) => ` \n ${producto.Id} - ${producto.Nombre}`) + "\n" + "o salir para finalizar")

while (idProducto !== "salir") {
    let cantidad = parseInt(prompt("Ingrese la cantidad de unidades que desea comprar de esta prenda:"));
    let porcentajeDescuento = parseInt(prompt("Posee cupón de descuento? Ingrese el porcentaje de descuento, caso contrario ingrese No:"))
    switch (idProducto) {
        case "1":
            agregarProducto(1, cantidad, porcentajeDescuento)            
            break
        case "2":
            agregarProducto(2, cantidad, porcentajeDescuento)
            break
        case "3":
            agregarProducto(3, cantidad, porcentajeDescuento)
            break
    }
    idProducto = prompt("Ingrese el numero producto que desea comprar:" + "\n" + productos.map((producto) => ` \n ${producto.Id} - ${producto.Nombre} \n o salir para finalizar`))
    if (idProducto === "salir") {
        let precioFinal = carrito.reduce((acc, { Precio }) => acc + Precio, 0);
        alert("El precio total de tu compra es $" + precioFinal);
        alert("¡Que lo disfrutes!");
        break
    }
}