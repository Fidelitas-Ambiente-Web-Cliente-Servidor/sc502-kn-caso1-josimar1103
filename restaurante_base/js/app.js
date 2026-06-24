//*----   DATOS DEL MENÚ   ----*//

const menu = [
  { nombre: 'Bruschetta Clásica', descripcion: 'Pan tostado con tomate y albahaca fresca', precio: 4500, categoria: 'Entrada' },
  { nombre: 'Tabla de Quesos', descripcion: 'Selección de quesos importados con mermelada', precio: 7800, categoria: 'Entrada' },
  { nombre: 'Lomo al Vino Tinto', descripcion: 'Lomo de res en reducción de vino tinto', precio: 15500, categoria: 'Plato Fuerte' },
  { nombre: 'Pasta Carbonara', descripcion: 'Pasta con tocino, huevo y queso parmesano', precio: 10200, categoria: 'Plato Fuerte' },
  { nombre: 'Salmón a la Plancha', descripcion: 'Filete de salmón con vegetales al vapor', precio: 13800, categoria: 'Plato Fuerte' },
  { nombre: 'Tiramisú', descripcion: 'Postre italiano con café y mascarpone', precio: 5200, categoria: 'Postre' },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá', precio: 4800, categoria: 'Postre' },
];

const imagenes = {

  "Bruschetta Clásica": "https://statics.bigbangnews.com/anexos/2020/11/e3a85c9c7d52b1fb85744075029e7443.webp",
  "Tabla de Quesos": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFZQCRnjoY7--_AN7jtBp8b98J-zSdtd_u4G7UdxCVMspUKx58HSKwvrIX&s=10",
  "Lomo al Vino Tinto": "https://comedera.com/wp-content/uploads/sites/9/2023/01/lomo-de-res-en-salsa-de-vino-tinto-shutterstock_317436656.jpg",
  "Pasta Carbonara": "https://cdn.pixabay.com/photo/2017/12/09/08/18/pasta-3007395_1280.jpg",
  "Salmón a la Plancha": "https://cdn.blog.paulinacocina.net/wp-content/uploads/2022/07/receta-de-salmon-a-la-plancha-con-salsa-agridulce.jpg",
  "Tiramisú": "https://cdn.blog.paulinacocina.net/wp-content/uploads/2020/01/receta-de-tiramisu-facil-y-economico-1740483918.jpg",
  "Cheesecake de Maracuyá": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV1-zAMS90kwhiHNFD2AI0vctPfr87GqYMVwQ_xYlhauvTIcT7iF-vvrs8&s=10"

};

//*----   Arreglo donde se almacenarán las reservas realizadas   ----*//
const reservas = [];

//*----   CUANDO CARGA LA PÁGINA   ----*//

document.addEventListener("DOMContentLoaded", function () {

  //*----   Mostrar todos los platillos al iniciar   ----*//
  renderMenu();

  //*----   Escuchar cambios en el formulario para validar automáticamente   ----*//
  document.getElementById("nombre").addEventListener("input", validarFormulario);
  document.getElementById("correo").addEventListener("input", validarFormulario);
  document.getElementById("fecha").addEventListener("change", validarFormulario);
  document.getElementById("personas").addEventListener("input", validarFormulario);

  //*----   Evento para registrar una reserva   ----*//
  document.getElementById("form-reserva").addEventListener("submit", function (e) {
    e.preventDefault();
    agregarReserva();
  });
});

//*----   RENDERIZAR EL MENÚ   ----*//

