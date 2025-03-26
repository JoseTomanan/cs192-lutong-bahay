<script lang="ts">
    // /** @type {import('./$types').PageProps} */
	// let { data } = $props();
    export let data;
	import { onMount } from "svelte";
	import RecipeReview from '$lib/components/RecipeReview.svelte'
	import Cookies from "js-cookie"
	

    let recipe;
	let retrievedRecipe;
	let recipeName: String;
	let recipePrice: Number;
	let recipeInstructions: String;
	let ingredients: String[];

	// reviews
	let reviewString = ""
	let reviewRating = 0;

	let recipeReviewList: any[];

	let user_id: String | undefined;

	// onstart
	onMount(async () => {
		fetchRecipeReviews()
		user_id= Cookies.get("user_id")
		
	})

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
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ reviewRating: reviewRating, reviewString: reviewString, recipeId: data.id, reviewerId: user_id})
		});

		if (response.ok) {
			console.log('Review post successful');
			return;
		} else {
			console.log('Review post fail');
		}
  }

  async function fetchRecipeReviews() {
	const response = await fetch('http://127.0.0.1:8000/api/reviews/fetch-reviews/', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ recipeId: data.id})
		});

		recipeReviewList = await response.json()

		if (response.ok) {
			console.log('Review fetch successful');
			return;
		} else {
			console.log('Review fetch fail');
		}
  }

console.log(data.id);
functionFetchRecipeById(data.id);
</script>

<div class="mb-10">
	<h1 class="font-bold text-4xl">{recipeName}</h1>
</div>

<div class="my-5">
	<h1 class="font-bold text-xl">Ingredients</h1>
	<ul class="list-disc">
	{#each ingredients as ingredient }
		<li class="ml-5">{ingredient}</li>
	{/each}
	</ul>
</div>

<div class="my-5">
	<h1 class="font-bold text-xl">Instructions</h1>
	<p>{recipeInstructions}</p>
</div>

<div class="my-5">
	<h1 class="font-bold text-xl">Leave a review</h1>
	<textarea class="block p-2.5 w-full my-3" bind:value={reviewString}> </textarea>
	<input class="block" type="number" bind:value={reviewRating}>
	<button class="my-5 bg-lime-500 hover:bg-lime-700 py-2 px-4 rounded text-white font-bold" on:click={postReview}>Submit review</button>
</div>

<div class="mt-20">
<h1 class="font-bold text-xl">Reviews</h1>
{#each recipeReviewList as recipeReview}
	<RecipeReview recipeReview={recipeReview}/>
	<!-- <p>{recipeReview.reviewString}</p> -->
{/each}
</div>