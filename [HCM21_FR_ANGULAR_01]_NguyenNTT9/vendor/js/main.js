var nut = document.querySelectorAll('.item-click');
var content = document.querySelectorAll('.box-show');
var btn_cancel = document.querySelectorAll('.btn-cancel');
for (var i = 0; i < nut.length; i++) {
    nut[i].addEventListener("click", function () {
        let btnNut = this;
        document.querySelector('.black').classList.toggle('hint-black');
        var content_show = this.getAttribute("data-show");
        var current_show = document.getElementById(content_show);
        current_show.classList.toggle("show_hidden");
    });
}
document.querySelector(".item-click-project").onclick = function (e) {
    let prName = document.querySelector("#pr-name");
    let prKey = document.querySelector("#pr-keyword");
    let prSum = document.querySelector("#pr-summary");
    let prWName = document.querySelector("#pr-web-name");
    let prWType = document.querySelector("#pr-web-type");
    let data = JSON.parse(localStorage.getItem("projectData")) || {
        [prName.name]: "",
        [prKey.name]: "",
        [prSum.name]: "",
        [prWName.name]: "",
        [prWType.name]: "",
    };
    prName.value = data[prName.name];
    prKey.value = data[prKey.name];
    prSum.value = data[prSum.name];
    prWName.value = data[prWName.name];
    prWType.value = data[prWType.name];
}
document.querySelector(".btn-save-pr").addEventListener("click", function (e) {
    e.preventDefault();
    let prName = document.querySelector("#pr-name");
    let prKey = document.querySelector("#pr-keyword");
    let prSum = document.querySelector("#pr-summary");
    let prWName = document.querySelector("#pr-web-name");
    let prWType = document.querySelector("#pr-web-type");
    let data = {
        [prName.name]: prName.value,
        [prKey.name]: prKey.value,
        [prSum.name]: prSum.value,
        [prWName.name]: prWName.value,
        [prWType.name]: prWType.value,
    }
    localStorage.setItem("projectData", JSON.stringify(data));
});
