window.onload = init;

function init() {
    var button_add = document.getElementById("add_button");
    var button_clear = document.getElementById("clear_button");
    button_clear.onclick = clearAll;
    button_add.onclick = createSticky;
    var stickArray = getStickiesArray();

    for (var key in localStorage) {
      
        if (key.substring(0, 6) == "sticky") {
            var value = JSON.parse(localStorage[key]);
            addStickyToDOM(key,value);
        }
    }
}

function getStickiesArray() {
    var stickiesArray = localStorage["stickiesArray"];
    if (!stickiesArray) {
        stickiesArray = [];
        localStorage["stickiesArray"] = JSON.stringify(stickiesArray);
    } else {
        stickiesArray = JSON.parse(stickiesArray);
    }

    return stickiesArray;
}

function stickyObj(value, color) {
    this.value = value;
    this.color = color;
}

function createSticky() {
    var stickiesArray = getStickiesArray();
    var currentDate = new Date();
    var colorSelectObj = document.getElementById("note_color");
    var index = colorSelectObj.selectedIndex;
    var color = colorSelectObj[index].value;
    var key = "sticky_" + currentDate.getTime();
    var value = document.getElementById("note_text").value;
    stickyObject = new stickyObj(value, color);
    localStorage[key] = JSON.stringify(stickyObject);
    stickiesArray.push(key);
    localStorage["stickiesArray"] = JSON.stringify(stickiesArray);
    addStickyToDOM(key, stickyObject);
}

function addStickyToDOM(key, stickyObj) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    sticky.setAttribute("id", key);
    sticky.style.backgroundColor = stickyObj.color;
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = stickyObj.value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
    sticky.onclick = deleteSticky;
}

function deleteSticky(e) {
    var key = e.target.id;
    if (e.target.tagName.toLowerCase() == "span") {
        key = e.target.parentNode.id;
    }
    localStorage.removeItem(key);
    var stickiesArray = getStickiesArray();
    if (stickiesArray) {
        for (var item in stickiesArray) {
            if (key == stickiesArray[item]) {
                stickiesArray.splice(item, 1);
            }
        }

        localStorage["stickiesArray"] = JSON.stringify(stickiesArray);
        removeStickyFromDOM(key);
    }
}

function removeStickyFromDOM(key) {
    var sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}

function clearAll() {
    localStorage.clear();
    ul = document.getElementById("stickies");
    ul.innerHTML = "";
}