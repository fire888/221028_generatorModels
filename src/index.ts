// import './EntitiesTest/phormulas'

import * as THREE from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { GLTFExporter } from './helpers/GLTFExporter'
import { createTown2 } from './Entities/town/town2'
import { createMeshGallery } from './Entities/meshGallery.js'
import { createMeshSuper } from './Entities/meshSuper'
import { createMeshStairs } from './Entities/meshStairs'
import { createUi } from './ui/ui'
import { createStudio } from './Entities/studio'
import { createStructure3 } from './Entities/Structure03/structure03'
import { createMeshWall } from 'Entities/meshWall';
import { Lab } from './Entities/level5gon/entities/labyrinth/Lab'
import { Labyrinth } from 'Entities/townHouses/entityLabyrinth/Labyrinth'
import texture from './assets/scene-model-map.jpg'
import consA0Src from './assets/broken_down_concrete2_ao.jpg'
import consNormSrc from './assets/broken_down_concrete2_Normal-dx.jpg'

const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const createrMeshes = (root: any) => {
    const {
        studio,
        ui,
    } = root

    root.materials = {
        'wallVirtualColor': new THREE.MeshBasicMaterial({
            color: 0xffffff,
            // @ts-ignore
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
        'iron' : new THREE.MeshPhongMaterial({
            color: 0xcccccc,
            lightMapIntensity: .35,
            aoMap: new THREE.TextureLoader().load(consA0Src),
            normalMap: new THREE.TextureLoader().load(consNormSrc),
            normalScale: new THREE.Vector2(.1, .1),
            reflectivity: .02,
            shininess: 100,
            specular: 0x020201,
            vertexColors: true,
        }),
    }

    let m: any

    const structure = createStructure3(root)
    const lab4 = new Labyrinth()
    const lab5Gon = new Lab()
    const loader = document.querySelector('.loader')

    const addModel = async () => {
        if (m && m.mesh) {
            studio.addToScene(m.mesh)
            if (m.mesh.geometry) {
                m.mesh.geometry.computeBoundingSphere()
                studio.setTargetCam(m.mesh.geometry.boundingSphere.center)
            } else if (m.cameraLookData) {
                studio.setTargetCam(m.cameraLookData.lookAt)
            }
        }

        await pause(10)

        // @ts-ignore
        loader.style.display = 'none'
    }

    const removeModel = async () => {
        // @ts-ignore
        loader.style.display = 'block'
        await pause(1)

        structure.destroyStructure()
        if (m && m.type && m.type === 'HouseTown') {
            studio.removeFromScene(m.mesh)
            m.clear()
        }
        if (m) {
            if (m.mesh) {
                studio.removeFromScene(m.mesh)
            }
            m && m.mesh && m.mesh.geometry && m.mesh.geometry.dispose()
            delete m.mesh
            m.meshCollision && m.meshCollision.geometry.dispose()
            delete m.meshCollision
            m.meshCollisionCar && m.meshCollisionCar.geometry.dispose()
            delete m.meshCollisionCar
        }

        await pause(1)
    }

    const downLoadModel = () => {
        const exporter = new GLTFExporter()

        function save(blob: any, filename: string) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        }

        function saveArrayBuffer(buffer: any, filename: string) {
            save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
        }

        const options = {
            binary: true,          // GLB
            onlyVisible: true,     // экспортировать только видимые объекты (по желанию)
            truncateDrawRange: true,
            maxTextureSize: 4096   // при необходимости уменьшит очень большие текстуры
        };

        exporter.parse(
            studio.scene,
            function (result: any) {
                saveArrayBuffer(result, 'scene.glb');
            },
            function ( error: any ) {
                console.log( 'An error happened' );
            },
            options
        )
    }

    const actions = {
        'housesTown': async () => {
            await removeModel()
            await lab4.build()
            m = lab4
            await addModel()
        },
        'n5Gon': async () => {
            await removeModel()
            await lab5Gon.init()
            m = lab5Gon
            await addModel()
        },
        'level': async () => {
            await removeModel()
            structure.generateStructure()
            m = null
            await addModel()
        },
        'wall': async () => {
            await removeModel()
            m = createMeshWall(root)
            await addModel()
        },
        'rooms': async () => {
            await removeModel()
            m = createTown2(root)
            await addModel()
        },
        'item': async () => {
            await removeModel()
            m = createMeshGallery(root)
            await addModel()
        },
        'stairs': async () => {
            await removeModel()
            m = createMeshSuper(root)
            await addModel()
        },
        'one_stair': async () => {
            await removeModel()
            m = createMeshStairs(root)
            await addModel()
        },
    }

    ui.setOnClick('houses town', actions.housesTown, 'button-create')
    ui.setOnClick('n 5 Gon', actions.n5Gon, 'button-create')
    ui.setOnClick('level', actions.level, 'button-create')
    // ui.setOnClick('generate WALLS', actions.wall, 'button-create', 5)
    ui.setOnClick('rooms', actions.rooms, 'button-create')
    ui.setOnClick('item', actions.item, 'button-create')
    ui.setOnClick('stairs', actions.stairs, 'button-create')
    ui.setOnClick('one stair', actions.one_stair, 'button-create')
    ui.addEmptyLine()
    ui.setOnClick('download model', downLoadModel)

    // https://site.com/page?s=6
    const params = new URLSearchParams(window.location.search)
    const mode = params.get('s')
    
    switch (mode) {
        case '8':
            actions.housesTown()
            ui.setActiveButton('houses town')
            break;
        case '7':
            actions.n5Gon()
            ui.setActiveButton('n 5 Gon')
            break;
        case '6':
            actions.level()
            ui.setActiveButton('level')
            break;
        case '5':
            actions.wall()
            ui.setActiveButton('wall')
            break;
        case '4':
            actions.rooms()
            ui.setActiveButton('rooms')
            break;
        case '3':
            actions.item()
            ui.setActiveButton('item')
            break;
        case '2':
            actions.stairs()
            ui.setActiveButton('stairs')
            break;
        case '1':
            actions.one_stair()
            ui.setActiveButton('one stair')
            break;
        default:
            actions.housesTown()
            ui.setActiveButton('houses town')
            break;
    }
    
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
        // @ts-ignore
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
