import * as THREE from "three"
import { createGeomL } from './geometries/geometryTileL'
import { createGeomI } from './geometries/geometryTileI'
import { createGeomX } from './geometries/geometryTileX'
import { createGeomT } from './geometries/geometryTileT'
import { createGeomXY } from './geometries/geometryTileXY'
import { createGeomStairs } from './geometries/geometryTileStairs'
import { createGeomToTop } from './geometries/geometryTileToTop'
import { createGeomFromBot } from './geometries/geometryTileFromBot'
import { createGeomTopPlatform } from './geometries/geometryTileTopPlatform'
import { createGeomFromBuffer } from './geometries/createBufferGeom'
import { W, H } from './constants/constants_elements'
import {
    rotateArrY,
    translateArr,
} from "./helpers/geomHelpers";
import tile from '../../assets/texture01.jpg'


export const createrMesh = (root) => {
    const mat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        map: new THREE.TextureLoader().load(tile)
    })


    const tilesGeom = {
        't_stairs': createGeomStairs(),
        't_XY': createGeomXY(),
        't_fromBottom': createGeomFromBot(),
        't_T': createGeomT(),
        't_toTopPlatform': createGeomToTop(),
        't_L': createGeomL(),
        't_I': createGeomI(),
        't_X': createGeomX(),
        't_tt': createGeomTopPlatform(),
    }

    let mesh
    let meshCollision

    return {
        generateMeshes: (mapData, structureData) => {
            const colors = {}
            for (let key in tilesGeom) {
                colors[key] = []
                for (let i = 0; i < tilesGeom[key].c.length; i += 3) {
                    colors[key].push(...structureData.COLOR_00)
                }
            }

            return new Promise(res => {
                const v = []
                const c = []
                const u = []
                const col = []

                mapData.iterateAll(tile => {
                    if (!tile.tileData) {
                        return;
                    }
                    const { i, j, k, tileData } = tile

                    if (!tilesGeom[tile.tileData.keyModel]) {
                        return;
                    }

                    const copyV = [...tilesGeom[tileData.keyModel].v]
                    rotateArrY(copyV, tileData.rotationY)
                    translateArr(copyV, W * k, H * i, W * j)
                    v.push(...copyV)
                    //c.push(...tilesGeom[tileData.keyModel].c)
                    c.push(...colors[tileData.keyModel])
                    u.push(...tilesGeom[tileData.keyModel].u)

                    const copyVCollision = [...tilesGeom[tileData.keyModel].col]
                    rotateArrY(copyVCollision, tileData.rotationY)
                    translateArr(copyVCollision, W * k, H * i, W * j)
                    col.push(...copyVCollision)
                })

                const { X, Y, Z, SIZE_X, SIZE_Y, SIZE_Z } = structureData

                const g = createGeomFromBuffer({ v, c, u })
                mesh = new THREE.Mesh(g, mat)
                //mesh.position.set(X, Y, Z)
                //mesh.position.set(SIZE_X / 2 * 300, 0, SIZE_Z / 2 * 300)
                root.studio.addToScene(mesh)
                mesh.geometry.computeBoundingSphere()
                root.studio.setTargetCam(mesh.geometry.boundingSphere.center)

                //const gCollision = createGeomFromBuffer({ v: col })
                //meshCollision = new THREE.Mesh(gCollision, basicMat)
                //meshCollision.position.set(X, Y, Z)
                //root.studio.addToScene(meshCollision)
                //meshCollision.visible = false
                //root.system_PlayerMoveOnLevel.addItemToPlayerCollision(meshCollision)

                res()
            })
        },

        setPosition: (x = 0, y = 0, z = 0) => {
            mesh.position.set(x, y, z)
        },

        destroyStructure: () => {
            if (!mesh) {
                return
            }
            root.studio.removeFromScene(mesh)
            mesh.geometry.dispose()

            //root.studio.removeFromScene(meshCollision)
            //meshCollision.geometry.dispose()
            mesh = null
        },
    }
}
