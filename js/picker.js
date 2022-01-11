for (let el of document.getElementsByClassName("picker-item")) {
    el.onclick = () => {
        movePickerOver(el)
        localStorage.setItem("mode", el.getAttribute("value"))
    }
}

if (localStorage.getItem("mode")) {
    document.querySelector(`.picker-item[value="${localStorage.getItem("mode")}"]`).click()
}

function movePickerOver(element) {
    document.documentElement.style.setProperty("--over-left", `${indexOf(element.parentNode.children, element) * 100}px`);
    document.getElementById("picker").setAttribute("value", element.getAttribute("value"))
}

function indexOf(collection, element) {
    for (let i = 0; i < collection.length; i++) {
        if (collection[i] == element) {
            return i
        }
    }
    return -1
}