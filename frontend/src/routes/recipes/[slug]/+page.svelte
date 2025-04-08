<script lang="ts">
	// /** @type {import('./$types').PageProps} */
	// let { data } = $props();
	// export let data;
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	import { onMount } from 'svelte';
	import RecipeReview from '$lib/components/RecipeReview.svelte';
	import Cookies from 'js-cookie';
	import toast, { Toaster } from 'svelte-french-toast';

  import IngredientObject from '../../submit_recipe/+page.svelte';

	// for editing logic
	let is_editing = $state(false);
	let currentIngredient;
	let ingredientQuantity = 0;

	let recipe;
	let retrievedRecipe;
	let recipeName: String = $state('');
	let recipePrice: Number = $state(0);
	let recipeInstructions: String = $state('');
  
	let ingredients = $state<IngredientObject[]>([]);
  let ingredientsDb = $state<IngredientObject[]>([])

	// reviews
	let reviewString = $state('');
	let reviewRating = $state(0);

	let recipeReviewList: any[] = $state([]);

	let user_id: String | undefined;

	// onstart
	onMount(async () => {
		fetchRecipeReviews();
		user_id = Cookies.get('user_id');
    fetchIngredients();
	});

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
			retrievedRecipe = recipe[0];
			recipeName = retrievedRecipe.recipeName;
			ingredients = retrievedRecipe.ingredients;
      console.log("ingredients: " + ingredients)
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
			body: JSON.stringify({
				reviewRating: reviewRating,
				reviewString: reviewString,
				recipeId: data.id,
				reviewerId: user_id
			})
		});

		if (response.ok) {
			toast.success('review post succesful');
			location.reload();
			console.log('Review post successful');
			return;
		} else {
			toast.error('review post fail');
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
			body: JSON.stringify({ recipeId: data.id })
		});

		recipeReviewList = await response.json();

		if (response.ok) {
			console.log('Review fetch successful');
			return;
		} else {
			console.log('Review fetch fail');
		}
	}

  async function fetchIngredients() {
		console.log(recipeName);
		try {
			const response = await fetch('http://127.0.0.1:8000/api/recipes/get_ingredients/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = await response.json();
      
			if (data.hasOwnProperty('error')) {
				toast.error('No recipes found');
			}
      else {
				const result = data;
				ingredientsDb = result.map((val: IngredientObject) => {
					return { id: val.id, ingredientName: val.ingredientName };
				});
				// console.log(ingredientsDb);
			}
		} catch {
			toast.error('No database connection');
		}
	}

	async function handleRecipeEdit() {
		console.log("RECIPE EDIT")
	}

	console.log(data.id);
	functionFetchRecipeById(data.id);
  
	function removeIngredient(ingredient: IngredientObject): any {
		throw new Error('Function not implemented.');
	}
</script>

<Toaster />

<div class="mb-10">
	<h1 class="text-4xl font-bold">
		{recipeName}
	</h1>
	<button
    class="text-blue-600"
    onclick={() => is_editing = !is_editing}
  >Edit Recipe</button>
</div>

<div class="my-5">
	<h1 class="text-xl font-bold">
    Ingredients
  </h1>

  {#if !is_editing}
    <ul class="list-disc">
      {#each ingredients as ingredient}
        <li class="ml-5">
          {ingredientsDb[ingredient.ingredientId].ingredientName}
        </li>
      {/each}
    </ul>
  {/if}

	{#if is_editing}
		{#each ingredients as ingredient}
			<li class="flex items-center align-text-bottom">
				<!-- <p class="pr-4">{ingredient.ingredientName}</p>-->
				<!-- <input
					id="ingredientName"
					type="text"
					class="small-text-field"
					value={ingredientsDb[ingredient.ingredientId].ingredientName}
				/> -->
        <select
							class="block w-max appearance-none rounded border border-gray-200 bg-gray-200 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-zinc-100 focus:outline-none"
							value={ingredientsDb[ingredient.ingredientId]}
						>
							{#each ingredientsDb as ingredient}
								<option value={ingredient}> {ingredient.ingredientName} </option>
							{/each}
						</select>
				<input
					id="ingredientQuantity"
					type="number"
					class="small-text-field w-10 ml-1"
					value={ingredient.quantity}
				/>
				<button
					type="button"
					class="py-0.3 mb-2 me-2 rounded-full bg-red-700 px-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
					onclick={() => removeIngredient(ingredient)}
        >x</button>
			</li>
		{/each}
	{/if}
</div>

<div class="my-5">
	<h1 class="text-xl font-bold">Instructions</h1>
	{#if is_editing}
		<input type="text" bind:value={recipeInstructions}>
	{:else}
		<p>{recipeInstructions}</p>
	{/if}
</div>


{#if is_editing}
  <button
    class="bg-main hover:bg-main_dark my-5 rounded px-4 py-2 font-bold text-white"
    onclick={handleRecipeEdit}
  >Apply changes</button>
  <!-- REVIEW SECTION -->
{:else} 
  <div class="my-5">
    <h1 class="text-xl font-bold">
      Leave a review
    </h1>
    <textarea class="my-3 block w-full p-2.5" bind:value={reviewString}></textarea>
    <input
      class="block"
      type="number"
      bind:value={ reviewRating }
    />
    <button
      class="bg-main hover:bg-main_dark my-5 rounded px-4 py-2 font-bold text-white"
      onclick={ postReview }
    >Submit review</button>
  </div>

  <hr />

  <div class="mt-5">
    <h1 class="text-xl font-bold">Reviews</h1>
    {#each recipeReviewList as recipeReview}
      <RecipeReview {recipeReview} />
      <!-- <p>{recipeReview.reviewString}</p> -->
    {/each}
  </div>
{/if}