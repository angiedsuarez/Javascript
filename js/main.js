//Simulador de compras de prendas
//En este proyecto me avocaré a una tienda online de ropa 
//Declaración de variables para obtener nodos del DOM (etiquetas)
let cards = document.querySelector('#cards')
let tbody = document.querySelector('tbody')
let tfoot = document.querySelector('tfoot')
let btnConfirmar = document.querySelector('#btnConfirmar')
let modalInfo = document.querySelector('#modalInfo')
let modalBody = document.querySelector('#modalBody')
let modalFoot = document.querySelector('#modalFoot')
let botonModal = document.getElementById('botonModal')
let contador = document.getElementById('contador-productos')
//Declaración de objetos y arrays vacíos
let carrito = {}
let pedidos = []

//Ocultamiento de botón pedido (confirmar)
botonModal.style.visibility = "hidden"

//Arrays de productos
const peticionDeDatos = async() => {
    await fetch('../datosapi/datos.json') 
    .then(res => res.json())
    //Iteramos productos y los mostramos en el DOM
    .then(datos => datos.forEach(({Id, Nombre, Imagen, Precio}) => {
        const container = document.createElement('div')
        container.className = "card"
        container.style = "width: 18rem;"
        container.innerHTML = `
            <img key="${Id}" src="${Imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${Nombre}</h5>
                <p class="card-text">${Precio}</p>
                <button name="agregar" id="${Id}"  
                class="btn-agregar" 
                type="button">Agregar carrito</button>
            </div>`
            cards.appendChild(container);
            document.getElementById(`${Id}`).addEventListener('click', () =>{
                agregarCarrito(container) 
            })
    })  )
    
}
peticionDeDatos()
//Validación de datos para agregar al carrito
function agregarCarrito(container) {
    if (container) {
        setCarrito(container)
    }
}
function setCarrito(container) {
    const product = {
        "id": container.querySelector('button').id, //palabra clave id
        "nombre": container.querySelector('h5').textContent, //textcontent obtengo el valor de la etiqueta
        "precio": container.querySelector('p').textContent,
        "cantidad": 1
    } 
//pregunta si product.id existe 
    if (carrito.hasOwnProperty(product.id)) { 
        product.cantidad += carrito[product.id].cantidad
    }
//pinta todos los productos en una posición nueva
    carrito[product.id] = {...product} 
    pintarCarrito ()
}
//Iterando carrito, pintamos las propiedades en el DOM
function pintarCarrito(){
    tbody.innerHTML = ``
    Object.values(carrito).forEach(({nombre, cantidad, precio}) => { //object.values: transforma en un array
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${nombre}</td>
            <td>${cantidad}</td>
            <td>$ ${precio * cantidad}</td>`
        tbody.appendChild(tr)
    })
    total() 
}
//Calculamos la cantidad y el total de los productos, y lo mostramos en el DOM 
function total(){
    tfoot.innerHTML = ''
    const tr = document.createElement('tr')
    const precioTotal = Object.values(carrito).reduce((acumulador, {cantidad, precio}) =>
        acumulador + precio * cantidad, 0 
    )
    const cantidadTotal = Object.values(carrito).reduce((acumulador, {cantidad}) => 
        acumulador + cantidad, 0
    )
    contador.innerHTML = cantidadTotal
    tr.innerHTML = `<th>Total</th>
        <th>${cantidadTotal}</th>
        <th>$ ${precioTotal}</th>`
    tfoot.appendChild(tr)
    botonModal.style.visibility = "visible"
}
//Guardamos el carrito en pedidos y a su vez en el LocalStorage
btnConfirmar.addEventListener('click', (e) =>{
    e.preventDefault(); 
    carrito.total = Object.values(carrito).reduce((acumulador, {cantidad, precio}) =>
    acumulador + precio * cantidad, 0 
    )
    pedidos.push(carrito);
    localStorage.setItem('pedidos', JSON.stringify(pedidos))
    tbody.innerHTML = ``
    tfoot.innerHTML = ''
    carrito = {}
})
//Iteramos el carrito para mostrarlo en el modal del DOM
botonModal.addEventListener('click', () =>{
    modalBody.innerHTML= ''
    Object.values(carrito).forEach(({nombre, cantidad, precio}) => { 
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${nombre}</td>
            <td>${cantidad}</td>
            <td>$ ${precio * cantidad}</td>`
        modalBody.appendChild(tr)
    })
    modalFoot.innerHTML = ''
    const precioTotal = Object.values(carrito).reduce((acumulador, {cantidad, precio}) =>
        acumulador + precio * cantidad, 0 
    )
    const cantidadTotal = Object.values(carrito).reduce((acumulador, {cantidad}) => 
        acumulador + cantidad, 0
    )
    const tr = document.createElement('tr')
    tr.innerHTML = `<th>Total</th>
        <th>${cantidadTotal}</th>
        <th>$ ${precioTotal}</th>`
    modalFoot.appendChild(tr)
})
//Después de confirmar el pedido, aparecerá un alert confirmando la compra
btnConfirmar.addEventListener('click', () => {
    Swal.fire(
        'Pedido confirmado',
        '¡Gracias por comprar!',
        'Confirmar'
      )
})


