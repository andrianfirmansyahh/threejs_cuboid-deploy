import * as THREE from '/three.js-master/build/three.module.js'


//SCENE
const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

//TEXTURE Loader
const texture = new THREE.TextureLoader().load('/texture/pattern.jpg');

//OBJECT
const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshBasicMaterial({map:texture});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh)

const geometry2 = new THREE.BoxGeometry(2,2,2)
const material2 = new THREE.MeshBasicMaterial({
    color:0xffffff,
    wireframe: true
})
const mesh2 = new THREE.Mesh(geometry2,material2)
mesh2.position.x = 3;
scene.add(mesh2)

const geometry3 = new THREE.TorusKnotGeometry( 1, 0.2, 76, 7, 3, 4 );
const material3 = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
const torusKnot = new THREE.Mesh( geometry3, material3 );
torusKnot.position.x = -3.5
scene.add( torusKnot );


//Boilerplate code
const sizes = {
    width: window.innerHeight,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true
})

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true
document.body.appendChild( renderer.domElement );

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}

animate()

//ANIMATION
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = .8 * elapsedTime
    mesh.rotation.z = .8 * elapsedTime

    mesh2.rotation.y = .2 * elapsedTime
    mesh2.rotation.z = .2 * elapsedTime

    torusKnot.rotation.y = .1 * elapsedTime
    torusKnot.rotation.z = .1 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()