function renderMenu(lista = menu) {

  //*----   Contenedor donde se mostrarán las tarjetas   ----*//
  const contenedor = document.getElementById("menu-container");
  console.log("Contenedor:", contenedor);
  console.log("Menú:", menu);

  //*----   Limpiar el contenido anterior   ----*//
  contenedor.innerHTML = "";

  //*----   Recorrer todos los platillos   ----*//
  lista.forEach(function (plato) {

    //*----   Columna de Bootstrap   ----*//
    const columna = document.createElement("div");
    columna.className = "col-md-4 mb-4";
    console.log(plato.nombre);

    //*----   Tarjeta del platillo   ----*//
    const card = document.createElement("div");
    card.className = "card-plato h-100";

    //*----   Imagen del platillo   ----*//
    const imagen = document.createElement("img");
    imagen.src = imagenes[plato.nombre];
    imagen.alt = plato.nombre;
    imagen.loading = "lazy";
    imagen.className = "img-fluid";

    //*----   Nombre   ----*//
    const titulo = document.createElement("h4");
    titulo.textContent = plato.nombre;

    //*----   Descripción   ----*//
    const descripcion = document.createElement("p");
    descripcion.textContent = plato.descripcion;

    //*----   Precio   ----*//
    const precio = document.createElement("p");

    const textoPrecio = document.createElement("strong");
    textoPrecio.textContent = "Precio: ";

    precio.appendChild(textoPrecio);

    precio.append(
      plato.precio.toLocaleString("es-CR", {
        style: "currency",
        currency: "CRC"
      })
    );

    //*----   Categoría   ----*//
    const categoria = document.createElement("small");
    categoria.textContent = "Categoría: " + plato.categoria;

    //*----   Agregar elementos a la tarjeta   ----*//
    card.appendChild(imagen);
    card.appendChild(titulo);
    card.appendChild(descripcion);
    card.appendChild(precio);
    card.appendChild(categoria);

    //*----   Agregar la tarjeta a la columna   ----*//
    columna.appendChild(card);

    //*----   Agregar la columna al contenedor   ----*//
    contenedor.appendChild(columna);

  });

}

//*----   FILTRAR PLATILLOS POR CATEGORÍA   ----*//

function filtrarCategoria(categoria) {

  //*----   Cambiar el estilo del botón activo   ----*//
  const botones = document.querySelectorAll(".filtro");

  botones.forEach(function (boton) {
    boton.classList.remove("activo");
  });

  if (categoria === "Todos") {
    document.getElementById("btn-todos").classList.add("activo");
    renderMenu();
  }

  else if (categoria === "Entrada") {
    document.getElementById("btn-entrada").classList.add("activo");
    const entradas = menu.filter(function (plato) {
      return plato.categoria === "Entrada";
    });
    renderMenu(entradas);
  }

  else if (categoria === "Plato Fuerte") {
    document.getElementById("btn-plato").classList.add("activo");
    const fuertes = menu.filter(function (plato) {
      return plato.categoria === "Plato Fuerte";
    });
    renderMenu(fuertes);
  }

  else {
    document.getElementById("btn-postre").classList.add("activo");
    const postres = menu.filter(function (plato) {
      return plato.categoria === "Postre";
    });
    renderMenu(postres);
  }
}

//*----   VALIDACION DE FORMULARIO   ----*//

function validarFormulario() {

  //*----   Obtener los valores del formulario   ----*//
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const fecha = document.getElementById("fecha").value;
  const personas = document.getElementById("personas").value;

  //*----   Referencias a los mensajes de error   ----*//
  const errorNombre = document.getElementById("error-nombre");
  const errorCorreo = document.getElementById("error-correo");
  const errorFecha = document.getElementById("error-fecha");
  const errorPersonas = document.getElementById("error-personas");

  //*----   Limpiar mensajes anteriores   ----*//
  errorNombre.textContent = "";
  errorCorreo.textContent = "";
  errorFecha.textContent = "";
  errorPersonas.textContent = "";

  //*----   Variable que indica si todo está correcto   ----*//
  let formularioValido = true;

  //*----   Validación del nombre   ----*//
  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (nombre === "") {
    errorNombre.textContent = "El nombre es obligatorio.";
    formularioValido = false;
  } else if (nombre.length < 5) {
    errorNombre.textContent = "Debe tener al menos 5 caracteres.";
    formularioValido = false;
  } else if (!regexNombre.test(nombre)) {
    errorNombre.textContent = "Solo se permiten letras y espacios.";
    formularioValido = false;
  }

  //*----   Validación del correo   ----*//
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (correo === "") {
    errorCorreo.textContent = "El correo es obligatorio.";
    formularioValido = false;
  } else if (!regexCorreo.test(correo)) {
    errorCorreo.textContent = "Ingrese un correo válido.";
    formularioValido = false;
  }

  //*----   Validación de la fecha   ----*//
  if (fecha === "") {
    errorFecha.textContent = "Seleccione una fecha.";
    formularioValido = false;
  } else {

    //*----   Obtener la fecha actual en formato YYYY-MM-DD   ----*//
    const hoy = new Date().toLocaleDateString("en-CA");

    //*----   Comparar únicamente las fechas   ----*//
    if (fecha < hoy) {
      errorFecha.textContent = "La fecha no puede ser anterior al día de hoy.";
      formularioValido = false;
    }
  }

  //*----   Validación del número de personas   ----*//
  if (personas === "") {
    errorPersonas.textContent = "Ingrese la cantidad de personas.";
    formularioValido = false;
  } else if (personas < 1 || personas > 20) {
    errorPersonas.textContent = "Debe ingresar un valor entre 1 y 20.";
    formularioValido = false;
  }

  //*----   Habilitar o deshabilitar el botón   ----*//
  document.getElementById("btn-enviar").disabled = !formularioValido;
  return formularioValido;
}

