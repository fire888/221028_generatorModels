import * as THREE from 'three'
import { createWallScheme } from './geometryWall/wallSheme'



export const createMeshWall = (root) => {
    //const scheme = createSchemeSuper()


    const v = [0, 0, 0,  1, 0, 0,  1, 1, 0]
    const c = [0, 0, 0,  0, 0, 0,  1, 0, 0]
    const u = [0, 0,     0, 0,     0, 0]


    const vertices = new Float32Array(v)
    const colors = new Float32Array(c)
    const uv = new Float32Array(u)

    console.log('!!-')
    const geometry = new THREE.BoxGeometry(5, 5, 5)
    //const geometry = new THREE.BufferGeometry();
    //console.log(geometry)
    //geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    //geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    //geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
    //geometry.computeVertexNormals()


    const mat = root.materials.wallVirtualColor
    const mesh = new THREE.Mesh(geometry, mat)
    console.log(mesh)


    const scheme = createWallScheme({})
    for (let i = 0; i < scheme.length; ++i) {
        const copy = new THREE.Mesh(mesh.geometry, mesh.m)
        copy.position.x = scheme[i].x
        copy.position.y = scheme[i].y
        mesh.add(copy)
    }


    return { mesh }
}
