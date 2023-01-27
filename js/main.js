// MERAKI TIENDA ONLINE

// CLASS CLIENTE
class Cliente {
    constructor(nombre, apellido, email, password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
    }
}

// ARRAY VACIO CLIENTES
let arrayClientes = [];
// localStorage
const clientesJSON = JSON.stringify(arrayClientes);
localStorage.setItem("arrayClientes", clientesJSON);
const clientesRecuperados = localStorage.getItem("arrayClientes");
const clientesObjeto = JSON.parse(clientesRecuperados);


// VINCULAMOS CON HTML
const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // CREAMOS EL CLIENTE
    const cliente = new Cliente(nombre.value, apellido.value, email.value, password.value);
    // LO AGREGAMOS AL ARRAY
    arrayClientes.push(cliente);
    //VERIFICAMOS POR CONSOLA
    console.log(arrayClientes);
    // RESETEAMOS EL FORMULARIO
    formulario.reset();
})

//INICIAR SESION 
const iniciarSesion = document.getElementById("iniciarSesion");

const usuarioAutorizado = arrayClientes.nombre; 
const passwordAutorizado = arrayClientes.password;

iniciarSesion.addEventListener("click", () => {
    swal.fire ({
        title: "Login", 
        html: `<input type="email" id="usuario" class="swal2-input" placeholder="email">
               <input type="text" id="password" class="swal2-input" placeholder="password">`,
        confirmButtonText: "Enviar", 
        showCancelButton: true,
        cancelButtonText: "Cancelar",    
    }).then((result) => {
        if (result.isConfirmed) { 
            const usuario = document.getElementById("usuario").value;   
            const password = document.getElementById("password").value;  
            swal.fire({
                title: "Datos enviados",
                icon: "success",
                confirmButtonText: "Aceptar",   
            })
        }
    })
})

//PROMESA LOGIN
const solicitarClientes = (estado) => {        
    return new Promise ((resolve, reject) => {   
        if (estado == true){                            
            resolve(arrayClientes);                                 
        } else {
            reject("Por favor ingrese los datos correctamente o regístrese");          
        }
    })
} 
console.log (solicitarClientes(true)); 
solicitarClientes(true)    
        .then((arrayClientes) => {
            console.table(arrayClientes);   
        })
        .catch((error) => {
            console.log (error);
        })                              
        .finally(() => {
            console.log ("Proceso finalizado");
        });


// ALERT REGISTRO 
const botonEnviar = document.getElementById("botonEnviar");
botonEnviar.addEventListener("click", () => {
    swal.fire({
        title: "Estas a punto de registrarte en nuestra página",
        text: "Registrarte nos autoriza a guardar tus datos y poder enviarte emails con información relevante sobre tus compras y promociones",
        icon: "info", 
        imageUrl: "img/logo.png",
        confirmButtonText: "Aceptar",
        background: "#cbe3ef",
        backdrop: "grey",
    }) 
})

// CLASS PRODUCTOS
class Producto {
    constructor (id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

// PRODUCTOS EN VENTA
const mate = new Producto (1, "Mate", 1500, "img/mate.png");
const cuenco = new Producto (2, "Cuenco", 900, "img/cuenco.png");
const portasahumerio = new Producto (3, "Portasahumerio", 750, "img/portasahumerio.png");
const tabla = new Producto (4, "Tabla", 1800, "img/tabla.png");
const cuchara = new Producto (5, "Cuchara", 600, "img/cuchara.png");
const yerbera = new Producto (6, "Yerbera", 1100, "img/yerbera.png");


// ARRAY CATALOGO DE PRODUCTOS
const productos = [mate, cuenco, portasahumerio, tabla, cuchara, yerbera];


// CARRITO VACIO
let carrito = [];
   // localStorage
   if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

// ASI SERIA CON JSON
// Perdon profe, no me gusta esta desprolijidad de codigo comentado, pero no me salio que se vean las fotos entonces lo deje como en la tercer entrega que se ve mas lindo.
/*
const contenedorProductos = document.getElementById("contenedorProductos");
const listadoProductos = "json/productos.json";
fetch (listadoProductos)
.then ( respuesta => respuesta.json())
.then (datos => {
    datos.forEach(producto => {
       contenedorProductos.innerHTML += `
        <p> ID: ${producto.id} </p>
        <h2> Nombre: ${producto.nombre} </h2>
        <p> Precio: ${producto.precio} </p>
        <img> ${producto.img}
        `
    })
})
.catch (error => console.log (error))
.finally( () => console.log ("Proceso finalizado"));

*/

// MODIFICAMOS EL DOM MOSTRANDO LOS PRODUCTOS
const contenedorProductos = document.getElementById("contenedorProductos");

// FUNCION PARA MOSTRAR LOS PRODUCTOS
const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-4", "col-md-6", "col-xs-12");
        card.innerHTML = ` <div class="card"> 
                             <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}"> 
                                  <div class="card-body card-div">
                                       <h5> ${producto.nombre} </h5>
                                       <p> $${producto.precio}</p>
                                       <button class="btn btn-outline-info colorBoton" id="boton${producto.id}"> Agregar al carrito </button> 
                                  </div>                     
                           </div>`
        contenedorProductos.appendChild(card);           
        
          // Agregar productos al carrito
          const boton = document.getElementById(`boton${producto.id}`);
          boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
          })    
    })
}

