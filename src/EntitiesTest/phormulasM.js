


/**
 * @param v1
 * @param v2
 * @param v3
 * @returns {number}
 *
 *  scalar product of three vectors
 */
const calculateByMatrix = (v1, v2, v3) => {
    return v1[0] * (v2[1] * v3[2] - v2[2] * v3[1]) -
        v2[0] * (v1[1] * v3[2] - v1[2] * v3[1]) +
        v3[0] * (v1[1] * v2[2] - v1[2] * v2[1])
}

const productTwoVectors3 = (v1, v2) => {
    return [
        (v1[1] * v2[2] - v2[1] * v1[2]),
        (v1[0] * v2[2] - v2[0] * v1[2]),
        (v1[0] * v2[1] - v2[0] * v1[1]),
    ]
}

const productTwoVectors2 = (v1, v2) => {
    return v1[0] * v2[1] - v2[0] * v1[1]
}

/**
 *
 * @param v1
 * @param v2
 * @param v3
 * @param v4
 * @param key4
 * @returns {number}
 *
 *
 */
export const getPoint = (v1, v2, v3, v4, key4) => {
    const d = calculateByMatrix(v1, v2, v3)

    let a = calculateByMatrix([-1, v1[1], v1[2]], [-1, v2[1], v2[2]], [-1, v3[1], v3[2]])
    let b = calculateByMatrix([v1[0], -1, v1[2]], [v2[0], -1, v2[2]], [v3[0], -1, v3[2]])
    let c = calculateByMatrix([v1[0], v1[1], -1], [v2[0], v2[1], -1], [v3[0], v3[1], -1])

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

const getABC = (m1, m2, m3) => {
    let a1 = calculateByMatrix([-1, m1[1], m1[2]], [-1, m2[1], m2[2]], [-1, m3[1], m3[2]])
    let b1 = calculateByMatrix([m1[0], -1, m1[2]], [m2[0], -1, m2[2]], [m3[0], -1, m3[2]])
    let c1 = calculateByMatrix([m1[0], m1[1], -1], [m2[0], m2[1], -1], [m3[0], m3[1], -1])

    return [a1, b1, c1]
}


export const getLineFromTwoPlanes = (m1, m2, m3, n1, n2, n3) => {
    const d1 = calculateByMatrix(m1, m2, m3)
    console.log('d1', d1)
    const abc1 = getABC(m1, m2, m3)
    console.log('abc1', abc1)

    const d2 = calculateByMatrix(n1, n2, n3)
    console.log('d2', d2)
    const abc2 = getABC(n1, n2, n3)
    console.log('abc2', abc2)

    const normal = productTwoVectors3(abc1, abc2)
    console.log('normal of line', normal)

    // x = 0
    const product_1_1 = productTwoVectors2([abc1[1], abc1[2]], [abc2[1], abc2[2]])
    console.log('product_1_1', product_1_1)
    const product_1_2 = productTwoVectors2([d1, abc1[2]], [d2, abc2[2]])
    console.log('product_1_2', product_1_2)
    const y = product_1_2 / product_1_1
    console.log('y', y)
    const product_1_3 = productTwoVectors2([abc1[1], d1], [abc2[1], d2])
    console.log('product_1_3', product_1_3)
    const z = product_1_3 / product_1_1
    console.log('z', z)

    // calculate after https://app.whiteboard.microsoft.com/me/whiteboards/4fc24b54-b286-4ed2-bef0-f0e985c4d3c4
}


const m1 = [1, 1, 1]
const m2 = [10, 2, 2]
const m3 = [2, 3, 10]

const n1 = [-1, 1, 1]
const n2 = [1, 10, 2]
const n3 = [12, 2, 3]


console.log(
    getLineFromTwoPlanes(m1, m2, m3, n1, n2, n3)
)

