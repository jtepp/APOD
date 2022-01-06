class Post {
    constructor(config) {
        this.copyright = config.copyright
        this.date = config.date
        this.desc = config.explanation
        this.hdurl = config.hdurl
        this.url = config.url
        this.title = config.title
        this.id = config.url.replace('https://apod.nasa.gov/apod/image/', '').replace('.jpg', '')
        this.liked = localStorage.getItem(this.id) || false
    }

    toggleLike() {
        if (this.liked)
            localStorage.removeItem(this.id)
        else
            localStorage.setItem(this.id, true)

        this.liked = !this.liked
    }

    getHTML() {
        const section = document.createElement('section')

        const postDiv = document.createElement('div')
        postDiv.classList.add('post')

        const postImageCont = document.createElement('div')
        postImageCont.classList.add('post-image-cont')
        postImageCont.id = this.id

        const postImage = document.createElement('img')
        postImage.classList.add('post-image')
        postImage.setAttribute('draggable', 'false')
        postImage.src = this.url

        postImageCont.appendChild(postImage)
        postDiv.appendChild(postImageCont)

        const postExtras = document.createElement('div')
        postExtras.classList.add('post-extras')

        const like = document.createElement('box-icon')
        like.classList.add('bx-button')
        like.classList.add('like-button')
        like.setAttribute('name', 'heart')
        like.onclick = this.toggleLike()

        const share = document.createElement('box-icon')
        share.classList.add('bx-button')
        share.classList.add('share-button')
        share.setAttribute('name', 'link')
        share.onclick = () => {
            const text = window.location.href + '?id=' + this.id
            const el = document.createElement('textarea')
            el.value = text
            document.body.appendChild(el)
            el.select()
            document.execCommand('copy')
            document.body.removeChild(el)
        }

        postExtras.appendChild(like)
        postExtras.appendChild(share)
        postDiv.appendChild(postExtras)

        section.appendChild(postDiv)

        return section
    }
}

const feedCont = document.getElementById('feed-cont');
const header = document.querySelector('header');
const logo = document.getElementById('logo');
const topBarHeight = getComputedStyle(document.documentElement)
    .getPropertyValue('--top-bar-height').replace('px', '').trim();

document.body.onscroll = () => {
    if (document.documentElement.scrollTop > topBarHeight) {
        if (!header.classList.contains('logo-small'))
            header.classList.add('logo-small');
    } else {
        if (header.classList.contains('logo-small'))
            header.classList.remove('logo-small');
    }
}

logo.onclick = () => {
    document.documentElement.scrollTop = 0;
}