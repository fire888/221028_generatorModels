/* eslint-disable */
import * as THREE from 'three'
import { createWallScheme } from './geometryWall/wallSheme'
import { createDataLine  } from './geometryWall/dataLine'


export const createMeshWall = (root) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1)

    const mat = root.materials.wallVirtualColor
    const mesh = new THREE.Mesh(geometry, mat)

    const material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    const v = []
    const c = []
    const u2 = []
    

    const scheme = createWallScheme({})
    for (let i = 0; i < scheme.length; ++i) {
        for (let j = 0; j < scheme[i].length; ++j) {
            for (let k = 0; k < scheme[i][j].nears.length; ++k) {
                const { x, y } = scheme[i][j]
                const p1 = new THREE.Vector3(x, y, 0)
                const n = scheme[i][j].nears[k]
                const p2 = new THREE.Vector3(scheme[n.i][n.j].x, scheme[n.i][n.j].y, 0)

                const dataLine = createDataLine({}, scheme[i][j], scheme[n.i][n.j])
                v.push(...dataLine.v)
                c.push(...dataLine.c)
                //c2.push(...dataLine.c2)

                //const geomL = new THREE.BufferGeometry().setFromPoints([p1, p2]);
                //const line = new THREE.Line( geomL, material );
                //mesh.add( line );

                //const copy = new THREE.Mesh(mesh.geometry, mesh.m)
                //copy.position.x = x
                //copy.position.y = y
                //mesh.add(copy)
            }
        }
    }


    const vertices = new Float32Array(v)
    const colors =  new Float32Array(c)
    const uv2 = new Float32Array(u2)

    /** mesh main */
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('uv2', new THREE.BufferAttribute(uv2, 2))
    g.computeVertexNormals()
    const wallMat = root.materials.wallVirtualColor
    const wallMesh = new THREE.Mesh(g, wallMat)

    mesh.add(wallMesh)


    return { mesh }
}
