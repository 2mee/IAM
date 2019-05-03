function initialiseView() {
    // alert("initialiseView()");

    const header = document.getElementsByTagName("header")[0];
    const main = document.querySelector("main");
    const view = header.querySelector("header .view"); //query selector reagiert auf css elemente
    const refresh = document.querySelector("footer .refresh"); //query selector reagiert auf css elemente
    const ul = main.getElementsByTagName("ul");
    const add = header.querySelector("button");

    // switching views

    // header.onclick = () => {
    //     // alert("onclick!");
    //     // document.body.setAttribute("class", "tiles");
    //     document.body.classList.toggle("tiles");
    // };

    // fade in - fade out

    view.onclick = () => {
        main.classList.toggle("faded");
        setTimeout(() => {
            document.body.classList.toggle("tiles");
            main.classList.toggle("faded")
        },2000);
        main.addEventListener("transitionend", ontransitionend);
    };


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
        main.addEventListener("transitionend", ontransitionend);
    };

    function ontransitionend() {
        main.classList.toggle("faded");
        main.removeEventListener("transitionend", ontransitionend);
    }

    // list items selection
    // var litems = main.getElementsByTagName("li");
    // for (var i = 0; i < litems.length; i++) {
    //     let currentli = litems[i];
    //     currentli.onclick = (evt) => {
    //         alert("Select:" + getLiTitle(currentli) + "click on: " + evt.target);
            // Event target evt.target gibt an auf welchem Element das Event (z.B. der click) tatsächlich stattgefunden hat
    //     }
    // }

    // var litems = main.querySelectorAll("li");
    // litems.forEach(currentli => {
    //     currentli.onclick = (evt) => {
    //             alert("Select:" + getLiTitle(currentli) + "click on: " + evt.target);
    //         }
    // });

    ul.onclick = (evt) => {
        var currentli = getCurrentli(evt.target);
        evt.target.classList.contains("dots");
        alert("Selected: " + getLiTitle(currentli) +  ", click event on: " + evt.target);
    }

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

    // add new elements
    add.onclick = (evt) => {
        evt.stopPropagation(); // unterbindet das Wandern durch den Baum
        addLiElementToList({title: "New Element:" + Date.now(),src:"http:///placeimg.com/150/200/any" })
       // alert("add new element");
    }

    function addLiElementToList(obj){
        // alert("add new element for: " + JSON.stringify(obj));
        console.log("add new element for: " + JSON.stringify(obj)); // z.B. für Troubleshooting
        ul.innerHTML = ul.innerHTML + "<li><img alt class=\"align-left\" src=\"" + obj.src + "\"/><span class='title_name'>" + obj.title + "</span> </li>";
    }

}

window.onload = initialiseView;