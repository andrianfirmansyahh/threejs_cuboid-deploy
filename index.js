import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'

//SCENE
const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

//OBJECT
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({
    color:0xff0000
})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)



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

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()