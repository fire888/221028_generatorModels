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
                y = h2
            } 

            arr.push({ x: xR, y: yR }) 

            
            y += step
        }

        y = 0
        x += step
    }

    console.log(arr)

    return arr
}