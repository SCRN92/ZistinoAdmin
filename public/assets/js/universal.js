var btn = document.getElementById("addBtn");
var notifModal = document.getElementById("notifModal");
var myModalLabel = document.getElementById("myModalLabel");

function refresh() {
    myModalLabel = document.getElementById("myModalLabel");
    if (myModalLabel.innerText == "خطا") return;
    location.reload();
}

function addItem(Ids, modelNames, givenId, url) {
    var btn = document.getElementById("addBtn");
    let data = "id=" + givenId
    let item;
    let elem;
    for (var i = 0; i < Ids.length; i++) {
        item = Ids[i]
        elem = document.getElementById(item)
        if (elem.value == "") {
            notifModal.innerText = "لطفا اطلاعات را وارد کنید"
            myModalLabel.innerText = "خطا"
            return;
        }
        data = data + "&" + modelNames[i] + "=" + elem.value;
    }
    btn.innerText = "افزودن"
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
        if (xhr.responseText == "ok") {
            for (let id in Ids)
                document.getElementById(id).value = ""
            notifModal.innerText = "اضافه شد"
            myModalLabel.innerText = "موفق"
        } else if (xhr.responseText == "updated") {
            notifModal.innerText = "به روز شد"
            myModalLabel.innerText = "موفق"
        } else {
            notifModal.innerText = "خطا در ارتباط"
            myModalLabel.innerText = "خطا"
        }
    }
    xhr.send(data);
}

function deleteItem(id, url) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
        if (xhr.responseText == "ok") {
            notifModal.innerText = "حذف شد"
            myModalLabel.innerText = "موفق"
        } else {
            notifModal.innerText = "خطا در ارتباط"
            myModalLabel.innerText = "خطا"
        }
    }
    var data = "id=" + id;
    xhr.send(data);
}