import './EntitiesTest/phormulas'


// import * as THREE from 'three'
// import WebGL from 'three/examples/jsm/capabilities/WebGL';
// import { GLTFExporter } from './helpers/GLTFExporter'
// import { createTown2 } from './Entities/town/town2'
// import { createMeshGallery } from './Entities/meshGallery.js'
// import { createMeshSuper } from './Entities/meshSuper'
// import { createMeshStairs } from './Entities/meshStairs'
// import { createUi } from './ui/ui'
// import { createStudio } from './Entities/studio'
// import { createStructure3 } from './Entities/Structure03/structure03'
// import texture from './assets/scene-model-map.jpg'
// import texture0 from './assets/texture01.jpg'
// import consA0Src from './assets/broken_down_concrete2_ao.jpg'
// import consNormSrc from './assets/broken_down_concrete2_Normal-dx.jpg'

//
//
//
//
// const createrMeshes = root => {
//     const {
//         studio,
//         ui,
//         exporter,
//     } = root
//
//     root.materials = {
//         'wallVirtualColor': new THREE.MeshBasicMaterial({
//             color: 0xffffff,
//             emissive: 0x000000,
//             map: root.texture,
//             bumpMap: root.texture,
//             bumpScale: .1,
//             specular: 0xffffff,
//             vertexColors: true,
//         }),
//         'testRed': new THREE.MeshBasicMaterial({
//             color: 0xff0000,
//         }),
//         'iron' : new THREE.MeshPhongMaterial({
//             color: 0xcccccc,
//             lightMapIntensity: .35,
//             aoMap: new THREE.TextureLoader().load(consA0Src),
//             normalMap: new THREE.TextureLoader().load(consNormSrc),
//             normalScale: new THREE.Vector2(.1, .1),
//             reflectivity: .02,
//             shininess: 100,
//             specular: 0x020201,
//             vertexColors: true,
//         }),
//     }
//
//     let m
//
//     const structure = createStructure3(root)
//     //m.generateStructure()
//
//
//     const addModel = () => {
//         m.mesh.geometry.computeBoundingSphere()
//         studio.addToScene(m.mesh)
//         studio.setTargetCam(m.mesh.geometry.boundingSphere.center)
//     }
//
//     const removeModel = () => {
//         structure.destroyStructure()
//         if (m) {
//             studio.removeFromScene(m.mesh)
//             m && m.mesh && m.mesh.geometry.dispose()
//             delete m.mesh
//             m.meshCollision && m.meshCollision.geometry.dispose()
//             delete m.meshCollision
//             m.meshCollisionCar && m.meshCollisionCar.geometry.dispose()
//             delete m.meshCollisionCar
//         }
//     }
//
//     const downLoadModel = () => {
//         exporter.parse(
//             studio.scene,
//             function ( gltf ) {
//                 var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gltf));
//                 var dlAnchorElem = document.getElementById('downloadAnchorElem');
//                 dlAnchorElem.setAttribute("href",     dataStr     );
//                 dlAnchorElem.setAttribute("download", "scene.gltf");
//                 dlAnchorElem.click();
//             },
//             function ( error ) {
//                 console.log( 'An error happened' );
//             },
//         )
//     }
//
//     ui.setOnClick('generate level', () => {
//         removeModel()
//         structure.generateStructure()
//         m = null
//     })
//
//
//     ui.setOnClick('generate rooms', () => {
//         removeModel()
//         //m = createMeshWall(root)
//         m = createTown2(root)
//         addModel()
//     })
//
//     // ui.setOnClick(null, () => {})
//     // ui.setOnClick(null, () => {})
//     // ui.setOnClick(null, () => {})
//     // ui.setOnClick(null, () => {})
//     // ui.setOnClick(null, () => {})
//     // ui.setOnClick(null, () => {})
//
//     ui.setOnClick('generate item', () => {
//         removeModel()
//         m = createMeshGallery(root)
//         addModel()
//     })
//     ui.setOnClick('generate stairs', () => {
//         removeModel()
//         m = createMeshSuper(root)
//         addModel()
//     })
//     ui.setOnClick('generate one stair', () => {
//         removeModel()
//         m = createMeshStairs(root)
//         addModel()
//     })
//     ui.setOnClick(null, () => {})
//     ui.setOnClick('download model', downLoadModel)
//     ui.setOnClick('download texture 1', () => {
//         downloadImg(texture,  'scene-model-map.jpg').then()
//     })
//     ui.setOnClick('download texture 2', () => {
//         downloadImg(texture0, 'texture01.jpg').then()
//     })
//     ui.setOnClick('download texture 3', () => {
//         downloadImg(consNormSrc, 'roken_down_concrete2_Normal-dx.jpg').then()
//     })
//     ui.setOnClick('download texture 3', () => {
//         downloadImg(consA0Src, 'broken_down_concrete2_ao.jpg').then()
//     })
//
//     m = createTown2(root)
//     addModel()
// }
//
//
// async function downloadImg (texture, name) {
//     const image = await fetch(texture)
//     const imageBlog = await image.blob()
//     const imageURL = URL.createObjectURL(imageBlog)
//
//     const link = document.createElement('a')
//     link.href = imageURL
//     link.download = name
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
// }
//
//
//
// const threeApp = () => {
//     const ui = createUi()
//     const studio = createStudio()
//     const exporter = new GLTFExporter()
//
//     const animate = () => {
//         requestAnimationFrame( animate );
//         studio.render()
//     }
//     animate()
//
//     const root = {
//         ui,
//         studio,
//         exporter,
//     }
//
//     const loader = new THREE.TextureLoader();
//     loader.load(texture, texture => {
//         root.texture = texture
//         createrMeshes(root)
//     })
//
//     const onWindowResize = () => {
//         studio.resize()
//     }
//     window.addEventListener('resize', onWindowResize, false)
//     onWindowResize()
//
//     const isWebGL = () => {
//         if ( WebGL.isWebGLAvailable() ) {
//         } else {
//             const warning = WebGL.getWebGLErrorMessage();
//             document.getElementById( 'container' ).appendChild( warning );
//
//         }
//     }
//     isWebGL()
// }
//
//
//
// threeApp()
