const carritoGuardado = localStorage.getItem("carrito");
const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
const contenidoProductos = document.getElementById("contenido-productos");

mostrarProductos = (array) => {
  array.forEach((prd) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto"); // Cambia a una clase más adecuada

    productoDiv.innerHTML = `
      <h3>${prd.nombre}</h3>
      <img src="${prd.img}">
      <p>$${prd.precio}</p>
      <button data-id="${prd.id}">Agregar al carrito</button>
      `;

    contenidoProductos.appendChild(productoDiv);

    const agregarAlCarrito = productoDiv.querySelector("button");
    agregarAlCarrito.addEventListener("click", () => {
      agregarProducto(prd.id);
    });
  });
};

const agregarProducto = (id) => {
  const producto = stockFrutas.find((prd) => prd.id === id);

  if (carrito.some((prd) => prd.id === id)) {
    const index = carrito.findIndex((prd) => prd.id === id);
    carrito[index].cantidad++;
  } else {
    // Clonar el objeto para evitar modificar el original
    const productoAClonar = { ...producto };
    productoAClonar.cantidad = 1;
    carrito.push(productoAClonar);
  }

  guardar();
};

const guardar = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

mostrarProductos(stockFrutas);

/*Carrito*/
const contenidoCarrito = document.getElementById("contenido-carrito");
const precioTotal = document.getElementById("precio-total-carrito");
const totalCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

const actualizarCarrito = () => {
    contenidoCarrito.innerHTML = ""; // Limpiar el contenido antes de agregar nuevos elementos
  
    let total = 0;
    carrito.forEach((elm, index) => {
      const div = document.createElement("div");
      div.classList.add("contenido-productos");
      div.innerHTML = `
        <h3>${elm.nombre}</h3>
        <img src="${elm.img}">        
        <p>$${elm.precio}</p>
        <p>Cantidad: ${elm.cantidad}</p>
        <button data-index="${index}">borrar</button>
      `;
  
      contenidoCarrito.appendChild(div);
      total += elm.precio * elm.cantidad;
    });
  
    precioTotal.textContent = `Total: $${total}`;
  
    // Agregar evento de clic a los botones de borrar
    const botonesBorrar = document.querySelectorAll(".contenido-productos button");
    botonesBorrar.forEach(boton => {
      boton.addEventListener("click", () => {
        const index = boton.dataset.index;
        carrito.splice(index, 1);
        actualizarCarrito();
      });
    });
  }
  actualizarCarrito()

  const botonesCantidad = document.querySelectorAll(".contenido-productos button[data-action]");
  botonesCantidad.forEach(boton => {
      boton.addEventListener("click", () => {
          const index = boton.dataset.index;
          const action = boton.dataset.action;

          if (action === "sumar") {
              carrito[index].cantidad++;
          } else if (action === "restar" && carrito[index].cantidad > 1) {
              carrito[index].cantidad--;
          }

          if (carrito[index].cantidad === 0) {
              carrito.splice(index, 1);
          }

          guardar();
          actualizarCarrito();
      });
  });
