export const createUi = () => {
    const wrapper = document.createElement('div')
    wrapper.classList.add('ui-wrapper')
    document.body.appendChild(wrapper)

    const b = document.createElement('button')
    b.classList.add('button-create')
    b.innerText = 'generate item'
    wrapper.appendChild(b)

    const b2 = document.createElement('button')
    b2.classList.add('button-create')
    b2.innerText = 'generate stairs'
    wrapper.appendChild(b2)

    const b3 = document.createElement('button')
    b3.classList.add('button-create')
    b3.innerText = 'generate one stair'
    wrapper.appendChild(b3)

    const b4 = document.createElement('button')
    b4.classList.add('button-create', 'offset-top')
    b4.innerText = 'download model'
    wrapper.appendChild(b4)

    const b5 = document.createElement('button')
    b5.classList.add('button-create')
    b5.innerText = 'download texture'
    wrapper.appendChild(b5)

    return {
        setF: f => {
            b.addEventListener('click', f)
        },
        setF2: f => {
            b2.addEventListener('click', f)
        },
        setF3: f => {
            b3.addEventListener('click', f)
        },
        setF4: f => {
            b4.addEventListener('click', f) 
        },
        setF5: f => {
            b5.addEventListener('click', f)
        }
    }
}