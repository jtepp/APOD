class Post {
    constructor(config) {
        this.copyright = config.copyright
        this.date = config.date
        this.desc = config.explanation
        this.hdurl = config.hdurl
        this.url = config.url
        this.title = config.title
        this.id = "id" + config.url.replace('https://apod.nasa.gov/apod/image/', '').slice(0, -4).split('/').join('-')
        this.ext = config.url.slice(-4)
        this.liked = localStorage.getItem(this.id) || false
    }

    toggleLike(self) {
        if (self.liked)
            localStorage.removeItem(self.id)
        else
            localStorage.setItem(self.id, true)

        self.liked = !self.liked
        document.querySelector("#" + self.id + "+.post-extras>.like-button").classList.toggle('liked')
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

        const like = document.createElement('div')
        like.classList.add('box-icon')
        like.classList.add('like-button')
        if (localStorage.getItem(this.id))
            like.classList.add('liked')
        like.innerHTML = `
        <svg class="heart-stroke" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z">
                            </path>
                        </svg>
                        <svg class="heart-fill" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z">
                            </path>
                        </svg>
        `
        like.onclick = () => this.toggleLike(this)

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

let posts = {}
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


populate("2021-12-31", "2022-01-08", true)

function populate(start, end, clear) {
    fetch('https://api.nasa.gov/planetary/apod?api_key=E7IKFgmhJVFqvxnlbKEJUvBTcVE5HfWCFFCuYSk9&start_date=' + start + '&end_date=' + end)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if (clear)
                feedCont.innerHTML = ''
            data.forEach(post => {
                const p = new Post(post)
                posts[p.id] = p
                feedCont.appendChild(p.getHTML())
            })
        })
}