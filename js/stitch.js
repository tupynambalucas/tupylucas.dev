
import * as THREE from '../three/build/three.module.js';
import { GLTFLoader } from '../three/loaders/GLTFLoader.js';




var div = document.getElementById('stitch');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 20000 );

// Ajuste de posição da camera e da mesh
camera.position.z = 500;
camera.position.x = 500
camera.position.y = 100
camera.rotation.y = 1

let mixer
let effectSobel
var action
let mesh
let AA
var object3
let rick
// Luz
var light3 = new THREE.DirectionalLight( 0xFEF3E8, 0.5,  100);
var light2 = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
var light = new THREE.PointLight( 0x624780, 1.5, 1000 );

// Ajustando luz
light.position.set( -300, 200, -200);
light3.target.position.set(-50, 0, 0)
light3.position.set(10, 5, 10)
light3.castShadow = true

var clock = new THREE.Clock();





// Setando o renderer e juntando ele a Div: lua


// GLTF loader
var loader = new GLTFLoader();
// const modifer = new THREE.SimplifyModifier();
// Carregando modelo

loader.load(
// Caminho pro arquivo
'../three/models/rick/scene.gltf',

    // Função chamada quando o arquivo é carregado
    function ( gltf ) { 

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; 

        // Empurrando objeto para variavel
        rick= gltf.scene
        rick.scale.set(100,100,100);
        rick.name = 'dope';
        console.log(rick)
        // Adicionando objeto a cena


  
        if (window.innerWidth < 600) {
          rick.position.set(-100, -1000, -500);
          rick.rotation.y = +0.5
          scene.add(rick)
        } else {
          rick.position.set(-30, -20, 60);
          rick.rotation.y = +0.5
          scene.add(rick)
        }
        // let y = object3.rotation.y
        // gsap.to(object3.rotation, {duration: 5, y: -2, repeat: 0, ease: "none", onComplete: animateBack});
        // function animateBack() {
        //   console.log('back')
        //   gsap.to(object3.rotation, {duration: 10, y: Math.PI * +0.5, repeat: 0, ease: "none"});
        // }
    },
    // Função de carregamento
    function ( xhr ) {
      console.log("Scene polycount:", renderer.info.render.triangles)
      console.log("Active Drawcalls:", renderer.info.render.calls)
      console.log("Textures in Memory", renderer.info.memory.textures)
      console.log("Geometries in Memory", renderer.info.memory.geometries)
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );


    },
    // Função em caso de erro
    function ( error ) {

        console.log( 'An error happened' );
        console.log(error)
    },
);
var renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  powerPreference: "high-performance",
})
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio *  0.5);

if (window.innerWidth < 600) {
  renderer.setPixelRatio( window.devicePixelRatio *  0.5);
}

div.appendChild( renderer.domElement ); 

// Adicionando a mesh e luz na cena
scene.add(light);
scene.add(light2);
scene.add(light3);



function animate() {
    requestAnimationFrame( animate );
    const delta = clock.getDelta();
    if (mixer) mixer.update( delta );
    // console.log(animationTime)
    renderer.render( scene, camera );
};

animate();
