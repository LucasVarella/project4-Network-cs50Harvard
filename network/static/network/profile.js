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
    
    document.querySelector("#follow-btn").addEventListener('click', () => followUser());

    
});


function followUser() {
    const id_profile = document.querySelector("#follow-btn").dataset.id;
    fetch('/following', {
        method: 'POST',
        body: JSON.stringify({
            id_profile: id_profile
            
        })
        })
        .then(response => response.json())
        .then(result => {
        console.log(result);
        document.querySelector("#span-followers").innerHTML = result["qtd_followers"];
        });

        const btn_status = document.querySelector("#follow-btn").innerHTML;
        const follow_btn = document.querySelector("#follow-btn");
        if (btn_status === "Follow"){
           follow_btn.innerHTML = "Unfollow";
           follow_btn.removeAttribute("class");
           follow_btn.setAttribute("class", "btn btn-outline-danger");

        }else{
            follow_btn.innerHTML = "Follow";
            follow_btn.removeAttribute("class");
            follow_btn.setAttribute("class", "btn btn-outline-primary");
        }

        
}
