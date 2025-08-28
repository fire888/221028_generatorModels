/* eslint-disable */
export const createUi = () => {
    const wrapper = document.createElement('div')
    wrapper.classList.add('ui-wrapper')
    document.body.appendChild(wrapper)

    const buttons = {}


    return {
        setOnClick: (key, f, groupKey = null) => {
            const b = document.createElement('button')
            groupKey && b.classList.add(groupKey)
            b.innerText = key
            wrapper.appendChild(b)
            buttons[key] = b
            buttons[key].addEventListener('click', () => {
                if (groupKey) {
                    const bs = document.getElementsByClassName(groupKey)
                    for (let i = 0; i < bs.length; ++i) {
                        bs[i].classList.remove('red')
                    }
                    b.classList.add('red')
                }
                f() 
            })
        },
        addEmptyLine: () => { 
            const d = document.createElement('div')
            d.style.minHeight = '20px'
            wrapper.appendChild(d)
        },

        setActiveButton(str) {
            if (buttons[str]) {
                const bs = document.getElementsByClassName('red')
                for (let i = 0; i < bs.length; ++i) {
                    bs[i].classList.remove('red')
                }
                buttons[str].classList.add('red')
            }
        } 
    }
}