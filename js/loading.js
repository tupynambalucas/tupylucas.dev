
async function screenLoaded() {
    await delay(3000)
    animateCSS("#loading", 'fadeOut').then(() => {
        loading.style.display = "none"
    });
}
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', () => {
    let loading = document.getElementById("loading")
    console.log("loaded")
    document.body.classList.remove('no-scroll')
    screenLoaded(loading)
});
