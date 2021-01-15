if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/sw-swr.js', { scope: '/' }).then((reg) => {
        console.log('/js/sw-swr.js registered')
    }).catch((error) => {
        console.warn('/js/sw-swr.js failed', error)
    })
}
