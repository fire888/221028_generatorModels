import * as THREE from "three";
import { createStudio } from '../Entities/studio'
import { updateEveryFrame } from "../helpers/frameUpdater"

const { sin, cos } = Math

const createPolygon = (v0, v1, v2, v3) => {
    return {
        v: [...v0, ...v1, ...v2, ...v0, ...v2, ...v3],
        uv: [ 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1 ],
    }
}


const calculateMatrix = (v1, v2, v3) => {
    return v1[0] * (v2[1] * v3[2] - v2[2] * v3[1]) -
        v2[0] * (v1[1] * v3[2] - v1[2] * v3[1]) +
        v3[0] * (v1[1] * v2[2] - v1[2] * v2[1])
}

const getPoint = (v1, v2, v3, v4, key4) => {
    const d = calculateMatrix(v1, v2, v3)

    let a = calculateMatrix([-1, v1[1], v1[2]], [-1, v2[1], v2[2]], [-1, v3[1], v3[2]])
    let b = calculateMatrix([v1[0], -1, v1[2]], [v2[0], -1, v2[2]], [v3[0], -1, v3[2]])
    let c = calculateMatrix([v1[0], v1[1], -1], [v2[0], v2[1], -1], [v3[0], v3[1], -1])

    if (d !== 0) {
        a = a / d
        b = b / d
        c = c / d
    }

    if (key4 === 'x') {
        return (-b * v4[1] - c * v4[2] - 1) / a
    }
    if (key4 === 'y') {
        return (-a * v4[0] - c * v4[2] - 1) / b
    }
    if (key4 === 'z') {
        return (-a * v4[0] - b * v4[1] - 1) / c
    }
}

const v1 = [2, 2, 2]
const v2 = [10, 3, 3]
const v3 = [1, 10, 5]
console.log(getPoint(v1, v2, v3, [9, 11, 6], 'x'))
console.log(getPoint(v1, v2, v3, [9, 11, 6], 'y'))
console.log(getPoint(v1, v2, v3, [9, 11, 6], 'z'))




async function initApp () {
    const studio = createStudio()
    studio.showGrid()
    studio.setBackColor(0x333333)
    studio.setCamTargetPos(.5, .5, 0)
    updateEveryFrame(studio.render)
    const materials = { 'simple': new THREE.MeshPhongMaterial({color: 0xFF0000}) }

    /** **************************************************/
    {

        const v1 = [2, 2, 2]
        const v2 = [10, 3, 3]
        const v3 = [1, 10, 5]
        const v4 = [7, 12, 8]
        const x = getPoint(v1, v2, v3, v4, 'x')
        const y = getPoint(v1, v2, v3, v4, 'y')
        const z = getPoint(v1, v2, v3, v4, 'z')

        const v = createPolygon(v1, v2, [x, y, z], v3).v


        // const v = [
        //     .2, 0, -.2,
        //     1, 0, -.2,
        //     1, 2, -.2,
        //
        //     0, .2, -.2,
        //     1, 2.1, -.2,
        //     0, 2, -.2,
        // ]

        const geometry = new THREE.BufferGeometry()
        const vF32 = new Float32Array(v)
        geometry.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
        geometry.computeVertexNormals()

        const mesh = new THREE.Mesh(geometry, materials.simple)
        studio.addToScene(mesh)

        //updateEveryFrame(n => {
        //mesh.rotation.y += 0.01
        // geometry.attributes.position.array[0] = sin(n * 5)
        // geometry.attributes.position.array[9] = sin(n * 5)
        // geometry.attributes.position.needsUpdate = true
        //})
    }
}


window.addEventListener('load', () => {
    initApp().then()
})
