//Simulador de compras de prendas
//En este proyecto me avocaré a una tienda online de ropa 
let cards = document.querySelector('#cards')
let carrito = {}
let tbody = document.querySelector('tbody')
let tfoot = document.querySelector('tfoot')


const productos = [
    {
        "Id": 1,
        "Nombre": "Remera",
        "Precio": 1150,
        "Imagen": "../img/1dd750725d05aec97548e50bceb9eb8e.jpg"
    },
    {
        "Id": 2,
        "Nombre": "Pantalon",
        "Precio": 2000,
        "Imagen": "../img/1dd750725d05aec97548e50bceb9eb8e.jpg"
    },
    {
        "Id": 3,
        "Nombre": "Campera",
        "Precio": 5000,
        "Imagen": "../img/1dd750725d05aec97548e50bceb9eb8e.jpg"
    }
]
productos.forEach(producto => {
    //console.log(producto.Nombre);
    const container = document.createElement('div')
    container.className = "card"
    container.style = "width: 18rem;"
    container.innerHTML = `
        <img key="${producto.Id}" src="${producto.Imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.Nombre}</h5>
            <p class="card-text">${producto.Precio}</p>
            <a href="#" class="btn btn-primary" id=${producto.Id}>Go somewhere</a>
        </div>`
        cards.appendChild(container);
        document.getElementById(`${producto.Id}`).addEventListener('click', () =>{
            agregarCarrito(container) 
        })
})  
function agregarCarrito(container, e) {
    if (container) {
        setCarrito(container)
    }
}
function setCarrito(container) {
    const product = {
        "nombre": container.querySelector('h5').textContent, //textcontent obtengo el valor de la etiqueta
        "precio": container.querySelector('p').textContent,
        "id": container.querySelector('a').id, //palabra clave id
        "cantidad": 1
    } 
    if (carrito.hasOwnProperty(product.id)) { //pregunta si product.id existe 
        product.cantidad = carrito[product.id].cantidad + 1 
       // console.log(product);
    }
    carrito[product.id] = {...product} //pinta todos los productos
    pintarCarrito ()
}

function pintarCarrito(){
    //console.log(carrito);
    tbody.innerHTML = ``
    Object.values(carrito).forEach(producto => { //object.values: transforma en un array
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio * producto.cantidad}</td>`
        tbody.appendChild(tr)
    })
    total() 
}
function total(){
    tfoot.innerHTML = ''
    const tr = document.createElement('tr')
    const precioTotal = Object.values(carrito).reduce((acumulador, {cantidad, precio}) =>
        acumulador + precio * cantidad, 0 
    )
    const cantidadTotal = Object.values(carrito).reduce((acumulador, {cantidad}) => 
        acumulador + cantidad, 0
    )
    console.log(cantidadTotal)
    tr.innerHTML = `<th> </th>
        <th>${cantidadTotal}</th>
        <th>${precioTotal}</th>`
    tfoot.appendChild(tr)
}



