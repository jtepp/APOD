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
        showLightbox(e.target)
    }
})

function showLightbox(postImage) {
    const p = posts[postImage.parentElement.id];

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