var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var myRow = document.getElementById("tableContent");


var siteList;

if (localStorage.getItem("sites") == null) {
    siteList = [];
}else {
    siteList = JSON.parse(localStorage.getItem("sites"));
    display();
}
function addSite() {
    if (siteName.classList.contains("is-valid") && siteURL.classList.contains("is-valid")) {
        var site = {
            name: siteName.value,
            URL: siteURL.value,
        };
    
        siteList.push(site);
        localStorage.setItem("sites", JSON.stringify(siteList));
        display();
    }else {
        window.alert(`Site Name or Url is not valid `)
    }
    
}

function display() {
    var container = "";

    for (var i = 0; i < siteList.length; i++) {
        container += `
        <tr>
            <td>${i+1}</td>
            <td>${siteList[i].name}</td>
            <td><button onclick="visitSite(${i})" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>visit</button></td>
            <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>delete</button></td>
        </tr>`
    }

    myRow.innerHTML = container;
}

function visitSite(index) {
    window.open(siteList[index].URL)
}

function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(siteList));
    display();
}

function validateInput(e) {
    var string = e.value;

    var regex = {
        siteName: /(.*[a-z]){3}/,
        siteURL: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/i,
    }
        
    if (regex[e.id].test(string) == true) {
        e.classList.add("is-valid");
        e.classList.remove("is-invalid");
    } else {
        e.classList.remove("is-valid");
        e.classList.add("is-invalid");
    }
}