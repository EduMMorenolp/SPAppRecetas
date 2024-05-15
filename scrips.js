// Función para cargar y procesar el archivo JSON
async function cargarRecetas() {
    return fetch('./BD/recetas.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las recetas');
            }
            return response.json();
        })
        .then(data => {
            return data.recetas;
        })
        .catch(error => {
            console.error('Error al cargar las recetas:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    procesarRecetas()
});

async function procesarRecetas() {
    const recetas = await cargarRecetas()
    // console.log("Cargando Recetas")
    mostrarRecetas(recetas);
    // console.log("Cargando Recomendaciones")
    mostrarRecomendacion(recetas);
    mostrarMisRecetasFavoritas();
}

// Función para mostrar las recetas en Recetas
async function mostrarRecetas(recetasPromise) {
    const miRecetaDiv = document.getElementById('listaRecetas');
    try {
        const recetas = await recetasPromise;
        recetas.forEach(receta => {
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
            meGusta.dataset.idReceta = receta.id;
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
                // console.log('La imagen se cargó correctamente');
            });

            // Agregar un event listener para el evento error
            imagen.addEventListener('error', function () {
                // console.log('Hubo un error al cargar la imagen');
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
        // Botones Corazon 
        botonesCorazon(miRecetaDiv)
    } catch (error) {
        console.error('Error al mostrar las recetas:', error);
    };
}

// Función para mostrar las recetas en Recomendaciones
async function mostrarRecomendacion(recetasPromise) {
    const miRecetaDiv = document.getElementById('listaRecomendaciones');
    const indicesAleatorios = [];

    try {
        const recetas = await recetasPromise;

        // Generar índices aleatorios únicos
        while (indicesAleatorios.length < 3) {
            const indiceAleatorio = Math.floor(Math.random() * recetas.length);
            if (!indicesAleatorios.includes(indiceAleatorio)) {
                indicesAleatorios.push(indiceAleatorio);
            }
        }

        // Agregar las recetas aleatorias al elemento listaRecomendaciones
        indicesAleatorios.forEach(indice => {
            const receta = recetas[indice];
            const tarjetaReceta = document.createElement('div');
            tarjetaReceta.classList.add('tarjetaReceta');
            listaRecetas.appendChild(tarjetaReceta);

            const tituloTarjeta = document.createElement('div');
            tituloTarjeta.classList.add('tituloTarjeta')
            tarjetaReceta.appendChild(tituloTarjeta);

            const nombreReceta = document.createElement('h3');
            nombreReceta.textContent = receta.nombre;
            nombreReceta.classList.add('nombreReceta');
            tituloTarjeta.appendChild(nombreReceta);

            const meGusta = document.createElement('button');
            meGusta.textContent = "❤️";
            meGusta.classList.add('meGusta');
            meGusta.dataset.idReceta = receta.id;
            tituloTarjeta.appendChild(meGusta);

            const categoria = document.createElement('p');
            categoria.textContent = receta.categoria;
            categoria.classList.add('categoria');
            tarjetaReceta.appendChild(categoria);

            const imagen = document.createElement('img');
            imagen.src = receta.imagen;
            imagen.classList.add('imagenComida');

            // Agregar un event listener para el evento load
            imagen.addEventListener('load', function () {
                // console.log('La imagen se cargó correctamente');
            });

            // Agregar un event listener para el evento error
            imagen.addEventListener('error', function () {
                // console.log('Hubo un error al cargar la imagen');
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
            // Agregar la tarjeta de receta al contenedor principal
            miRecetaDiv.appendChild(tarjetaReceta);
        });
        // Botones Corazon 
        botonesCorazon(miRecetaDiv)
    } catch (error) {
        console.error('Error al mostrar las recomendaciones:', error);
    }
}

// Función para trabajar los Botones Corazon 
function botonesCorazon(html) {
    const botonesCorazon = html.querySelectorAll(`.meGusta`);

    botonesCorazon.forEach(boton => {
        boton.addEventListener(`click`, async () => {
            const idReceta = boton.dataset.idReceta;
            let recetasFavoritas = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];

            const index = recetasFavoritas.indexOf(idReceta);

            if (index === -1) {
                recetasFavoritas.push(idReceta);
                localStorage.setItem('recetasFavoritas', JSON.stringify(recetasFavoritas));
                console.log("Se agregó la receta con id " + idReceta + " a las recetas favoritas.");
            } else {
                recetasFavoritas.splice(index, 1);
                localStorage.setItem('recetasFavoritas', JSON.stringify(recetasFavoritas));
                console.log("Se eliminó la receta con id " + idReceta + " de las recetas favoritas.");
            }

            await actualizarRecetasFavoritas();
        });
    });
}

async function actualizarRecetasFavoritas() {
    await mostrarMisRecetasFavoritas();
}

// Función para mostrar las recetas favoritas en la sección "Mis Recetas"
async function mostrarMisRecetasFavoritas(recetasPromise) {
    try {
        const recetasFavoritasIds = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];

        const todasLasRecetas = await cargarRecetas();


        const miRecetaDiv = document.getElementById('miReceta');

        const recetasFavoritas = todasLasRecetas.filter(receta =>
            recetasFavoritasIds.includes(String(receta.id))
        );

        recetasFavoritas.forEach(receta => {

            // Crear elementos para la tarjeta de receta
            const tarjetaReceta = document.createElement('div');
            tarjetaReceta.classList.add('tarjetaReceta');

            const tituloTarjeta = document.createElement('div');
            tituloTarjeta.classList.add('tituloTarjeta');

            const nombreReceta = document.createElement('h3');
            nombreReceta.textContent = receta.nombre;
            nombreReceta.classList.add('nombreReceta');

            const meGusta = document.createElement('button');
            meGusta.textContent = "❤️";
            meGusta.classList.add('meGusta');
            meGusta.dataset.idReceta = receta.id;

            const categoriaReceta = document.createElement('p');
            categoriaReceta.textContent = receta.categoria;
            categoriaReceta.classList.add('categoriaReceta');

            const imagen = document.createElement('img');
            imagen.src = receta.imagen;
            imagen.classList.add('imagenComida');

            // Agregar un event listener para el evento load
            imagen.addEventListener('load', function () {
                // console.log('La imagen se cargó correctamente');
            });

            // Agregar un event listener para el evento error
            imagen.addEventListener('error', function () {
                // console.log('Hubo un error al cargar la imagen');
                this.src = './img/recetas/vacio.png';
            });

            const ingredientesReceta = document.createElement('ul');
            ingredientesReceta.classList.add('ingredientesReceta');
            receta.ingredientes.forEach(ingrediente => {
                const ingredienteItem = document.createElement('li');
                ingredienteItem.textContent = ingrediente;
                ingredientesReceta.appendChild(ingredienteItem);
            });

            const pasosReceta = document.createElement('ol');
            pasosReceta.classList.add('pasosReceta');
            receta.pasos.forEach((paso, index) => {
                const pasoItem = document.createElement('li');
                pasoItem.textContent = `${paso}`;
                pasosReceta.appendChild(pasoItem);
            });

            // Agregar elementos a la tarjeta de receta
            tarjetaReceta.appendChild(tituloTarjeta);
            tituloTarjeta.appendChild(nombreReceta);
            tituloTarjeta.appendChild(meGusta);
            tituloTarjeta.appendChild(categoriaReceta);
            tarjetaReceta.appendChild(imagen);
            tarjetaReceta.appendChild(ingredientesReceta);
            tarjetaReceta.appendChild(pasosReceta);
            miRecetaDiv.appendChild(tarjetaReceta);

            // Botones Corazon 
            botonesCorazon(miRecetaDiv)
        });
    } catch (error) {
        console.error('Error al mostrar las recetas favoritas:', error);
    }
}