//*----   AGREGAR UNA NUEVA RESERVA   ----*//
function agregarReserva() {

  //*----   Si el formulario tiene errores no continúa   ----*//
  if (!validarFormulario()) {
    return;
  }

  //*----   Crear el objeto con los datos de la reserva   ----*//
  const nuevaReserva = {

    nombre: document.getElementById("nombre").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value,
    personas: Number(document.getElementById("personas").value),
    comentarios: document.getElementById("comentarios").value.trim()

  };

  //*----   Guardar la reserva en el arreglo   ----*//
  reservas.push(nuevaReserva);

  //*----   Referencia al cuerpo de la tabla   ----*//
  const tabla = document.getElementById("tabla-reservas");

  //*----   Crear una nueva fila   ----*//
  const fila = document.createElement("tr");
  fila.className = "fila-reserva";

  //*----   Resaltar grupos grandes   ----*//
  if (nuevaReserva.personas >= 6) {

    fila.style.backgroundColor = "var(--color-reserva-vip)";

  }

  //*----   Crear las celdas   ----*//
  const tdNombre = document.createElement("td");
  tdNombre.textContent = nuevaReserva.nombre;
  const tdCorreo = document.createElement("td");
  tdCorreo.textContent = nuevaReserva.correo;
  const tdFecha = document.createElement("td");
  tdFecha.textContent = nuevaReserva.fecha;
  const tdHora = document.createElement("td");
  tdHora.textContent = nuevaReserva.hora;
  const tdPersonas = document.createElement("td");
  tdPersonas.textContent = nuevaReserva.personas;

  //*----   Agregar las celdas a la fila   ----*//
  fila.appendChild(tdNombre);
  fila.appendChild(tdCorreo);
  fila.appendChild(tdFecha);
  fila.appendChild(tdHora);
  fila.appendChild(tdPersonas);

  //*----   Agregar la fila a la tabla   ----*//
  tabla.appendChild(fila);

  //*----   Actualizar el resumen   ----*//
  actualizarResumen();

  //*----   Limpiar el formulario   ----*//
  document.getElementById("form-reserva").reset();

  //*----   Limpiar mensajes de error   ----*//
  document.getElementById("error-nombre").textContent = "";
  document.getElementById("error-correo").textContent = "";
  document.getElementById("error-fecha").textContent = "";
  document.getElementById("error-personas").textContent = "";

  //*----   Deshabilitar nuevamente el botón   ----*//
  document.getElementById("btn-enviar").disabled = true;

}

//*----   ACTUALIZAR EL RESUMEN DE RESERVAS  ----*//

function actualizarResumen() {

  //*----   Total de reservas   ----*//
  const totalReservas = reservas.length;

  //*----   Total de personas   ----*//
  let totalPersonas = 0;

  reservas.forEach(function (reserva) {
    totalPersonas += reserva.personas;
  });

  //*----   Buscar la reserva con mayor cantidad de personas   ----*//
  let mayorReserva = null;

  reservas.forEach(function (reserva) {
    if (mayorReserva === null || reserva.personas > mayorReserva.personas) {
      mayorReserva = reserva;
    }
  });

  //*----   Actualizar la información del resumen   ----*//
  document.getElementById("total-reservas").textContent = totalReservas;
  document.getElementById("total-personas").textContent = totalPersonas;

  if (mayorReserva !== null) {
    document.getElementById("mayor-reserva").textContent =
      mayorReserva.nombre + " (" + mayorReserva.personas + " personas)";
  } else {
    document.getElementById("mayor-reserva").textContent = "Ninguna";
  }

}