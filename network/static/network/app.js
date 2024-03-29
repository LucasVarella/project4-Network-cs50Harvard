let openEdit = false;

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
                const divEdit = this.parentElement;
                if (openEdit === false){
                    editPost(divEdit);
                }
                
            }
        });
    }

    document.addEventListener('click', event =>{
        const element = event.target;
        if (element.className.includes('like-icon')){
            like(element);
            
        }

    });


});


function showNewPost() {
    var x = document.getElementById("show-newpost");
    if (openEdit === false){
        if (x.style.display === "none") {
            x.style.display = "block";
            document.getElementById("newpost-icon").innerHTML = "cancel";
        } else {
            x.style.display = "none";
            document.getElementById("newpost-icon").innerHTML = "add_circle";
        }
    }
    
}


function sendPost() {

    const content = document.querySelector("#content-post").value;

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
            if( document.querySelector('.not-yet') != undefined){
                document.querySelector('.not-yet').remove();
            }
            const hr = document.createElement('hr');
            document.querySelector("#allposts-div").append(hr);

            const divBox = document.createElement('div');
            divBox.setAttribute('class','box w-100 d-inline-flex flex-column align-items-center');
            divBox.setAttribute('data-id', result.id);

                const divEdit = document.createElement('div');
                divEdit.setAttribute('class', 'edit w-100');
                const iconEdit = document.createElement('i');
                iconEdit.setAttribute('class', 'edit-icon material-icons material-symbols-outlined md-24');
                iconEdit.innerHTML = 'edit_note';
                const spanEdit = document.createElement('span');
                divEdit.append(spanEdit);
                divEdit.append(iconEdit);
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
                    const p = document.createElement('p')
                    p.innerHTML = content
                    divContent.append(p);
                divPost.append(divContent);
            
            divBox.append(divPost);

            const divLike = document.createElement('div');
            divLike.setAttribute('class', 'like w-100');
            const spanQtdLikes = document.createElement('span');
            spanQtdLikes.setAttribute('class', 'qtd_likes');
            const iFavorite = document.createElement('i');
            iFavorite.setAttribute('class', 'like-icon material-icons material-symbols-outlined md-24');
            iFavorite.innerHTML = "favorite"
            divLike.append(spanQtdLikes);
            divLike.append(iFavorite);

            divBox.append(divLike);

            const divDate = document.createElement('span');
            divDate.setAttribute('class', 'date-time');
            divDate.innerHTML = result.date_time;
            divBox.append(divDate);
            date_time = document.createElement('span');
            date_time.setAttribute('class', 'date-time')
            date_time.innerHTML = result.date_time;

            document.querySelector("#allposts-div").insertBefore(divBox, document.querySelector("#allposts-div").children[0]);
            
            document.querySelector("#allposts-div").insertBefore(hr, document.querySelector("#allposts-div").children[0]);
            document.querySelector('textarea').value = "";
            
            iconEdit.onclick = function(e){
                const divEdit = this.parentElement;
                if (openEdit === false){
                    editPost(divEdit);
                }
                
            }
            
        });
    }  
    
}

function editPost(divEdit){

    if ( document.querySelector('#show-newpost') != undefined){
        document.querySelector('#show-newpost').style.display = 'none';
        document.querySelector('#newpost-icon').innerHTML = 'add_circle';
    }
    
    const divPost = divEdit.parentElement;
    const divMid = divPost.children[1];
    const divLike = divPost.children[2];
    const divContent = divMid.children[1];
    const content = divContent.children[0].innerHTML;
    const divDate = divPost.children[3];
    divPost.style.border = '#033649 solid 1px';

    divEdit.remove();
    divContent.remove();
    divDate.remove();
    divLike.remove();

    const divEditClose = document.createElement('div');
    divEditClose.setAttribute('class','edit w-100');
    const iconClose = document.createElement('i');
    iconClose.setAttribute('class','closeedit-icon material-icons material-symbols-outlined md-24');
    iconClose.setAttribute('id', 'closeedit-icon');
    iconClose.innerHTML = 'cancel';
    divEditClose.append(iconClose);

    divPost.insertBefore(divEditClose, divPost.children[0]);

    const textarea = document.createElement('textarea');
    textarea.setAttribute('maxlength', 320);
    textarea.value = content.trim();

    divMid.append(textarea);

    divBtn = document.createElement('div');
    divBtn.setAttribute('class', 'w-100 pt-2');
    btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-outline-primary');
    btn.setAttribute('id','confirm-edit');
    btn.innerHTML = 'Confirm';
    divBtn.append(btn);
    divBtn.style.textAlign = 'right';
    divPost.append(divBtn)
    openEdit = true;
    
    document.addEventListener('click', event =>{
        const element = event.target;
        if (element.id ==='closeedit-icon'){
            divEditClose.remove();
            textarea.remove();
            divBtn.remove();

            divPost.style.border = '';
            divPost.insertBefore(divEdit, divPost.children[0]);
            divMid.append(divContent);
            divPost.append(divLike);
            divPost.append(divDate);
            openEdit = false;
            
        }

    });

    document.querySelector('#confirm-edit').onclick = function(){
        const editedText = textarea.value;
        
        const id = divPost.dataset.id;
        //fetch
        fetch(`/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                content: editedText
            })
        })
        .then(response => response.json())
        .then(result => {

        });

        divEditClose.remove();
        textarea.remove();
        divBtn.remove();
        
        span = divEdit.children[0];
        span.innerHTML = 'edited';
        
        divPost.style.border = '';
        divPost.insertBefore(divEdit, divPost.children[0]);
        divContent.children[0].innerHTML = editedText;
        divMid.append(divContent);
        divPost.append(divLike);
        divPost.append(divDate);
        openEdit = false;
        
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

function like(element){
    const post_id = element.parentElement.parentElement.dataset.id;

    fetch(`/like/${post_id}`, {
        method: 'POST',
        body: JSON.stringify({

        })
        })
        .then(response => response.json())
        .then(result => {
            let qtd_likes = result.qtd_likes
            if (qtd_likes > 0){
                element.parentElement.children[0].innerHTML = qtd_likes
            }else{
                element.parentElement.children[0].innerHTML = ""
            }

        });

    if (element.className.includes('material-symbols-outlined')){
        element.setAttribute('class', 'like-icon material-icons material-symbols md-24')
        
    }else{

        element.setAttribute('class', 'like-icon material-icons material-symbols-outlined md-24')
    }
        
}