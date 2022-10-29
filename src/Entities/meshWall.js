import * as THREE from 'three'



export const createMeshSuper = (root) => {
    const scheme = createSchemeSuper()


    const v = []
    const c = []
    const u = []



    const vertices = new Float32Array(v)
    const colors =  new Float32Array(c)
    const uv = new Float32Array(u)

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute( colors, 3 ))
    uv && geometry.setAttribute('uv', new THREE.BufferAttribute( uv, 2 ))
    geometry.computeVertexNormals()


    const mat = root.materials.wallVirtualColor
    const mesh = new THREE.Mesh(geometry, mat)

    return { mesh }
}
