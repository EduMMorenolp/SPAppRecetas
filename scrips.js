// Función para cargar y procesar el archivo JSON
async function cargarRecetas() {
    return fetch('./BD/recetas.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las recetas');
            }
            return response.json();
        });
}

document.addEventListener('DOMContentLoaded', function () {
    procesarRecetas()
});

async function procesarRecetas() {
    const recetas = await cargarRecetas()
    console.log(recetas)
    console.log("Cargando Recetas")
    mostrarRecetas(recetas);
    console.log("Cargando Recomendaciones")
    mostrarRecomendacion(recetas);
}

// Función para mostrar las recetas en Recetas
async function mostrarRecetas(recetasPromise) {
    const miRecetaDiv = document.getElementById('listaRecetas');
    try {
        const recetas = await recetasPromise;
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
    } catch (error) {
        console.error('Error al mostrar las recetas:', error);
    };
}


const botones = document.querySelectorAll('.bottonMinimizar');
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


// Función para mostrar las recetas en Recomendaciones

async function mostrarRecomendacion(recetasPromise) {
    const miRecetaDiv = document.getElementById('listaRecomendaciones');
    const indicesAleatorios = [];

    try {
        const recetas = await recetasPromise;

        // Generar índices aleatorios únicos
        while (indicesAleatorios.length < 3) {
            const indiceAleatorio = Math.floor(Math.random() * recetas.recetas.length);
            if (!indicesAleatorios.includes(indiceAleatorio)) {
                indicesAleatorios.push(indiceAleatorio);
            }
        }

        // Agregar las recetas aleatorias al elemento listaRecomendaciones
        indicesAleatorios.forEach(indice => {
            const receta = recetas.recetas[indice];
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

            // Agregar la tarjeta de receta al contenedor principal
            miRecetaDiv.appendChild(tarjetaReceta);
        });
    } catch (error) {
        console.error('Error al mostrar las recomendaciones:', error);
    }
}