const ranMM = (min, max) => Math.random() * (max - min) + min
const ran = v => Math.random() * v 

export const createWallScheme = data => {
    const {
        len = 100,
        h0 = 0, 
        h1 = 10,
        h2 = 100,
    } = data

    const arr = []

    let x = 0
    let y = 0

    const ranD = 6
    const ranR = ranD / 2
    const step = 10

    while (x < len + step) {
        while (y < h2 + step) {
            let xR = x + ran(ranD) - ranR
            if (x === 0) {
                xR = x
            }
            if (x >= len) {
                xR = len
            } 

            let yR = y + ran(ranD) - ranR
            if (y === 0) {
                yR = y
            }
            if (y >= h2) {
                yR = h2
            } 

            arr.push({ x: xR, y: yR, nears: [] }) 

            y += step
        }

        y = 0
        x += step
    }

    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < arr.length; ++j) {
            if (i === j) {
                continue;
            }

            const dX = arr[j].x - arr[i].x 
            const dY = arr[j].y - arr[i].y 
            if (Math.sqrt(dX * dX + dY * dY) < (step * 1.1)) {
                arr[i].nears.push(j)
            }
        }
    }

    console.log(arr)

    return arr
}