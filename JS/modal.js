const modal = {
    callOpen: () => {
        modal.opener = document.activeElement
        openModal()
    },
    callClose: () => {
        closeModal(modal.opener)
    },
    handleOverlayClick: (event) => {
        if (event.target.className === 'overlay') {
            closeModal(modal.opener)
        }
    }
}

function openModal() {
    setVisibile(true)
    setFocus()
    setInertBehindModal(true)
}

function closeModal(opener) {
    setVisibile(false)
    setInertBehindModal(false)
    opener.focus()
}

function attachEventListener(openButtons, closeButtons, overlay) {
    openButtons.forEach(b => {
        b.addEventListener('click', modal.callOpen)
    });
    closeButtons.forEach(b => {
        b.addEventListener('click', modal.callClose)
    });
    overlay.addEventListener('click', modal.handleOverlayClick)
    window.addEventListener('keydown', clallIfEscPress)
}

function setVisibile(visible) {
    // const display = visible ? 'block' : 'none'
    // const modal = modaldocument.querySelector('.overlay').style.display = display

    const modal = document.querySelector('.overlay')

    if (visible == false) {
        modal.classList.add('fadeout')
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('fadeout')
        }, 500)
    } else {
        modal.style.display = 'block';
    }
}

function setFocus() {
    document.querySelectorAll('.modal button')[0].focus()
}

function setInertBehindModal(inert) {
    const main = document.querySelector('main')
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    header.inert = inert
    main.inert = inert
    footer.inert = inert
    header.setAttribute('aria-hidden', inert)
    main.setAttribute('aria-hidden', inert)
    footer.setAttribute('aria-hidden', inert)
}

function clallIfEscPress(event) {
    if (event.key === 'Escape') {
        modal.callClose()
    }
}

const openButtons = document.querySelectorAll('.open-modal')
const closeButtons = document.querySelectorAll('.close-modal')
const overlay = document.querySelector('.overlay')
attachEventListener(openButtons, closeButtons, overlay)