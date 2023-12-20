//we need to call our API first
//const API = "https://fsa-puppy-bowl.herokuapp.com/api/2309-ftb-et-am/players "

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

function render(){
    
    span.innerHTML = puppies.length;
    const html = puppies.map(function(puppy){
       return `
        <li>
        ${puppy.name}
        </li>
       `;
    }).join('');
    list.innerHTML = html;
   
}

render();

async function fetchPuppies(){
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2309-ftb-et-am/players ")
    const json = await response.json();
    puppies = json.data.players;
    render();
   
};

fetchPuppies();




  //what exactly does try and catch do?