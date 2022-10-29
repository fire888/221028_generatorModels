import * as THREE from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { GLTFExporter } from './helpers/GLTFExporter'
import { createMeshGallery } from './Entities/meshGallery.js'
import { createMeshSuper } from './Entities/meshSuper'
import { createMeshStairs } from './Entities/meshStairs'
import { createMeshWall } from './Entities/meshWall'
import { createUi } from './ui/ui'
import { createStudio } from './Entities/studio'
import texture from './assets/scene-model-map.jpg'


const createrMeshes = root => {
    const {
        studio, 
        ui, 
        exporter,
    } = root

    root.materials = {
        'wallVirtualColor': new THREE.MeshBasicMaterial({
            color: 0xffffff,
            emissive: 0x000000,
            map: root.texture,
            bumpMap: root.texture,
            bumpScale: .1,
            specular: 0xffffff,
            vertexColors: true,
        }),
        'testRed': new THREE.MeshBasicMaterial({
            color: 0xff0000,
        }),
    }
    
    let m 

    const addModel = () => {
        m.mesh.geometry.computeBoundingSphere()
        studio.addToScene(m.mesh)
        studio.setTargetCam(m.mesh.geometry.boundingSphere.center)
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

    const downLoadModel = () => {
        exporter.parse(
            studio.scene,
            function ( gltf ) {
                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gltf));
                var dlAnchorElem = document.getElementById('downloadAnchorElem');
                dlAnchorElem.setAttribute("href",     dataStr     );
                dlAnchorElem.setAttribute("download", "scene.gltf");
                dlAnchorElem.click();
            },
            function ( error ) {
                console.log( 'An error happened' );
            },
        )
    }

    ui.setOnClick('generate wall', () => {
        removeModel()
        m = createMeshWall(root)
        addModel()
    })

    ui.setOnClick('generate item', () => {
        removeModel()
        m = createMeshGallery(root)
        addModel()
    })
    ui.setOnClick('generate stairs', () => {
        removeModel()
        m = createMeshSuper(root)
        addModel()
    }) 
    ui.setOnClick('generate one stair', () => {
        removeModel()
        m = createMeshStairs(root)
        addModel()
    })
    ui.setOnClick(null, () => {}) 
    ui.setOnClick('download model', downLoadModel)
    ui.setOnClick('download texture', () => {
        downloadImg().then()
    })

    m = createMeshWall(root)
    addModel()
}


async function downloadImg () {
    const image = await fetch(texture)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'scene-model-map.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}



const threeApp = () => {
    const ui = createUi()
    const studio = createStudio()
    const exporter = new GLTFExporter()

    const animate = () => {
        requestAnimationFrame( animate );
        studio.render()
    }
    animate()

    const root = {
        ui,
        studio,
        exporter,
    }

    const loader = new THREE.TextureLoader();
    loader.load(texture, texture => { 
        root.texture = texture
        createrMeshes(root) 
    })

    const onWindowResize = () => {
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
