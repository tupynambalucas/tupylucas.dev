
import * as THREE from '../three/build/three.module.js';
import { GLTFLoader } from '../three/loaders/GLTFLoader.js';



var div = document.getElementById('wizard');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );

// Ajuste de posição da camera e da mesh
camera.position.z = -500;
camera.position.x = 0
camera.position.y = 0
camera.rotation.x = 0.5

let mixer
var action
let mesh
var object2
let town
// Luz
var light3 = new THREE.DirectionalLight( 0xFEF3E8, 0.5,  100);
var light2 = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
var light = new THREE.PointLight( 0xB373AA, 3, 5000 );

// Ajustando luz
light.position.set(-180,745,-1500);
light3.target.position.set(-30000, -200, 10420)
light3.position.set(-180,745,-1500)
light3.castShadow = true

var clock = new THREE.Clock();

var Shaders = {
    'atmosphere' : {
      uniforms: {},
      vertexShader: [
        'varying vec3 vNormal;',
        'void main() {',
          'vNormal = normalize( normalMatrix * normal );',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 vNormal;',
        'void main() {',
          'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 0.5 ) ), 12.0 );',
          'gl_FragColor = vec4( 4,222,133,1 ) * intensity;',
        '}'
      ].join('\n')
    }
  };



var shader, uniforms;

// Geometria e Material
const geometry = new THREE.SphereGeometry(20, 20, 1500);

shader = Shaders['atmosphere'];
    var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    let materialGlow = new THREE.ShaderMaterial({

          uniforms: uniforms,
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true

        });
mesh = new THREE.Mesh(geometry, materialGlow);
mesh.scale.set( 17, 17, 17 );
mesh.position.set(-170,730,-1500)


// Setando o renderer e juntando ele a Div: lua

// GLTF loader
var loader = new GLTFLoader();
// const modifer = new THREE.SimplifyModifier();
// Carregando modelo
loader.load(
// Caminho pro arquivo
'../three/models/wizard/scene.gltf',

    // Função chamada quando o arquivo é carregado
    function ( gltf ) { 

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; 

        // Empurrando objeto para variavel
        object2 = gltf.scene
        object2.scale.set(1,1,1);
        object2.name = 'wizard';
        console.log(object2)
        scene.add(object2)
        if (window.innerWidth > 600) {
          object2.position.set(-200, -200, -1000);
          object2.rotation.y = +0.5
          scene.add(mesh);
          scene.add(object2)
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
renderer.setPixelRatio( window.devicePixelRatio *  1);

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
    mesh.rotation.y += 0.01
    // console.log(animationTime)
    renderer.render( scene, camera );
};

animate();
