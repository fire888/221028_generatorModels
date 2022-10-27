export const createUi = () => {
    const wrapper = document.createElement('div')
    wrapper.classList.add('ui-wrapper')
    document.body.appendChild(wrapper)

    const b = document.createElement('button')
    b.classList.add('button-create')
    b.innerText = 'generateAqueduc'
    wrapper.appendChild(b)

    const b2 = document.createElement('button')
    b2.classList.add('button-create')
    b2.innerText = 'generateStairs'
    wrapper.appendChild(b2)

    const b3 = document.createElement('button')
    b3.classList.add('button-create')
    b3.innerText = 'generateOneStair'
    wrapper.appendChild(b3)

    return {
        setF: f => {
            b.addEventListener('click', f)
        },
        setF2: f => {
            b2.addEventListener('click', f)
        },
        setF3: f => {
            b3.addEventListener('click', f)
        }
    }
}