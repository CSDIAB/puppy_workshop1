//we need to call our API first
const API = "https://fsa-puppy-bowl.herokuapp.com/api/2309-ftb-et-am/players "

//for review: what is state and why is it important 
//state is what is changing - what is the DATA and when do I get it
/*
1. get puppies from API
2. rendering all puppies from API 
3. Allow a user to click on a puppy to select it
*/
const span = document.querySelector('span');
let puppies = [];
const list = document.querySelector(".puppies");
console.log(list);

window.addEventListener('hashchange', function(){
    //console.log('change');
    render();
});


function render(){
    
    span.innerHTML = puppies.length;
    const hash = window.location.hash;
    const id = hash.slice(1)*1;
    let filtered = puppies;
    if(id){
        filtered = filtered.filter(function(puppy){
            return puppy.id === id;

        });
        console.log(id);
    }
    const html = filtered.map(function(puppy){
       return `
        <h2><a href = "#${puppy.id}">
        ${puppy.name}
        </a>
        </h2>
        <li>
        ${puppy.breed}
        </li>
        <em>
        ${puppy.status}
        </em>
        <img src = "${puppy.imageUrl}" />
    
       `;
    }).join('');
    list.innerHTML = html;
   
}

//Get ur images in on the render function!!!  ??

render();

async function fetchPuppies(){
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2309-ftb-et-am/players ")
    const json = await response.json();
    puppies = json.data.players;
    render();
   
};

fetchPuppies();




//what exactly does try and catch do?
//file:///C:/Users/robed/Coursework/career%20simulation/app.html#undefined