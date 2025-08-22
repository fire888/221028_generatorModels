import { _M, A3 } from "../geometry/_m"
import { createScheme } from "./scheme"
import { calcDataAreas } from "./logicSegment"
import { createArea00 } from "../geometry/area00/area00"
import { tileMapWall } from "../geometry/tileMapWall"
import * as THREE from "three"
import { IArrayForBuffers, SegmentType, IArea, ILevelConf, TSchemeElem, TLabData } from "../types/GeomTypes";
import { calculateHouses } from "./calculateHouses"

const COLOR_FLOOR: A3 = _M.hexToNormalizedRGB('090810')
const COLLISION_NAME_KEY = 'LAB_COLLISION'

type THousesGeomeries = {
    geometry: THREE.BufferGeometry,
    vCollide: number[]
}

export class Labyrinth {
    type: string = 'HouseTown'
    _houses: THREE.Mesh[] = []
    _roads: THREE.Mesh[] = []
    _stricts: THREE.Group[] = []
    _collisionsNames: string[] = []
    _labSheme: TLabData = { areasData: [], positionsEnergy: [], positionsAntigravs: [] }
    mesh: THREE.Group | null = new THREE.Group()
    mat: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, vertexColors: true })
    cameraLookData: {
        lookAt: THREE.Vector3,
        position: THREE.Vector3,
    } = { lookAt: new THREE.Vector3(), position: new THREE.Vector3() }

    async build (conf: ILevelConf =             
        {  // VVV квадрат средний
            SX: 60,
            SY: 60,
            N: 30,
            repeats: [
                [-20, -20],
            ],
        },
    ) {

        if (!this.mesh) {
            this.mesh = new THREE.Group()
        }

        
        console.log('[MESSAGE:] START SCHEME')
        let d = Date.now()
        const scheme: TSchemeElem[] = createScheme(conf)
        this._labSheme = calcDataAreas(scheme, conf)
        console.log('[TIME:] COMPLETE SCHEME:', ((Date.now() - d) / 1000).toFixed(2))


        console.log('[MESSAGE:] START CALCULATE HOUSES')
        d = Date.now()
        const houses: IArrayForBuffers[] = calculateHouses(this._labSheme.areasData)
        const housesMergedGeometries: {
            geometry: THREE.BufferGeometry,
            vCollide: number[]
        }[] = []
        
        let countVerticies = 0
        let v = []
        let c = []
        let uv = []
        let forceMat = []
        let vCollide = []

        for (let i = 0; i < houses.length; ++i) {
            countVerticies += houses[i].v.length / 3
            for (let j = 0; j < houses[i].v.length; j += 3) {
                v.push(houses[i].v[j], houses[i].v[j + 1], houses[i].v[j + 2])
            }
            for (let j = 0; j < houses[i].c.length; j += 3) {
                c.push(houses[i].c[j], houses[i].c[j + 1], houses[i].c[j + 2])
            }
            for (let j = 0; j < houses[i].uv.length; j += 2) {
                uv.push(houses[i].uv[j], houses[i].uv[j + 1])
            }
            for (let j = 0; j < houses[i].forceMat.length; j += 1) {
                forceMat.push(houses[i].forceMat[j])
            }
            for (let j = 0; j < houses[i].vCollide.length; j += 3) {
                vCollide.push(houses[i].vCollide[j], houses[i].vCollide[j + 1], houses[i].vCollide[j + 2])
            }

            if (
                !houses[i + 1] ||
                countVerticies + houses[i + 1].v.length / 3  > 200000
            ) {
                housesMergedGeometries.push({
                    geometry: _M.createBufferGeometry({ v, c, uv, forceMat }),
                    vCollide
                })

                v = []
                c = []
                uv = []
                forceMat = []
                vCollide = []
                countVerticies = 0
            }
        }
        console.log('[TIME:] COMPLETE CALCULATE HOUSES', ((Date.now() - d) / 1000).toFixed(2))


        console.log('[MESSAGE:] START ADD HOUSES')
        d = Date.now()
        for (let i = 0; i < conf.repeats.length; ++i) {
            const offset = conf.repeats[i]
            this._buildStrict(housesMergedGeometries, offset[0], offset[1])  
        }
        console.log('[TIME:] COMPLETE ADD HOUSES:', ((Date.now() - d) / 1000).toFixed(2))


        console.log('[MESSAGE:] START ADD ROADS ')
        d = Date.now()
        for (let i = 0; i < conf.repeats.length; ++i) {
            const offset = conf.repeats[i]
            this._buildRoads(this._labSheme.areasData, offset[0], offset[1])
        }
        console.log('[TIME:] COMPLETE ADD ROADS', ((Date.now() - d) / 1000).toFixed(2))

        let minX = Infinity
        let maxX = -Infinity
        let minZ = Infinity
        let maxZ = -Infinity
        for (let i = 0; i < conf.repeats.length; ++i) {
            if (conf.repeats[i][0] + conf.SX < minX) minX = conf.repeats[i][0]
            if (conf.repeats[i][0] + conf.SX > maxX) maxX = conf.repeats[i][0]
            if (conf.repeats[i][1] + conf.SY < minZ) minZ = conf.repeats[i][1]
            if (conf.repeats[i][1] + conf.SY > maxZ) maxZ = conf.repeats[i][1]
        }
        this.cameraLookData = {
            lookAt: new THREE.Vector3(minX + (maxX - minX) * .5, 0, minZ + (maxZ - minZ) * .5),
            position: new THREE.Vector3(maxX, 100, maxZ)
        }
    }

    async clear () {
        this._houses.forEach(h => {
            h.parent.remove(h)
            h.geometry.dispose()
        })
        this._houses = []
        this._labSheme = {
            areasData: [],
            positionsEnergy: [],
            positionsAntigravs: []
        }

        this._collisionsNames = [] 

        this._roads.forEach(h => {
            h.parent.remove(h)
            h.geometry.dispose()
        })
        this._roads = []

        for (let i = 0; i < this._stricts.length; ++i) {
            this._stricts[i].parent.remove(this._stricts[i])
        }
        this._stricts = []

        this.mesh = null
    }

    get positionsEnergy () {
        return this._labSheme.positionsEnergy
    }

    get positionsAntigravs () {
        return this._labSheme.positionsAntigravs
    }
    
    private _buildStrict (houses: THousesGeomeries[], x: number, z: number) {
        const strict = new THREE.Group()
        this.mesh.add(strict)
        strict.position.x = x
        strict.position.z = z

        for (let i = 0; i < houses.length; ++i) {
            const { geometry, vCollide } = houses[i]

            //const m = new THREE.Mesh(geometry, this._root.materials.walls00)
            const m = new THREE.Mesh(geometry, this.mat)
            m.frustumCulled = false
            strict.add(m)
            m.position.y = .1
            this._houses.push(m)

            const collisionMesh = _M.createMesh({
                v: vCollide,
                material: this.mat
            })
            collisionMesh.name = COLLISION_NAME_KEY + '_' + Math.floor(Math.random() * 1000)
            this._collisionsNames.push(collisionMesh.name)
            collisionMesh.position.add(strict.position) 
            //this._root.phisics.addMeshToCollision(collisionMesh)
        }
    }

    private _buildRoads(areasData: IArea[], x: number, z: number) {
        const strict = new THREE.Group()
        strict.position.x = x
        strict.position.z = z
        this.mesh.add(strict)

        const v: number[] = [] 
        const c: number[] = [] 

        for (let i = 0; i < areasData.length; ++i) {
            let isHouse = false
            if (
                areasData[i].typeSegment === SegmentType.AREA_00 ||
                areasData[i].typeSegment === SegmentType.HOUSE_00 ||
                areasData[i].typeSegment === SegmentType.HOUSE_01
            ) {
                isHouse = true
            }
            if (!isHouse) {
                continue;
            }

            const areaData = areasData[i]

            const r = createArea00(areaData.perimeter, COLOR_FLOOR, tileMapWall.stoneTree, 0, -2, tileMapWall.break)

            v.push(...r.v)
            c.push(...r.c)
        }

        const uv1 = _M.fillUvByPositionsXZ(v)
        const m = _M.createMesh({ 
            v,
            uv: uv1,
            c,
            //material: this._root.materials.road
            material: this.mat
        })
        m.position.y = .05
        strict.add(m)
        this._roads.push(m)
    } 
}

