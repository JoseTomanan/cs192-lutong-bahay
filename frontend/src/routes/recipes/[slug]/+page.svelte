<script lang="ts">
    // /** @type {import('./$types').PageProps} */
	// let { data } = $props();
    export let data;

    let recipe;
    let recipeTitle: String;
	let retrievedRecipe;

    async function functionFetchRecipeById(input_id: String) {
		console.log(input_id);
		const response = await fetch('http://127.0.0.1:8000/api/recipes/get_recipe_by_id/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: input_id })
		});

		recipe = await response.json();
		console.log(recipe);

		if (response.ok) {
			console.log('Recipe fetch successful');
            retrievedRecipe = recipe[0]
            recipeTitle = retrievedRecipe.recipeName;
			// goto('dbtest');
			return;
		} else {
			console.log('Recipe fetch fail');
		}
  }

console.log(data.id);
functionFetchRecipeById(data.id);
</script>

<h1>Recipe title: {recipeTitle}</h1>
<!-- <p>Ingredients: {recipe.ingredients}</p>
<h1>Recipe name: {recipeName}</h1>
<h1>Ingredients:</h1> -->