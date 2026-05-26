const loadPage = async (e, page) => {
    const button = e.target.closest('button')
    if (button.classList.contains('active')) {
        return
    }

    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'))
    button.classList.add('active')

    const result = await fetch(`html/${page}.html`)
    const text = await result.text()
    document.querySelector('main').innerHTML = text
}
