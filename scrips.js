// Función para cargar y procesar el archivo JSON
function cargarRecetas() {

    const rutaArchivo = './BD/recetas.json';
    const solicitud = new XMLHttpRequest();

    solicitud.open('GET', rutaArchivo, true);
    solicitud.onreadystatechange = function () {
        if (solicitud.readyState === 4 && solicitud.status === 200) {
            const contenidoJSON = solicitud.responseText;

            const recetas = JSON.parse(contenidoJSON);

            procesarRecetas(recetas);
        }
    };
    solicitud.send();
}

function procesarRecetas(recetas) {
    console.log(recetas);
    mostrarRecetas(recetas);
}

// Función para mostrar las recetas en la página web
function mostrarRecetas(recetas) {
    const miRecetaDiv = document.getElementById('listaRecetas');
    recetas.recetas.forEach(receta => {

        const tarjetaReceta = document.createElement('div');
        tarjetaReceta.classList.add('tarjetaReceta');
        listaRecetas.appendChild(tarjetaReceta);

        const tituloTarjeta = document.createElement('div');
        tituloTarjeta.classList.add('tituloTarjeta')
        tarjetaReceta.appendChild(tituloTarjeta);

        const botonMin = document.createElement('button');
        botonMin.textContent = " + ";
        botonMin.classList.add('bottonMinimizar');
        tituloTarjeta.appendChild(botonMin);

        const nombreReceta = document.createElement('h3');
        nombreReceta.textContent = receta.nombre;
        nombreReceta.classList.add('nombreReceta');
        tituloTarjeta.appendChild(nombreReceta);

        const meGusta = document.createElement('button');
        meGusta.textContent = "❤️";
        meGusta.classList.add('meGusta');
        tituloTarjeta.appendChild(meGusta);

        const idReceta = document.createElement('p');
        idReceta.textContent = "N° " + receta.id;
        idReceta.classList.add('idReceta');
        tituloTarjeta.appendChild(idReceta);

        const categoria = document.createElement('p');
        categoria.textContent = receta.categoria;
        categoria.classList.add('categoria');
        tarjetaReceta.appendChild(categoria);

        const imagen = document.createElement('img');
        imagen.src = receta.imagen;
        imagen.classList.add('imagenComida');
        
        // Agregar un event listener para el evento load
        imagen.addEventListener('load', function () {
            console.log('La imagen se cargó correctamente');
        });

        // Agregar un event listener para el evento error
        imagen.addEventListener('error', function () {
            console.log('Hubo un error al cargar la imagen');
            this.src = './img/recetas/vacio.png'; 
        });
        tarjetaReceta.appendChild(imagen);

        const ingredientesReceta = document.createElement('ul');
        ingredientesReceta.classList.add('ingredientesReceta');
        receta.ingredientes.forEach(ingrediente => {
            const ingredienteItem = document.createElement('li');
            ingredienteItem.textContent = ingrediente;
            ingredientesReceta.appendChild(ingredienteItem);
        });
        tarjetaReceta.appendChild(ingredientesReceta);

        const pasosReceta = document.createElement('ol');
        pasosReceta.classList.add('pasosReceta');
        receta.pasos.forEach((paso, index) => {
            const pasoItem = document.createElement('li');
            pasoItem.textContent = `${paso}`;
            pasosReceta.appendChild(pasoItem);
        });
        tarjetaReceta.appendChild(pasosReceta);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    cargarRecetas();
});

const botones = document.querySelectorAll('.bottonMinimizar');
console.log(botones)
botones.forEach(boton => {
    boton.addEventListener('click', function () {
        console.log("Minimizar")
        const tarjetaReceta = this.closest('.tarjetaReceta');

        const listas = tarjetaReceta.querySelectorAll('ul, ol');
        listas.forEach(lista => {
            lista.style.display = 'none';
        });
    });
});