const [dark, light] = ['🌒', '🌔']
const pcsDark = window.matchMedia('(prefers-color-scheme: dark)')

let isDark = window.localStorage.getItem('isDark')
isDark = isDark == null ? pcsDark.matches : isDark === 'true'

const button = document.createElement('button')
const toggle = () => {
    document.documentElement.style.setProperty('--invert', isDark ? 1 : 0)
    document.documentElement.style.setProperty('--sepia', isDark ? 0 : 0.1)
    window.localStorage.setItem('isDark', isDark)
    button.innerText = isDark ? dark : light
    isDark = !isDark
}
button.onclick = toggle
Object.assign(button.style, {
    cursor: 'pointer',
    border: 'none',
})

document.querySelector('header').append(button)
toggle()
