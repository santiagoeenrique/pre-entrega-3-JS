const carritoGuardado = localStorage.getItem("carrito");
const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
const contenidoProductos = document.getElementById("contenido-productos");

mostrarProductos = (array) => {
  array.forEach((prd) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");

    productoDiv.innerHTML = `
      <h1>${prd.nombre}</h1>
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