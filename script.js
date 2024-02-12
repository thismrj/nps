const URL = "https://script.google.com/macros/s/AKfycbz9NyeyP-Zql4C5lzVOc8SNDRP_ccrPLJjqLNBGjr-QwI4fnjBILYN5C6SSVw_Ntv6gVg/exec"
const REDIRECT_URL = "https://motozilla.com.ua/";

const $ = (selector, all = false) => all ? document.querySelectorAll(selector) : document.querySelector(selector)

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nps")
        .addEventListener("submit", onFormSumbit);
});

function onFormSumbit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (!formData.has("score")) return Highlight();

    fetch(URL, {
        mode: 'no-cors',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            score: formData.get("score"),
            feedback: formData.get("feedback")
        })
    });

    ShowNextSlide();
    DelayedRedirect(REDIRECT_URL, 2 * 1000);

    return false;
}

function DelayedRedirect(url) {
    setTimeout(() => window.location.replace(url), 5 * 1000);
}

function Highlight() {
    $(`input[type="radio"] + label`, true).forEach(e => e.classList.add('highlight'));
    setTimeout(() => $(`input[type="radio"] + label`, true).forEach(e => e.classList.remove('highlight')), 3 * 1000);
}

function ShowNextSlide() {
    $(".card__item", true).forEach(element => element.classList.add("hide"));
    $(".card__footer").classList.add("hide");
    $(".thanks").classList.remove("hide");
}
