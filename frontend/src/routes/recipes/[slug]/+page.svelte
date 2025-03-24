<script lang="ts">
    // /** @type {import('./$types').PageProps} */
	// let { data } = $props();
    export let data;

    let recipe;
	let retrievedRecipe;
	let recipeName: String;
	let recipePrice: Number;
	let recipeInstructions: String;
	let ingredients: String[];

	// reviews
	let reviewString = ""
	let reviewRating = 0;

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
            recipeName = retrievedRecipe.recipeName;
			ingredients = retrievedRecipe.ingredients;
			recipePrice = retrievedRecipe.recipePrice;
			recipeInstructions = retrievedRecipe.instructions;
			// goto('dbtest');
			return;
		} else {
			console.log('Recipe fetch fail');
		}
  }

  async function postReview() {
	const response = await fetch('http://127.0.0.1:8000/api/reviews/post-review/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ reviewRating: reviewRating, reviewString: reviewString, recipeId: data.id })
		});

		if (response.ok) {
			console.log('Review post successful');
			return;
		} else {
			console.log('Review post fail');
		}
  }

console.log(data.id);
functionFetchRecipeById(data.id);
</script>

<h1>Recipe title: {recipeName}</h1>
<h1>Ingredients:</h1>
{#each ingredients as ingredient }
	<p>{ingredient}</p>
{/each}
<h1>Instructions</h1>
<p>{recipeInstructions}</p>

<input type="text" bind:value={reviewString}>
<input type="number" bind:value={reviewRating}>
<button on:click={postReview}>Submit review</button>