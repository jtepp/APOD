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