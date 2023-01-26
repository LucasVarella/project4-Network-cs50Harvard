document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#show-newpost").style.display = 'none';
    document.querySelector("#show-newpost-btn").addEventListener('click', () => showNewPost());
  
});


function showNewPost() {
    var x = document.getElementById("show-newpost");
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById("newpost-icon").innerHTML = "cancel";
    } else {
        x.style.display = "none";
        document.getElementById("newpost-icon").innerHTML = "add_circle";
    }
}
