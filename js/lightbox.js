const lbCont = document.getElementById('lightbox-cont');
const close = document.getElementById('lightbox-close');

close.onclick = () => {
    lbCont.classList.add('hidden');
}

lbCont.onclick = (e) => {
    if (e.target.id == 'lightbox-cont') {
        lbCont.classList.add('hidden');
    }
}

document.querySelectorAll('.post-image').forEach(img => {
    img.onclick = (e) => {
        showLightbox(e.target.parentElement.id)
    }
})

function showLightbox(id) {
    const p = posts[id];

    document.getElementById('lightbox-img').src = p.url;

    document.getElementById('lb-sidebar-title').innerHTML = p.title;

    const d = new Date(p.date + " ");
    document.getElementById('lb-sidebar-date').innerHTML = d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    if (p.liked) {
        document.getElementById('lb-sidebar-like').classList.add('liked');
    } else {
        document.getElementById('lb-sidebar-like').classList.remove('liked');
    }

    document.getElementById('lb-sidebar-like').onclick = () => {

        document.getElementById('lb-sidebar-like').classList.toggle('liked');

        const baseLike = document.getElementById(p.id).parentElement.querySelector('.like-button')
        baseLike.click();

    }

    // manage side buttons
    const root = document.getElementById(p.id).parentElement.parentElement
    const left = document.getElementById("lightbox-left")
    const right = document.getElementById("lightbox-right")

    if (root.previousElementSibling == null) {
        left.style.display = 'none'
        left.parentElement.style.cursor = 'default'
    } else {
        left.style.display = 'block'
        left.parentElement.style.cursor = 'pointer'
        left.parentElement.onclick = () => {
            showLightbox(root.previousElementSibling.querySelector('.post-image-cont').id)
        }
    }

    if (root.nextElementSibling == null) {
        right.style.display = 'none'
        right.parentElement.style.cursor = 'default'
    } else {
        right.style.display = 'block'
        right.parentElement.style.cursor = 'pointer'
        right.parentElement.onclick = () => {
            showLightbox(root.nextElementSibling.querySelector('.post-image-cont').id)
        }
    }



    document.getElementById('lb-sidebar-share').onclick = (e) => {
        const text = window.location.href + '?date=' + this.date
        const el = document.createElement('textarea')
        el.value = text
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)

        const shareButton = e.target
        if (!shareButton.classList.contains('copied')) {
            shareButton.classList.add('copied')
            setTimeout(() => {
                shareButton.classList.remove('copied')
            }, 2000)
        }
    }

    document.getElementById('lb-sidebar-info').innerHTML = p.desc;


    lbCont.classList.remove('hidden');

}