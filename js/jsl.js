function initialiseView() {
    // alert("initialiseView()");

    const header = document.getElementsByTagName("header")[0];
    const main = document.querySelector("main");
    const view = header.querySelector("header .view"); //query selector reagiert auf css elemente
    const list_view = header.querySelector("header .list_view"); //query selector reagiert auf css elemente
    const refresh = document.querySelector("footer .refresh"); //query selector reagiert auf css elemente
    const ul = main.getElementsByTagName("ul")[0];
    const add = header.querySelector("button.add");
    const dialog = document.querySelector("dialog");
    const litemplate = document.querySelector("main ul li");
    // litemplate.parentNode.removeChild(litemplate); // ist die Entfernen Lösung für JSR Aufgabe2

    // switching views
    // header.onclick = () => {
    //     // alert("onclick!");
    //     // document.body.setAttribute("class", "tiles");
    //     document.body.classList.toggle("tiles");
    // };

    // fade in - fade out

    view.onclick = () => {
        main.classList.toggle("faded");
        view.classList.toggle("faded");
        setTimeout(() => {
            document.body.classList.toggle("tiles");
            main.classList.toggle("faded");
            view.classList.toggle("faded");
            view.classList.toggle("list_view")
            },2000);
        // main.addEventListener("transitionend", ontransitionend);
    }

    refresh.onclick = () => {
        main.classList.toggle("faded");
        // *** ertste Möglichkeit ***
        // setTimeout(() =>main.classList.toggle("faded"),2000);

        // *** zweite Möglichkeit ***
        setTimeout(() => {
            main.classList.toggle("faded")
            },2000);

        // *** dritte Möglichkeit ***
        // setTimeout(() => {
        //     main.classList.toggle("faded")},5000);
        //

        // reload statt refresh durch löschen der Liste und Neuaufruf
        // entweder durch - Soll nicht verwendet werden
        // window.location.reload();

        // oder 2.
        // while (ul.firstChild){
        //     ul.removeChild(ul.firstChild);
        // }

        // oder 3.
        ul.innerHTML = "";
        setTimeout(() => {
            main.classList.toggle("faded")
        },500);
    // hier kommt der Listenaufruf

    }

    function ontransitionend() {
        main.classList.toggle("faded");
        main.removeEventListener("transitionend", ontransitionend);
    }

    // list items selection
    var litems = main.getElementsByTagName("li");
    for (var i = 0; i < litems.length; i++) {
        let currentli = litems[i];
        currentli.onclick = (evt) => {
            if (evt.target !== getLiOption(currentli)) {
            alert("Click on: " + evt.target + " with title: '" + getLiTitle(currentli));
            // Event target evt.target gibt an auf welchem Element das Event (z.B. der click) tatsächlich stattgefunden hat
            }
            else {
                alert("Click on: " + evt.target + " with title: '" + getLiTitle(currentli) + "' and URL: '" + getLiSource(currentli) + "'");
            }
        }
    }

    // var litems = main.querySelectorAll("li");
    // litems.forEach(currentli => {
    //     currentli.onclick = (evt) => {
    //             alert("Select:" + getLiTitle(currentli) + "click on: " + evt.target);
    //         }
    // });

    // ul.onclick = (evt) => {
    //     var currentli = getCurrentli(evt.target);
    //     evt.target.classList.contains("dots");
    //     // alert("Selected: " + getLiTitle(currentli) +  ", click event on: " + evt.target);
    // }

    function getCurrentli(el) {
        if (el.tagName == "LI") {
            return el;
        }
        else if (el.tagName == "UL") {
            alert("Reached list root, and no LI has been found!")
        }
        else if (el.parentNode) {
            return getCurrentli(el.parentNode);
        }
        else {
            alert("Something went completely wrong!");
        }
    }

    function getLiTitle(li) {
        return li.getElementsByClassName("title_name")[0].textContent;
    }
    function getLiSource(li) {
        return li.getElementsByClassName("source-site")[0].textContent;
    }
    function getLiOption(li) {
        return li.getElementsByClassName("dots")[0];
    }


    // add new elements
    add.onclick = (evt) => {
        evt.stopPropagation(); // unterbindet das Wandern durch den Baum
        addLiElementToList({title: "New Element:" + Date.now(),src:"http:///placeimg.com/150/200/any" })
       // alert("add new element");
    }

    function addLiElementToList(obj){
        // alert("add new element for: " + JSON.stringify(obj));
        console.log("add new element for: " + JSON.stringify(obj)); // z.B. für Troubleshooting
//
//         // Möglichkeit 1:
//         // ul.innerHTML = ul.innerHTML + "<li><img alt class=\"align-left\" src=\"" + obj.src + "\"/><span class='title_name'>" + obj.title + "</span> </li>";
//
//         // Möglichkeit 2:
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.classList.add("align-left");
        img.src = obj.src;
        li.appendChild(img);
// //
// // // *********   Frage statt <h2> habe ich <span class="titel_name"> ist das so umsetzbar? *************
//         var title_name = document.createElement("span class");
//         title_name.classList.add("align-left");
//         title_name.textContent = obj.title;
//         li.appendChild(title_name);
//         var button = document.createElement("button");
//         button.setAttribute("class", "imgbutton align-right edit-item");
//
//         // Möglichkeit 3:
//         var li = litemplate.cloneNode(true);
//         // li.hidden = false; // um die das kurze ein und ausblenden zu vermeiden
//         li.querySelector("img").src = obj.src;
//         li.querySelector("title_name").textContent = obj.title;
//
//         // Möglichkeit 4: hier ergänzt um die das kurze ein und ausblenden zu vermeiden
//         // var li = document.importNode(litemplate.content, true);
//         // li.querySelector("img").src = obj.src;
//         // li.querySelector("title_name").textContent = obj.title;
//
        ul.appendChild(li);
//
    }
    // Call-Back Funktion - alternativ dazu Promisses
    // xhr("GET","data/listitems.json", null, function (xhrobj) {
    //    alert("got data from server: " + xhrobj.responseText);
    //    var items = JSON.parse(xhrobj.responseText);
    //    console.log("got items: ", items);
    //    items.forEach(item => addLiElementToList(item));
    //     });

    // XHR Funktion, die ein Promise zurückliefert - lange Version
    //     var promise = xhr("GET","data/listitems.json", null);
    //     promise.then(function (xhrobj) {
    //         alert("got data from server: " + xhrobj.responseText);
    //         var items = JSON.parse(xhrobj.responseText);
    //         console.log("got items: ", items);
    //         items.forEach(item => addLiElementToList(item));
    // });

    // XHR Funktion, die ein Promise zurückliefert - kurze Version des Promise aufrufs
    //     xhr("GET","data/listitems.json", null).then(function (xhrobj) {
    //     alert("got data from server: " + xhrobj.responseText);  // dieser Zugriff ist nicht asynchron
    //     var items = JSON.parse(xhrobj.responseText);
    //     console.log("got items: ", items);
    //     items.forEach(item => addLiElementToList(item));
    // });

   // // lange Schreibweise promise2
   //  var promise1 = fetch("data/listitems.json");
   //  var promise2 = promise1.then(function (response) {
   //      response.text(); // auslesen von Inhalten funktioniert asynchron
   //  });
   //  promise2.then(function (txt) {
   //      alert("got data from server: " + txt);  // dieser Zugriff ist nicht asynchron
   //      var items = JSON.parse(txt);
   //      console.log("got items: ", items);
   //      items.forEach(item => addLiElementToList(item));
   //  });

    // kurze Schreibweise promise2, die übersichtlicher ist,
    //  um auf serverseitige Inhalte mittels HttpRequest zuzugreifen
    // fetch("data/listitems.json")
    //     .then(function (response) {
    //     response.text(); // auslesen von Inhalten funktioniert asynchron
    // })
    //     .then(function (txt) {
    //         alert("got data from server: " + txt);  // dieser Zugriff ist nicht asynchron
    //         var items = JSON.parse(txt);
    //         console.log("got items: ", items);
    //         items.forEach(item => addLiElementToList(item));
    // });

}

window.onload = initialiseView;