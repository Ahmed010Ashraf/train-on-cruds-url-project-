let siteInput = document.getElementById("1");
    let siteURL = document.getElementById("2");
    let button = document.getElementById("main");
    let bod = document.getElementById("bod");
    let arr;

    if (localStorage.getItem("arr") != null) {
        arr = JSON.parse(localStorage.getItem("arr"));
        displayInPage();
    } else {
        arr = [];
    }

    button.onclick = function() {
        if (siteInput.value != "" && siteURL.value != "") {
            let url = siteURL.value;
            let regex = /^(https?:\/\/)?([a-z0-9.-]+\.[a-z]{2,6})(\/.*)?$/i;
            if (regex.test(url)) {
                let id = arr.length ? arr[arr.length - 1].id + 1 : 1; 
                let obj = {
                    name: siteInput.value,
                    url: url,
                    id: id
                }
                arr.push(obj);
                localStorage.setItem("arr", JSON.stringify(arr));
                displayInPage();
                siteInput.value = ""; 
                siteURL.value = "";
            } else {
                alert("Please enter a valid URL.");
            }
        }
    }

    function displayInPage() {
        let cartona = "";
        for (let i = 0; i < arr.length; i++) {
            cartona += `
                <tr>
                    <td>${arr[i].id}</td>
                    <td>${arr[i].name}</td>
                    <td><button class="btn btn-secondary" onclick="visit( '${arr[i].url}')">Visit</button></td>
                    <td><button class="btn btn-danger" onclick="del(${i})">Delete</button></td>
                </tr>
            `;
        }
        bod.innerHTML = cartona;
    }

    function del(num) {
        arr.splice(num, 1);
        localStorage.setItem("arr", JSON.stringify(arr));
        displayInPage();
    }

    function visit( url) {
        window.open(url, '_blank');
        console.log(url);
    }