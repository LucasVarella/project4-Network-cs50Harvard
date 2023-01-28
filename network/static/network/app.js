document.addEventListener('DOMContentLoaded', function(){

    if (document.querySelector("#show-newpost") != undefined){
        document.querySelector("#show-newpost").style.display = 'none';
        document.querySelector("#show-newpost-btn").addEventListener('click', () => showNewPost());
    }
    
    if (document.querySelector("#send-post") != undefined){
        document.querySelector("form").onsubmit = function(){
            sendPost()
            return false;
        }    
    }

    if (document.querySelector("#follow-btn") != undefined){
        document.querySelector("#follow-btn").addEventListener('click', () => followUser());
    }

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


function sendPost() {

    const content = document.querySelector("#content-post").value;
    console.log(content);

    if (!content.trim()){
       console.log('empty');
    }else{
        fetch('/newpost', {
            method: 'POST',
            body: JSON.stringify({
                content: content
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            const hr = document.createElement('hr');
            document.querySelector("#allposts-div").append(hr);

            const divPost = document.createElement('div');
            divPost.setAttribute('class','box w-100 d-inline-flex p-2 flex-row align-items-center');
            const infosPost = document.createElement('div');
            infosPost.setAttribute('class', 'infos-post');
            divPost.append(infosPost);
            const postLogo = document.createElement('div');
            postLogo.setAttribute('id', 'post-logo');
            infosPost.append(postLogo);
            const avatar = document.createElement('img');
            avatar.setAttribute('src', `${result.user}`);
            postLogo.append(avatar);
            const divContent = document.createElement('div');
            divContent.setAttribute('class', 'post-content pl-3');
            divContent.innerHTML = content;
            divPost.append(divContent);
            document.querySelector("#allposts-div").append(divPost);
            
            document.querySelector("#allposts-div").append(hr);
            document.querySelector('textarea').value = "";
        });
    }
    
    
    
}

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