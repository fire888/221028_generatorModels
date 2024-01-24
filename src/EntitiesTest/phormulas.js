import * as THREE from "three";
import { createStudio } from '../Entities/studio'
import { updateEveryFrame } from "../helpers/frameUpdater"
import { getPoint, getLineFromTwoPlanes } from './phormulasM'


const { sin, cos } = Math

const createPolygon = (v0, v1, v2, v3) => {
    return {
        v: [...v0, ...v1, ...v2, ...v0, ...v2, ...v3],
        uv: [ 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1 ],
    }
}






const v1 = [2, 2, 2]
const v2 = [10, 3, 3]
const v3 = [1, 10, 5]
const v4 = [9, 11, 6]
console.log(getPoint(v1, v2, v3, v4, 'x'))
console.log(getPoint(v1, v2, v3, v4, 'y'))
console.log(getPoint(v1, v2, v3, v4, 'z'))




async function initApp () {
    const studio = createStudio()
    updateEveryFrame(studio.render)

    const materials = { 'simple': new THREE.MeshPhongMaterial({color: 0xFF0000}) }

    /** **************************************************/
    {

        // const v1 = [2, 2, 2]
        // const v2 = [10, 3, 3]
        // const v3 = [1, 10, 5]
        // const v4 = [7, 12, 8]
        const v1 = [2, 2, 2]
        const v2 = [10, 3, 3]
        const v3 = [1, 10, 5]
        const v4 = [9, 11, 6]
        const x = getPoint(v1, v2, v3, v4, 'x')
        const y = getPoint(v1, v2, v3, v4, 'y')
        const z = getPoint(v1, v2, v3, v4, 'z')

        const v = createPolygon(v1, v2, [x, y, z], v3).v
//
//
//         // const v = [
//         //     .2, 0, -.2,
//         //     1, 0, -.2,
//         //     1, 2, -.2,
//         //
//         //     0, .2, -.2,
//         //     1, 2.1, -.2,
//         //     0, 2, -.2,
//         // ]
//
         const geometry = new THREE.BufferGeometry()
         const vF32 = new Float32Array(v)
         geometry.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
         geometry.computeVertexNormals()
//
         const mesh = new THREE.Mesh(geometry, materials.simple)
         studio.addToScene(mesh)
//
  //       updateEveryFrame(n => {
         //mesh.rotation.y += 0.01
//         // geometry.attributes.position.array[0] = sin(n * 5)
//         // geometry.attributes.position.array[9] = sin(n * 5)
//         // geometry.attributes.position.needsUpdate = true
//         //})
     }
}

window.addEventListener('load', () => {
     initApp().then()
})
