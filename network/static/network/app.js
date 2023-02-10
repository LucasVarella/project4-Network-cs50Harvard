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

    if (document.querySelector(".edit-icon") != undefined){
        
        document.querySelectorAll(".edit-icon").forEach(function(icon){
            icon.onclick = function(e){
                const element = this.parentElement;
                editPost(element);
            }
        });
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

            const divBox = document.createElement('div');
            divBox.setAttribute('class','box w-100 d-inline-flex flex-column align-items-center');


                const divEdit = document.createElement('div');
                divEdit.setAttribute('class', 'edit w-100');
                const iconEdit = document.createElement('i');
                iconEdit.setAttribute('class', 'edit-icon material-icons material-symbols-outlined md-24');
                iconEdit.innerHTML = 'edit_note';
                divEdit.append(iconEdit);
                divEdit.onclick = editPost;
            divBox.append(divEdit);


                const divPost = document.createElement('div');
                divPost.setAttribute('class', 'w-100 d-inline-flex p-2 flex-row align-items-center')

                    const linkProfile = document.createElement('a');
                    linkProfile.setAttribute('href', `/profile/${result.user_name}`);

                        const infosPost = document.createElement('div');
                        infosPost.setAttribute('class', 'infos-post');
                    
                            const postLogo = document.createElement('div');
                            postLogo.setAttribute('id', 'post-logo');
                    
                                const avatar = document.createElement('img');
                                avatar.setAttribute('src', `${result.user_img}`);
                            postLogo.append(avatar);

                            const userName = document.createElement('span');
                            userName.innerHTML = `${result.user_name}`;
                        infosPost.append(postLogo);
                        infosPost.append(userName);

                    linkProfile.append(infosPost);
                divPost.append(linkProfile);
                
                    const divContent = document.createElement('div');
                    divContent.setAttribute('class', 'post-content pl-3');
                    divContent.innerHTML = content;
                divPost.append(divContent);
            
            divBox.append(divPost);
            document.querySelector("#allposts-div").append(divBox);
            
            document.querySelector("#allposts-div").append(hr);
            document.querySelector('textarea').value = "";
        });
    }  
    
}

function editPost(element){
    console.log(element);
    document.querySelector('#show-newpost').style.display = 'none';
    
    const id = element.parentElement;
    const div = id.children[1];
    const content = div.children[1];
    console.log(id.dataset.id);
    console.log(content);
    const textarea = document.createElement('textarea');
    textarea.setAttribute('maxlength', 320);
    textarea.value = content.innerHTML.trim();
    content.remove();
    div.append(textarea);
   
    divBtn = document.createElement('div');
    divBtn.setAttribute('class', 'w-100 pt-2');
    btn = document.createElement('button');
    btn.setAttribute('class', 'confirm-edit btn btn-outline-primary');
    btn.innerHTML = 'Confirm';
    divBtn.append(btn);
    divBtn.style.textAlign = 'right';
    id.append(divBtn);
    
    element.remove();
    const divClose = document.createElement('div');
    divClose.setAttribute('class','edit w-100');
    const iconClose = document.createElement('i');
    iconClose.setAttribute('class','closeedit-icon material-icons material-symbols-outlined md-24');
    iconClose.innerHTML = 'cancel';
    divClose.append(iconClose);
    id.insertBefore(divClose, id.children[0]);
    
    document.querySelectorAll(".closeedit-icon").forEach(function(icon){
        icon.onclick = function(){
            const divText = id.children[1];
            const text = divText.children[1];
            text.remove();
            id.children[0].remove();
            id.children[1].remove();
            id.insertBefore(element, id.children[0]);
            id.children[1].append(content);
            
        }
    });
    
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

