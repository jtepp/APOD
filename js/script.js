class Post {
    constructor(config) {
        this.copyright = config.copyright
        this.date = config.date
        this.desc = config.explanation
        this.hdurl = config.hdurl
        this.url = config.thumbnail_url || config.url
        this.title = config.title
        this.mediaType = config.media_type
        this.id = "id" + config.date
        this.liked = localStorage.getItem(this.id) || false
        this.x = config
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

        const postImage = document.createElement("img")
        postImage.classList.add('post-image')
        postImage.setAttribute('draggable', 'false')
        postImage.src = this.url
        postImage.onclick = (e) => {
            showLightbox(e.target.parentElement.id, undefined)
        }

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
        <svg class="bx-heart-stroke" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z">
                            </path>
                        </svg>
                        <svg class="bx-heart-fill" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z">
                            </path>
                        </svg>
        `
        like.onclick = () => this.toggleLike(this)

        const share = document.createElement('div')
        share.classList.add('box-icon')
        share.classList.add('share-button')
        share.innerHTML = `
        <svg class="bx-link" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z">
                            </path>
                            <path
                                d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z">
                            </path>
                        </svg>
                        <svg class="bx-check" width="24" height="24" viewBox="0 0 24 24">
                            <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"
                                stroke="#00b400" stroke-width="1.5"></path>
                        </svg>
        `
        share.onclick = (e) => {
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

        postExtras.appendChild(like)
        postExtras.appendChild(share)

        const postInfo = document.createElement('div')
        postInfo.classList.add('post-info')

        const postTitle = document.createElement('div')
        postTitle.classList.add('post-title')
        postTitle.innerText = this.title

        const postDate = document.createElement('div')
        postDate.classList.add('post-date')
        const d = new Date(this.date + " ")
        postDate.innerText = d.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })

        const postDesc = document.createElement('div')
        postDesc.classList.add('post-desc')
        postDesc.innerText = this.desc

        postInfo.appendChild(postTitle)
        postInfo.appendChild(postDate)
        postInfo.appendChild(postDesc)

        postDiv.appendChild(postExtras)
        postDiv.appendChild(postInfo)

        section.appendChild(postDiv)

        return section
    }
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

let posts = {}
let dateOffset = 0
const daysToShow = 20
const feedCont = document.getElementById('feed-cont');
const header = document.querySelector('header');
const logo = document.getElementById('logo');
const loadMore = document.getElementById('load-more-button')
const calendarButton = document.getElementById('calendar-button')
const calendarInput = document.getElementById('calendar-input')
const topBarHeight = getComputedStyle(document.documentElement)
    .getPropertyValue('--top-bar-height').replace('px', '').trim();

if (localStorage.getItem('scheme')) {
    document.body.setAttribute('scheme', localStorage.getItem('scheme'))
    if (localStorage.getItem('scheme') == 'dark') {
        document.getElementById('scheme-button-inner').classList.remove('dark')
    }
}

document.getElementById('scheme-button').onclick = () => {
    document.getElementById('scheme-button-inner').classList.toggle('dark')
    document.body.getAttribute('scheme') === 'dark' ? document.body.setAttribute('scheme', 'light') : document.body.setAttribute('scheme', 'dark')
    localStorage.setItem('scheme', document.body.getAttribute('scheme'))
}

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

populate(getDate(new Date().addDays(-daysToShow + dateOffset)), getDate(new Date().addDays(dateOffset)), true)
dateOffset -= daysToShow

loadMore.onclick = () => {
    populate(getDate(new Date().addDays(-daysToShow + dateOffset)), getDate(new Date().addDays(dateOffset)))
    dateOffset -= daysToShow
}

calendarButton.onclick = (e) => {
    if (e.target.id == 'calendar-button')
        calendarButton.classList.toggle('open')
}

document.getElementById('calendar-go').onclick = () => {
    if (calendarInput.value.trim() != '') {
        calendarButton.classList.remove('open')
        populate(getDate(new Date(calendarInput.value).addDays(-daysToShow)), calendarInput.value, true)

        // dateOffset = days since calendarInput.value
        dateOffset = Math.floor((-new Date(calendarInput.value).getTime() + new Date().getTime()) / 86400000)
    }
}

function populate(start, end, clear) {
    feedCont.classList.add('loading')
    fetch('https://api.nasa.gov/planetary/apod?api_key=E7IKFgmhJVFqvxnlbKEJUvBTcVE5HfWCFFCuYSk9&&thumbs=true&start_date=' + start + '&end_date=' + end)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if (clear)
                feedCont.innerHTML = ''
            data.forEach(post => {
                const p = new Post(post)
                posts[p.id] = p
                feedCont.prepend(p.getHTML())
            })
            feedCont.classList.remove('loading')
        })
        .catch(err => {
            console.log(err)

            dateOffset = 0
            populate(getDate(new Date().addDays(-daysToShow + dateOffset)), getDate(new Date().addDays(dateOffset)), true)
            dateOffset -= daysToShow

        })
}

calendarInput.setAttribute('max', getDate(new Date()))

function getDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    let yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return yyyy + '-' + mm + '-' + dd
}


function getPost(date) {
    fetch('https://api.nasa.gov/planetary/apod?api_key=E7IKFgmhJVFqvxnlbKEJUvBTcVE5HfWCFFCuYSk9&&thumbs=true&date=' + date)
        .then(res => res.json())
        .then(data => {
            if (data.code && data.code == 400) {
                alert('No post found for that date')
            } else {

                const p = new Post(data)
                showLightbox(undefined, p)
            }
        })
}