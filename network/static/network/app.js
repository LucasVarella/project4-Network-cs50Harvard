document.addEventListener("DOMContentLoaded", function(){

    document.querySelectorAll(".send-post").forEach(function(button){
        button.onclick = () =>{
            const content = document.querySelector(".content-post").value;
            const csrf_token = document.querySelector("#csrf_token").value

            fetch('/newpost', {
                method: 'POST',
                body: JSON.stringify({
                    content: content
                    
                })
              })
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if (result.error){
                }else{
                }
              });

            
        }

    });
    
});