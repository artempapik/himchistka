const loadPage = async (e, name) => {
    const button = e.target.closest('button')
    if (button.classList.contains('active')) {
        return
    }

    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'))
    button.classList.add('active')

    const result = await fetch(name + '.html')
    const text = await result.text()
    document.querySelector('main').innerHTML = text
}