mostrarProductos();

// FUNCION AGREGAR AL CARRITO
const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find (producto => producto.id === id);
        carrito.push(producto);
              // localStorage
              localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}


// MOSTRAR EL CARRITO DE COMPRAS
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
}) 

// FUNCION PARA MOSTRAR EL CARRITO: 
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = ""; 
 
   carrito.forEach(producto => {
     const card = document.createElement("div");
     card.classList.add("col-xl-4", "col-md-6", "col-xs-12");
     card.innerHTML = ` <div class="card"> 
                          <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}"> 
                               <div class="card-body">
                                    <h5> ${producto.nombre} </h5>
                                    <p> ${producto.precio}</p>
                                    <p> ${producto.cantidad}</p>
                                    <button class="btn colorBoton" id="eliminar${producto.id}" > Eliminar producto </button> 
                               </div>                     
                        </div>`
 
     contenedorCarrito.appendChild(card);
 
     // eliminar productos del carrito:
     const boton = document.getElementById(`eliminar${producto.id}`);
     boton.addEventListener("click", () => {
         eliminarDelCarrito(producto.id); 
     })  
   }) 
   calcularTotal();
 }
 
 // FUNCION PARA ELIMINAR EL PRODUCTO:
 const eliminarDelCarrito = (id) => {
  const producto = carrito.find (producto => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice,1);
  mostrarCarrito();
     // localStorage
      localStorage.setItem("carrito", JSON.stringify("carrito"));
 }
 
 // VACIAR TODO EL CARRITO
 const vaciarCarrito = document.getElementById("vaciarCarrito");
 vaciarCarrito.addEventListener("click", () => {
     eliminarTodoElCarrito();
 })
 
 // FUNCION QUE ELIMINAR TODO DEL CARRITO:
 const eliminarTodoElCarrito = () => {
     carrito = [];
     mostrarCarrito();
       // localStorage
       localStorage.clear();
 }

 // TOTAL DE LA COMPRA
const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `$${totalCompra}`;
}

// BOTON FINALIZAR COMPRA
const compraFinalizada = document.getElementById("compraFinalizada");
compraFinalizada.addEventListener("click", () => {
    swal.fire("Muchas gracias por su compra, que lo disfrutes");
})

// TOASTIFY PRODUCTO AGREGADO AL CARRITO
contenedorProductos.addEventListener("click", () => {
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000, 
        gravity: "bottom", 
        position: "right",  
        style: {
            background: "linear-gradient(to right, #86d3fa, #00aaff)",
            color: "white",
        }
    }).showToast(); 
})

// SET INTERVAL QUE CAMBIA COLORES
const fondoColores = ["#9576c7", "#8c7cd4", "#695efc", "#5e6efc", "#5e95fc", "#5eb5fc", "#5ed7fc", "#cbe3ef", "#dff3fd"];

let i = 0;
const interval = setInterval( () => {
    document.getElementById("fondo").style.backgroundColor = fondoColores[i];
    i++;

    if (i == fondoColores.length) {
        clearInterval(interval);
    }
}, 1000)
 
   
// FETCH IG
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '689185f23fmsh448968b1c85cb13p1aed8djsnbb847babf8e6',
		'X-RapidAPI-Host': 'instagram47.p.rapidapi.com'
	}
};

fetch('https://instagram47.p.rapidapi.com/public_post_likers?shortcode=CHLXcX-h-Px', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
