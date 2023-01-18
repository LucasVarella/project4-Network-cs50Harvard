
function Navigation(){

    document.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
    
            choosePage(a.dataset.page);
                  
        })
    });
}


function choosePage(page){  

    if (page === "profile"){
        fetch("/getuser")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data != undefined){
                return ReactDOM.render(<Profile user={data}/>, document.getElementById('page'));
            }else{
                return (<h1>Make login</h1>)
            }
        })
        .catch(error => console.log("Error:", error));
    }

    if (page === "foryou"){
        return ReactDOM.render(<ForYou/>, document.getElementById('page'));
    }

    if (page === "following"){
        return ReactDOM.render(<Following/>, document.getElementById('page'));
    }

    const div_page = document.querySelector('#page');
    div_page.style.animationPlayState = 'running';
    div_page.addEventListener('animationend', () =>{ 
        
    })

}

function Profile(props){
    return (
        <div id="profile">
            <div class="d-inline-flex p-2 flex-row justify-content-evenly align-items-center w-100">
                
                <div id="profile-logo">
                    <img src={props.user.img_url}/>
                </div>

                <div id="profile-infos">
                    <div class="d-inline-flex flex-row justify-content-start align-items-center w-100 pb-3">
                        <div class="pr-5">
                            <b> @ {props.user.user} </b>
                        </div>
                        <div class="pr-5">
                            Following: {props.user.qtd_following}
                        </div>
                        <div class="pr-5">
                            Followers: {props.user.qtd_followers}
                        </div>
                    </div>
                    <div class="d-inline-flex w-100 justify-content-start">
                        {props.user.biography}
                    </div>
                </div>

            </div>
            
            <hr></hr>
            <div>
                <NewPost url={props.user.img_url} user={props.user.user}/>
            </div>
        </div>
    );
}

function ForYou(props){
    return (
        <div id="foryou">
            Yes, ForYou
        </div>
    );
}

function Following(props){
    return (
        <div id="following">
            Yes, Following
        </div>
    );
}

function Post(props){
    return (
        <div class="post">
            <div class="d-inline-flex p-2 flex-row align-items-center">
                <div id="post-logo"><img src="https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg"/></div>
                <span class="pl-3">@</span>
            </div>
            <div class="post-content">
                Teste conteudo
            </div>
        </div>
    )
}

function NewPost(props){

    return (
        <form id="form-post">
            <div class="post">
                <div class="d-inline-flex p-2 flex-row align-items-center">
                    <div id="post-logo"><img src={props.url}/></div>
                    <span class="pl-3">@{props.user}</span>
                </div>
                <div class="post-content">
                <textarea placeholder="Describe yourself here..."></textarea>
                </div>
            </div>
        </form>
    );
    
}

Navigation();
ReactDOM.render(<ForYou/>, document.getElementById('page'));


