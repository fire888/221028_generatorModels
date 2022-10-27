//import './styleseets/style.css'

import WebGL from 'three/examples/jsm/capabilities/WebGL';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { createStudio } from './modelViewer/studio'
//import { createModel } from './modelViewer/modelReservuar'
import nX from './assets/env/nx.jpg'
import pX from './assets/env/px.jpg'
import nY from './assets/env/ny.jpg'
import pY from './assets/env/py.jpg'
import nZ from './assets/env/nz.jpg'
import pZ from './assets/env/pz.jpg'
import texture from './assets/txt1.jpg'
import * as THREE from 'three'
//import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'

import { createMeshGallery } from './Entities/meshGallery.js'
import { createMeshSuper } from './Entities/meshSuper'
import { createMeshStairs } from './Entities/meshStairs'
import { createUi } from './ui/ui'


const threeApp = () => {

    const ui = createUi()
    const studio = createStudio()
    //const exporter = new GLTFExporter();

    // Parse the input and generate the glTF output
    // exporter.parse(
    //     scene,
    //     // called when the gltf has been generated
    //     function ( gltf ) {
    
    //         console.log( gltf );
    //         downloadJSON( gltf );
    
    //     },
    //     // called when there is an error in the generation
    //     function ( error ) {
    
    //         console.log( 'An error happened' );
    
    //     },
    //     options
    // );

    
    let oldTime = Date.now()
    const animate = () => {
        requestAnimationFrame( animate );
        const currentTime = Date.now()
        const diff = currentTime - oldTime
        oldTime = currentTime
        studio.render()
    }
    animate()

    const loader = new THREE.TextureLoader();

    loader.load(texture, texture => {
        const root = {
            materials: {
                'wallVirtualColor': new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    emissive: 0x000000,
                    map: texture,
                    bumpMap: texture,
                    bumpScale: .1,
                    specular: 0xffffff,
                    vertexColors: true,
                }),
                'testRed': new THREE.MeshBasicMaterial({
                    color: 0xff0000,
                }),
            }
        } 
        
        let m 
        const addModel = () => {
            m.mesh.geometry.computeBoundingSphere()
            studio.addToScene(m.mesh)
            console.log(m.mesh.geometry.boundingSphere)
            studio.setTargetCam(m.mesh.geometry.boundingSphere.center)
            console.log(m)
        }
        const removeModel = () => {
            studio.removeFromScene(m.mesh)
            m.mesh && m.mesh.geometry.dispose()
            delete m.mesh
            m.meshCollision && m.meshCollision.geometry.dispose()
            delete m.meshCollision
            m.meshCollisionCar && m.meshCollisionCar.geometry.dispose()
            delete m.meshCollisionCar
        }

        ui.setF(() => {
            removeModel()
            m = createMeshGallery(root)
            addModel()
        })
        ui.setF2(() => {
            removeModel()
            m = createMeshSuper(root)
            addModel()
        }) 
        ui.setF3(() => {
            removeModel()
            m = createMeshStairs(root)
            addModel()
        }) 

        m = createMeshGallery(root)
        addModel()
    })


    const onWindowResize = () =>  {
        studio.resize()
    }
    window.addEventListener('resize', onWindowResize, false)
    onWindowResize()

    const isWebGL = () => {
        if ( WebGL.isWebGLAvailable() ) {
        } else {
            const warning = WebGL.getWebGLErrorMessage();
            document.getElementById( 'container' ).appendChild( warning );

        }
    }
    isWebGL()
}


threeApp()
