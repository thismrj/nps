// Google Apps URL
const GOOGLE_APPS_URL = "https://script.google.com/macros/s/AKfycbxOaNRTOA40lgvzh8PQEcv_XE5TQj1uqzyK7_xJKaNcix3Z04n0klZA-ZpOayq-Q-j7/exec"
// Redirect after submiting form
const REDIRECT_URL = "https://motozilla.com.ua/";


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nps")
        .addEventListener("submit", onFormSumbit);
});

function onFormSumbit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (!formData.has("score")) {
        Highlight('input[type="radio"] + label', 3 * 1000);

        return false;
    }

    fetch(GOOGLE_APPS_URL, {
        mode: 'no-cors',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            score: formData.get("score"),
            feedback: formData.get("feedback")
        })
    });

    HideNode(".card__item, .card__footer");
    ShowNode(".thanks");
    Redirect(REDIRECT_URL, 2 * 1000, true);

    return false;
}

function Redirect(url, delay = 0, replace = false) {
    const __redirect = () => replace ? window.location.replace(url) : window.location.href = url;

    if (delay == 0) {
        return __redirect();
    }

    return setTimeout(__redirect, delay);
}

function Highlight(selector, miliseconds) {
    document.querySelectorAll(selector).forEach((e) => e.classList.add('highlight'));
    
    return setTimeout(() => {
        document.querySelectorAll(selector).forEach((e) => {
            e.classList.remove('highlight')
        })
    }, miliseconds);
}

function HideNode(selector) {
    document.querySelectorAll(selector).forEach(element => element.classList.add("hide"));
}

function ShowNode(selector) {
    document.querySelectorAll(selector).forEach(element => element.classList.remove("hide"));
}
