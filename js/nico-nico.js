
import * as THREE from '../three/build/three.module.js';
import { GLTFLoader } from '../three/loaders/GLTFLoader.js';
import { SimplifyModifier } from '../three/modifiers/SimplifyModifier.js';



var div = document.getElementById('amy');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 10, 1000 );

// Ajuste de posição da camera e da mesh
camera.position.z = 1000;
camera.position.x = 0
camera.position.y = 0
camera.rotation.x = 0

let mixer
let effectSobel
var action
let mesh
let AA
let object
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

var torusGeo = new THREE.TorusGeometry(10, 3, 10, 20)
var cylinderGeo = new THREE.CylinderGeometry(15, 15, 30)
var sphereGeo = new THREE.SphereGeometry(20)


var meshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0x0095DD,
  wireframe: true,
  wireframeLinewidth: 2
});

var rosquinha, cilindro, bola

rosquinha = new THREE.Mesh(torusGeo, meshBasicMaterial);
cilindro = new THREE.Mesh(cylinderGeo, meshBasicMaterial);
bola = new THREE.Mesh(sphereGeo, meshBasicMaterial); 
// Setando o renderer e juntando ele a Div: lua



// CILINDRO
cilindro.scale.set(1.2,1.2,1.2);
cilindro.position.set(-100, 70, 700);
scene.add(cilindro)

// BOLA
bola.scale.set(2,2,2);
bola.position.set(-200, 60, 700);
scene.add(bola)

// ROSQUINHA
rosquinha.scale.set(1.7,1.7,1.7);
rosquinha.position.set(-120, -50, 700);
scene.add(rosquinha)


// GLTF loader
var loader = new GLTFLoader();
// const modifer = new THREE.SimplifyModifier();
// Carregando modelo
loader.load(
// Caminho pro arquivo
'../three/models/robot/scene.gltf',

    // Função chamada quando o arquivo é carregado
    function ( gltf ) { 

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; 

        // Empurrando objeto para variavel
        object = gltf.scene
        object.scale.set(90,90,90);
        object.name = 'amy';
        console.log(object)
        // Adicionando objeto a cena

        mixer = new THREE.AnimationMixer( object );
        action = mixer.clipAction( gltf.animations[ 0 ] );
        action.setDuration( 20 )
        action.play();

  
        if (window.innerWidth < 600) {

          cilindro.position.set(-40, 100, 600);
          bola.position.set(50, 130, 500);
          rosquinha.position.set(20, 10, 590);
          object.position.set(20, -160, 600);
          object.rotation.y = -0.7
          scene.add(object)
  
        } else {
          object.position.set(130, -110, 600);
          object.rotation.y = -0.8
          scene.add(object)
        
        }
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
})
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio *  0.7);

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
    cilindro.rotation.x -= 0.005;
    rosquinha.rotation.z += 0.005;
    bola.rotation.y -= 1;
    // console.log(animationTime)
    renderer.render( scene, camera );
};

animate();
