document.addEventListener("DOMContentLoaded", function () {
    // Activate sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    // // load page content
    // var page = window.location.hash.substr(1);
    // if (page == "") page = "index";
    // loadPage(page);
});

// function loadPage(page) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState === 4) {
//             var content = document.querySelector("#body-content");
//             if (this.status === 200) {
//                 content.innerHTML = xhttp.responseText;
//             } else if (this.status === 404) {
//                 content.innerHTML = "<p>Ups... Halaman sedang dalam perbaikan.</p>";
//             } else {
//                 content.innerHTML = "<p>Ups... Halaman tidak dapat diakses.</p>";
//             }
//         }
//     };
//     xhttp.open("GET", "pages/" + page + ".html", true);
//     xhttp.send();
// }

function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status !== 200) return;

            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(elm => elm.innerHTML = xhttp.responseText);

            // daftarkan event listener untuk setiap tautan
            document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
                elm.addEventListener("click", event => {
                    //   tutup sidenav
                    var sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    // muat konten halaman yang dipanggil
                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
        }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
}