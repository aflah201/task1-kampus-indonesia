document.addEventListener("DOMContentLoaded", function() {
    $(".dropdown-trigger").dropdown();

    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
});

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

                    var elems = document.querySelectorAll('.dropdown-trigger');
                    M.Dropdown.init(elems);
                    // muat konten halaman yang dipanggil
                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
        }
    };