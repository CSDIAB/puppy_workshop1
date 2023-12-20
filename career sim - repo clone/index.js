
const API = "https://fsa-puppy-bowl.herokuapp.com/api/2309-ftb-et-am/players";

/** Where we keep all of our current data: "application state" */
const state = {
  puppies : [],
  // If this is null, that means nothing is selected
  // If there is something here, well that's the selected recipe
  selectedPuppy: null,
};

/*
1. Get recipes from the API
2. Rendering all the recipes from the API
3. Allow a user to click on an recipe to select it
  When a recipe is selected, we should see only that recipe.
4. Persist the link to that specific recipe so that it stays on refresh
*/

/** Pull all recipes from API and put them in state */
const getPuppies = async () => {
  try {
    const response = await fetch(API + "/puppies");
    const json = await response.json();
    state.puppies = json.data;
  } catch (error) {
    console.error(error);
  }
};

/** Renders data from state onto the page */
const renderPuppies = async () => {
  await getPuppies();

  // We need to map over the recipes in our state
  // And transform each recipe object into a DOM element
  const $puppies = document.querySelector("ul.puppies");

  const $puppyListItems = state.puppies.map((puppy) => {
    const li = document.createElement("li");
    li.innerHTML = `<h2>${puppy.name}</h2>`;

    /** Set selected recipe in state & do the hash change */
    li.addEventListener("click", () => {
      state.selectedPuppy = puppy;
      render();
      window.location.hash = puppy.id;
    });

    return li;
  });

  $puppies.replaceChildren(...$puppyListItems);
};

// 3: Selecting a single recipe
// Add an event listener to allow the user to select a recipe
// Save in state which recipe was selected
// Render the details of a recipe if it is selected

/** Renders data from individual selected recipe onto the page */
const renderPuppy = () => {
  const $puppies = document.querySelector("ul.puppies");
  $puppies.innerHTML = `
    <li>
    <h2>${state.selectedPuppy.name}</h2>
    <img src="${state.selectedPuppy.imageUrl}">
    <p>${state.selectedPuppy.description}</p>
    </li>
  `;

  /** Null the selected recipe & rerender */
  $puppies.querySelector("li").addEventListener("click", () => {
    state.selectedPuppy = null;
    render();
    window.location.hash = "";
  });
};

/** Render either all the recipes or just one depending on state.selectedRecipe */
const render = () => {
  // If no recipe selected
  if (!state.selectedPuppy) {
    renderPuppies();
  } else {
    // See the details of a specific selected recipe
    renderPuppy();
  }
};

/** Look at the hash in the URL to set the selected recipe */
const loadPuppyFromHash = async () => {
  // When the hash changes, e.g. from #10 to #6
  // We need to select the recipe with id #6
  // But in order to select the recipe, we need recipes in state

  // Make sure there's data
  if (state.puppies.length === 0) {
    await getPuppies();
  }

  // Get the id from the hash
  const idFromHash = +window.location.hash.slice(1);

  // Find the recipe with that id
  state.selectedPuppy = state.puppies.find(
    (puppy) => puppy.id === idFromHash
  );

  render();
};

window.addEventListener("hashchange", loadPuppyFromHash);

/*
Problem:
We want to get & render the recipe as soon as the page loads,
but `getRecipes` needs `await` because we're talking over the internet to an API.
BUT JavaScript does not like "floating" `await`s, so we need to
getRecipes inside an `async` function.
Solution:
Let's put the get & render function calls in an async function.
A conventional name for a function that runs as soon as a page loads
is `init`, which is short for initialize.
`init` is conventionally only called once at the start.
*/
const init = async () => {
  loadPuppyFromHash();
};

init();

///// RECAP
/*
- Use state to store any data we get from the API
- Also use state to keep track of user interaction (did they select a recipe)
- Whenever state changes, we need to call render()
- In our render(): we need to generate HTML based on what's in state
- When we want to _persist_ data, we set it in our window.location.hash
  - When a recipe is selected, we set the ID in window.location.hash
- Use window.location.hash to update our state and rerender
  - When the hash has a recipe ID, we use that ID to set state.selectedRecipe
- We use an `init` function to organize what we want to happen when the page first loads
*/