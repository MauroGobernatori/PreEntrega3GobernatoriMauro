let carrito;
let div_productos = document.getElementById('div_productos');
let table_tbody = document.getElementById('table_tbody');
let btn_agregar_prod;
let btn_eliminar_prod;

document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
    carrito.length > 0 && cargarCarrito();

    cargarProductos();

    btn_agregar_prod = document.getElementsByName('btn_agregar_prod');
    btn_agregar_prod.forEach(element => {
        element.addEventListener("click", agregarProductoAlCarrito);
    });
});

let btn_vaciar_carrito = document.getElementById('btn_vaciar_carrito');
btn_vaciar_carrito.addEventListener("click", vaciarCarrito);

function agregarProductoAlCarrito(){
    let producto_agregar = productos.find(producto => producto.id == this.value);

    if(!(carrito.find(item => item.id == producto_agregar.id && item.cantidad > 0))){
        producto_agregar.cantidad = 1;
        carrito.push(producto_agregar);
    }else{
        let index = carrito.indexOf(producto_agregar);
        carrito[index].cantidad = carrito[index].cantidad + 1;
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

function cargarCarrito(){
    table_tbody.innerHTML = "";

    carrito.forEach(item => {
        table_tbody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>$${item.precio}</td>
                <td>${item.cantidad}</td>
            </tr>
        `;
    });

    calcularTotal();
}

function vaciarCarrito(){
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    table_tbody.innerHTML = "";
    table_tbody.innerHTML += "<tr><td></td><td>Total</td><td>$0</td><td>0</td></tr>";
}

function calcularTotal(){
    let total = 0;
    let cantidad = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        cantidad += item.cantidad;
    });

    table_tbody.innerHTML += "<tr><td></td><td>Total</td><td>$"+total+"</td><td>"+cantidad+"</td></tr>";
}

function cargarProductos(){
    productos.forEach(item => {
        div_productos.innerHTML += `
            <div class="">
                <h4>${item.nombre}</h4>
                <img src="${item.imagen}" alt=""></img>
                <p>Precio: $${item.precio}</p>
                <button name="btn_agregar_prod" value="${item.id}">Agregar al Carrito</button>
            </div>
        `;
    });
}