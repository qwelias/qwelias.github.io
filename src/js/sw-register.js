if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('/sw.js registered')
        reg.update()
    }).catch((error) => {
        console.warn('/sw.js failed', error)
    })
}
