document.addEventListener("DOMContentLoaded", function() {
    var popup = document.getElementById("popup");
    var popupButton = document.getElementById("popupButton");
    var closeButton = document.getElementById("closeButton");

    popupButton.addEventListener("click", function() {
        popup.style.display = "block";
    });

    closeButton.addEventListener("click", function() {
        popup.style.display = "none";
    });
});

function afficher_popup(){

}

function cacher_popup(){
    
}
  