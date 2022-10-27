import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const BACK_COLOR = 0x333333




export const createStudio = (cubeMap) => {
    const container = document.querySelector('#scene');
    container.style.width = window.innerWidth + 'px'
    container.style.height = window.innerHeight + 'px';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set( 0, 1000, -1000);
    camera.lookAt(0, 0, 0)
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(BACK_COLOR, 1)

    container.appendChild( renderer.domElement );

    const light = new THREE.PointLight( 0xffffff, 1.5)
    light.position.set(20, 1000, 1000)
    camera.add(light)
    light.castShadow = true; // default false
    light.shadow.mapSize.width = 2048; // default
    light.shadow.mapSize.height = 2048; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default


    // const light2 = new THREE.PointLight( 0xffffff, 1.5 )
    // light2.position.set(-30, 20, -40)
    // camera.add(light2)

    const ambLight = new THREE.AmbientLight(0x555555, 5)
    scene.add(ambLight)


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 40000;
    controls.target.set( 0, 0, 0 );
    controls.update();
    //controls.maxPolarAngle = Math.PI / 2 - 0.1


    return {
        addToScene(model) {
            scene.add(model)
        },
        removeFromScene(model) {
            scene.remove(model)
        },
        render () {
            if (!camera) {
                return
            }
            renderer.render(scene, camera)
        },
        setTargetCam: v => {
            controls.target.set( v.x, v.y, v.z );
            controls.update();
        },
        resize () {
            if (!camera) {
                return;
            }
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight)
        },
    }
}
