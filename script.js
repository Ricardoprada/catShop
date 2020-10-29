var articulos = [
  {
    id: "articulo-001",
    nombre: "gato hot dog",
    precio: 50,
    cover: "gato-hot-dog.png"
  },
  {
    id: "articulo-002",
    nombre: "gato hamburguesa",
    precio: 40,
    cover: "gato-hamburguesa.png"
  },
  {
    id: "articulo-003",
    nombre: "gato taco",
    precio: 10,
    cover: "gato-taco.png"
  }
];

function crearElemento(tipo, contenido, clase, archivoImagen) {
  var elemento = document.createElement(tipo);

  if (contenido != null) {
    elemento.innerHTML = contenido;
  }
  if (clase != null) {
    elemento.classList.add(clase);
  }
  if (archivoImagen != null) {
    elemento.setAttribute("src", "assets/" + archivoImagen);
  }

  return elemento;
}

function dibujarArticulo(articulo) {
  var itemCard = crearElemento("div", null, "item-card", null);

  // agregar cover del articulo en el item card
  itemCard.appendChild(
    crearElemento("img", null, "item-cover", articulo.cover)
  );

  // agregar titulo articulo
  itemCard.appendChild(crearElemento('h2', articulo.nombre, null, null));

  var filaPrecio = crearElemento('div', null, "fila", null);

  // agregar etiqueta precio
  filaPrecio.appendChild(crearElemento('span', "precio", "subtitulo", null));

  // agregar simbolo dolar
  filaPrecio.appendChild(crearElemento('span', "$", "precio", null));

  // agregar precio
  filaPrecio.appendChild(
    crearElemento('span', articulo.precio, "precio", null)
  );

  // agregar fila de precio en itemCard
  itemCard.appendChild(filaPrecio);

  var filaContador = crearElemento('div', null, "fila", null);

  // agregar eiqueta cantidad
  filaContador.appendChild(crearElemento('span', "cantidad", "subtitulo", null));

  var contador = crearElemento('div', null, "contador",null);

  var numeroContador = crearElemento('span', 1, "cantidad", null);
  // agregar span contador
  contador.appendChild(numeroContador);

  var botonMenos = crearElemento('img', null, "boton-menos", "menos.svg");
  botonMenos.addEventListener('click', disminuir.bind(null, numeroContador));

  // agregar boton menos
  contador.appendChild(botonMenos);

  var botonMas = crearElemento('img', null, "boton-mas", "mas.svg");
  botonMas.addEventListener('click', incrementar.bind(null, numeroContador));

  // agregar boton mas
  contador.appendChild(botonMas);

  filaContador.appendChild(contador);

  // agregar fila de contador
  itemCard.appendChild(filaContador);

  var botonAgregar = crearElemento('div', "agregar", "boton-agregar", null);
  botonAgregar.addEventListener('click', agregar.bind(null, articulo, numeroContador));

  // agregar boton " agregar"
  itemCard.appendChild(botonAgregar);

  var contenedorArticulos = document.getElementById("contenedor-articulos");
  contenedorArticulos.appendChild(itemCard);
  }

  for (let i = 0; i < articulos.length; i++) {
    dibujarArticulo(articulos[i]);
}


// vatiables tarjeta total a pagar
var contenedorEtiquetas = document.getElementById('contenedor-etiqueta');
var etiquetaSubtotal = document.getElementById("etiqueta-subtotal");
var etiquetaTotal = document.getElementById("etiqueta-total");
var etiquetaEnvio = document.getElementById('etiqueta-envio');
var etiquetaDescuento = document.getElementById('etiqueta-descuento');
var valorEnvio = document.getElementById('valor-envio');
var valorDescuento = document.getElementById('valor-descuento');
var descuento = 0;
var precioSubtotal = 0;


// Condicion descuentos
// envio gratis por una compra > $100
// 10% si se selecciona ambos articulos y mas $500

function incrementar(referenciaContador) {
  referenciaContador.innerHTML++;
}

function disminuir(referenciaContador) {
  if (referenciaContador.innerHTML > 1)
  referenciaContador.innerHTML--;
}


function agregar(articulo, referenciaContador) {
  // marcar este tipo de articulo ya fue agregado
  articulo.agregado = true;
  precioSubtotal += articulo.precio * Number(referenciaContador.innerHTML);
  etiquetaSubtotal.innerHTML = precioSubtotal;

  if (precioSubtotal > 100) {
    etiquetaEnvio.innerHTML = "Envio Gratis";
    etiquetaEnvio.style.color = '#4382ff';
    valorEnvio.innerHTML = 0;
  }

  agregarEtiquetaArticulo(articulo, referenciaContador);

  var aplicarDescuento = corroborarDescuento();

  if (aplicarDescuento && precioSubtotal > 500) {
    etiquetaDescuento.innerHTML = "descuento de";
    etiquetaDescuento.style.color = '#4382ff';
    descuento = precioSubtotal * 0.1;
    valorDescuento.innerHTML = descuento;
  }

  etiquetaTotal.innerHTML = precioSubtotal + Number(valorEnvio.innerHTML) - descuento;
  referenciaContador.innerHTML = 1
}


function agregarEtiquetaArticulo(articulo, referenciaContador) {
  var fila = crearElemento('div', null, "fila", null);

  if (articulo.cantidadAcumulada == null) {
    articulo.cantidadAcumulada = Number(referenciaContador.innerHTML);
  } else {
    articulo.cantidadAcumulada += Number(referenciaContador.innerHTML);
  }

  var texto= crearElemento('span', articulo.nombre + " X " + articulo.cantidadAcumulada, "subtitulo", null);

  fila.appendChild(texto);

  if (articulo.referenciaArticulo == null) {
    contenedorEtiquetas.appendChild(fila);
  } else {
    contenedorEtiquetas.replaceChild(fila, articulo.referenciaArticulo);
  }
  articulo.referenciaArticulo = fila;
}

function corroborarDescuento() {
  var cantidadTipoArticulo = 0;

  for (var i = 0; i < articulos.length; i++) {
    if (articulos[i].agregado) {
      cantidadTipoArticulo++;
    }
  }
  
  if (cantidadTipoArticulo >= 2) {
    return true;
  } else {
    return false;
  }
}