document.addEventListener("DOMContentLoaded", function(){

    // document.querySelectorAll(".send-post").forEach(function(button){
    //     button.onclick = () =>{
    //         const content = document.querySelector(".content-post").value;
    //         const csrf_token = document.querySelector("#csrf_token").value

    //         fetch('/newpost', {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 content: content
                    
    //             })
    //           })
    //           .then(response => response.json())
    //           .then(result => {
    //             console.log(result);
    //             if (result.error){
    //             }else{
    //             }
    //           });

            
    //     }

    // });
    document.querySelector("#show-newpost").style.display = 'none';
    document.querySelector("#show-newpost-btn").addEventListener('click', () => showNewPost());
    
});


function showNewPost() {
    console.log('ok');
    var x = document.getElementById("show-newpost");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
