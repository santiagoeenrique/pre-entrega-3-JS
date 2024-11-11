const carrito = JSON.parse(localStorage.getItem("carrito")) || []
const contenidoCarrito = document.getElementById("contenido-carrito");
const precioTotal = document.getElementById("precio-total-carrito");

const actualizarCarrito = () => {

  contenidoCarrito.innerHTML = ""

  carrito.forEach((elm) => {
      const div = document.createElement("div");
      div.classList.add("producto");

      div.innerHTML = `
                      <h3>${elm.nombre}</h3>
                      <img src="${elm.img}">
                      <p>$${elm.precio}</p>
                      <p>
                      Cantidad: <span id="cantidad${elm.id}">${elm.cantidad}</span>
                      </p>
                      <button id="menos${elm.id}">-</button>
                      <button id="sumar${elm.id}">+</button>
                      <button id="borrar${elm.id}">Borrar</button>
                      `;

      contenidoCarrito.append(div);

      const botonMenos = document.getElementById(`menos${elm.id}`);
      botonMenos.addEventListener("click", () => {
          if (elm.cantidad > 1) {
              elm.cantidad--;
              guardarCarrito();
              actualizarCarrito();
          }
      });

      const botonSumar = document.getElementById(`sumar${elm.id}`);
      botonSumar.addEventListener("click", () => {
          elm.cantidad++;
          guardarCarrito();
          actualizarCarrito();
      });
      const botonBorrar = document.getElementById(`borrar${elm.id}`);
      botonBorrar.addEventListener("click", () => {
          borrarDelCarrito(elm.id);
          actualizarCarrito();
      });
  });
  
  precioTotal.textContent = `Total: $${carrito.reduce((acu, pro) => acu + (pro.precio * pro.cantidad), 0)}`
  
}

const borrarDelCarrito = (id) => {
  const index = carrito.findIndex((prd) => prd.id === id)
  carrito.splice(index, 1)
  guardarCarrito()
}

const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

actualizarCarrito()