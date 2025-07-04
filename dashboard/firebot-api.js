const api_url = 'http://localhost:7472/api/v1';


function requestGET(endpoint){
    return fetch(
        api_url + endpoint,
        {method: "GET"}
    )
    .then((response) => response.json());
}

function createGrid(){
    const current_window = document.getElementById("current-window");
    const columns = 5;
    let columns_arg = "";
    for(i = 0; i < columns; i++){
        columns_arg = columns_arg + "1fr ";
    }

    current_window.style.gridTemplateColumns = columns_arg;
    let effect_list = requestGET("/effects/preset/").then((json) => {

        console.log(json);



        for(i = 0; i < json.length; i++){
            let new_button = document.createElement("button");
            new_button.classList.add("dashboard-button");
            new_button.classList.add("truncate");
            new_button.textContent = json[i]["name"];
            new_button.dataset['idx'] = json[i]["id"];
            current_window.appendChild(new_button);
            
            new_button.addEventListener('click', function(event) {
                const id = event.currentTarget.dataset['idx'];
                requestGET("/effects/preset/" + id);
            });
            
        }
    });

}

function removeGrid(){
    const current_window = document.getElementById("current-window");
    while (current_window.firstChild){
        current_window.removeChild(current_window.firstChild);
    }
}

createGrid();
