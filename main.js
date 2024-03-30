import * as THREE from 'three'; 

// Selecciona el canvas donde se va a renderizar el cubo
const canvas = document.getElementById('cuboCanvas');

// Crea un renderizador WebGL que utiliza el canvas
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Cambiar el fondo a blanco

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

// Array para almacenar las rutas de las imágenes
const textureUrls = [
    './assets/img/colaboracion.png',
    './assets/img/desarrollo-web.png',
    './assets/img/desarrollo-web2.png',
    './assets/img/documento2.png',
    './assets/img/documentos.png',
    './assets/img/valor.png',
];

// Cargar texturas
const textures = textureUrls.map(url => new THREE.TextureLoader().load(url));

// Crear un único material con las texturas asignadas a cada cara del cubo
const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));

// Crear la geometría del cubo con coordenadas UV únicas para cada cara
const geometry = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);

// Aplicar el material al cubo
const cube = new THREE.Mesh(geometry, materials);

// Agregar el cubo a la escena
scene.add(cube);

// Posicionar la cámara para centrar la escena
camera.position.set(0, 0, 6);

let scaleFactor = 1;
let clicked = false;

function animate() {
    requestAnimationFrame(animate);

    // Girar el cubo continuamente
    if (!clicked) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }

    // Aumentar gradualmente la escala del cubo cuando se haya hecho clic
    if (clicked) {
        // Posicionar la cara superior del cubo hacia la cámara
        cube.lookAt(camera.position);

        // Aumentar gradualmente la escala del cubo
        scaleFactor += 0.03;
        cube.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }

    renderer.render(scene, camera);
}

animate();

// Función para actualizar el tamaño del renderizador y la relación de aspecto de la cámara
function updateRendererSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

// Escuchar el evento de cambio de tamaño de la ventana para actualizar el renderizador y la cámara
window.addEventListener('resize', () => {
    updateRendererSize();
});

// Agregar funcionalidad al botón
// Agregar funcionalidad al botón
const btnZoom = document.getElementById('btnZoom');
btnZoom.style.setProperty('--hover', '#6DFF60'); // Cambia el valor según tus preferencias
btnZoom.style.setProperty('--color', '#60FF75');
btnZoom.addEventListener('click', () => {
    if (!clicked) {
        // Cambiar el estado a "clicado"
        clicked = true;

        // Animación para agrandar el cubo
        const scaleFactorIncrement = 0.03;
        const targetScaleFactor = 10; // Escala final deseada
        const animationInterval = setInterval(() => {
            if (scaleFactor < targetScaleFactor) {
                scaleFactor += scaleFactorIncrement;
                cube.scale.set(scaleFactor, scaleFactor, scaleFactor);
            } else {
                clearInterval(animationInterval);
                // Redirigir a la página ./pages/recursos.html
                window.location.href = './pages/recursos.html';
            }
        }, 10);
    }
});