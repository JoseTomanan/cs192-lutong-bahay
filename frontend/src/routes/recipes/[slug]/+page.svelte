<script lang="ts">
	// /** @type {import('./$types').PageProps} */
	// let { data } = $props();
	// export let data;
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	import { onMount } from 'svelte';
	import RecipeReview from '$lib/components/RecipeReview.svelte';
	import {isAdmin } from '$lib/stores/auth'
	import Cookies from 'js-cookie';
	

  import IngredientObject from '$lib/../routes/submit_recipe/+page.svelte';

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  interface IngredientUnit {
    ingredientId: number
    ingredientName: string
    quantity: number
    unit: string
  }

	// for editing logic
	let is_editing = $state(false);
	let currentIngredient;
	let ingredientQuantity = 0;

	let loading = false

	let recipe;
	let retrievedRecipe;
	let recipeId = $state(0);
	let recipeName: String = $state('');
	let cookDifficulty: String = $state('');
	let recipeEquipment: String = $state('');
	let recipeInstructions: String = $state('');
	let recipeServings = $state(0);
	let recipePrice = $state(0);  
	let recipeRating = $state(0);  
	let ingredients = $state<IngredientUnit[]>([]);
 	let ingredientsDb = $state<IngredientObject[]>([])

	// reviews
	let reviewString = $state('');
	let reviewRating = $state(0);

	let recipeReviewList: any[] = $state([]);

	let user_id: String | undefined;

	let csrfToken = '';

	// onstart
	onMount(async () => {
		fetchRecipeReviews();
		user_id = Cookies.get('user_id');
    	fetchIngredients();
		functionFetchRecipeById(data.id);

		await fetch(`${baseUrl}/api/users/csrf/`, {
		method: "GET",
		credentials: "include",
		}).then(res => res.json())
		.then(data => {
			csrfToken = data.csrfToken;
		});
	});

	async function functionFetchRecipeById(input_id: String) {
		console.log(input_id);
		const response = await fetch(`${baseUrl}/api/recipes/get_recipe_by_id/`, {
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
			recipeId = retrievedRecipe.id;
			recipeName = retrievedRecipe.recipeName;
			ingredients = retrievedRecipe.ingredients;
			cookDifficulty = retrievedRecipe.cookDifficulty;
			recipeEquipment = retrievedRecipe.equipment;
      		// console.log("ingredients: " + ingredients)
			recipeInstructions = retrievedRecipe.instructions;
			recipeServings = retrievedRecipe.servings;
			recipePrice = retrievedRecipe.price;
			recipeRating = retrievedRecipe.ratings;
			// goto('dbtest');
			return;
		} else {
			console.log('Recipe fetch fail');
		}
	}

	async function postReview() {
		const response = await fetch(`${baseUrl}/api/reviews/post-review/`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				// 'X-CSRFToken': csrfToken,
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
			alert('review post succesful');
			fetchRecipeReviews()
			location.reload()
			console.log('Review post successful');
			return;
		} else {
			alert('review post fail');
			console.log('Review post fail');
		}
	}

	async function fetchRecipeReviews() {
		const response = await fetch(`${baseUrl}/api/reviews/fetch-reviews/`, {
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
			const response = await fetch(`${baseUrl}/api/recipes/get_ingredients/`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = await response.json();
      
			if (data.hasOwnProperty('error')) {
				alert('No recipes found');
			}
      else {
				const result = data;
				ingredientsDb = result.map((val: IngredientObject) => {
					return { id: val.id, ingredientName: val.ingredientName };
				});
				// console.log(ingredientsDb);
			}
		} catch {
			alert('No database connection');
		}
	}

	async function handleRecipeEdit() {
		console.log("RECIPE EDIT")
		console.log(ingredients)

		if (!$isAdmin) {
			alert('No admin privileges');
			is_editing = !is_editing
			return
		}

		const response = await fetch(`${baseUrl}/api/recipes/update-recipe-from-page/`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				recipe: {
					// recipeId: data.id,
					recipeId: recipeId,
					recipeName: recipeName,
					cookDifficulty: cookDifficulty,
					equipment: recipeEquipment,
					// ingredients: ingredients,
					// console.log("ingredients: " + ingredients)
					instructions: recipeInstructions,
					servings: recipeServings,
					price: recipePrice,
					ratings: recipeRating
			// goto('dbtest');
				},
				ingredients: ingredients
			})
		});

		if (response.ok) {
			alert('Recipe update succesful');
			location.reload();
			console.log('Recipe update successful');
			return;
		} else {
			alert('Recipe update fail');
			console.log('Recipe update fail');
		}
	}

	async function saveRecipe() {
		// alert(`${user_id} ${recipeId}`)
		try {
			const response = await fetch(`${baseUrl}/api/savedby/user-save-recipe/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"userId": user_id,
					"recipeId": recipeId
				})
			})

			alert("Recipe saved succesfully!")
		} 
		
		catch {
			alert("Failed to save recipe.")
		}
	}

	async function unsaveRecipe() {
		// alert(`${user_id} ${recipeId}`)
		try {
			const response = await fetch(`${baseUrl}/api/savedby/user-unsave-recipe/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"userId": user_id,
					"recipeId": recipeId
				})
			})

			alert("Recipe unsaved succesfully!")
		} 
		
		catch {
			alert("Failed to unsave recipe.")
		}
	}

	const removeIngredient = (ingredient: IngredientUnit) => {
		ingredients = ingredients.filter(
        (i) => i.ingredientName !== ingredient.ingredientName
      );
	};

	const addIngredient = () => {
		ingredients = [
        ...ingredients,
        {ingredientId: -1, ingredientName: "", quantity: 0, unit: ""}
		];
	};

	console.log(data.id);

// 	functionFetchRecipeById(data.id); s

</script>

<!-- Recipe Heading Div -->
<div class="mb-10 space-y-4">
	{#if !is_editing}
    <div class="flex space-x-2">
      <a
        href="/recipes"
        aria-label="back"
      >
        <svg
          class="w-8 h-10 fill-gray-700 hover:fill-gray-500 hover:ring-1"
          width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <rect transform="rotate(90 12 12)" opacity="0"/>
          <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"/>
        </svg>
      </a>

      <h1 class="text-4xl font-bold">
        {recipeName}
      </h1>

      {#if $isAdmin}
        <button
          class="bg-zinc-200 hover:bg-zinc-300 px-3 text-blue-600 rounded"
          onclick={() => is_editing = !is_editing}
        >Edit</button>
      {/if}
    </div>
    
    <div class="flex">
      <div class="w-20 mr-5">
        <label
          for=""
          class="for-small-field"
        >Difficulty</label>
        <p>{cookDifficulty}</p>
      </div>
      <div class="w-20 mr-5">
        <label
          for=""
          class="for-small-field"
        >Servings</label>
        <p>{recipeServings}</p>
      </div>
      <div class="w-20 mr-5">
        <label
          for=""
          class="for-small-field"
        >Price</label>
        <p>{recipePrice}</p>
      </div>
      <div class="w-20 mr-5">
        <label
          for=""
          class="for-small-field"
        >Rating</label>
        <p>{recipeRating}</p>
      </div>
    </div>
	{:else}
		<div class="flex">
			<input
        class="text-4xl font-bold border-gray-200 bg-gray-200 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none rounded"
        bind:value={recipeName}
      />
			<button
				class="bg-zinc-200 hover:bg-zinc-300 ml-2 px-2 text-blue-600 rounded"
				onclick={() => is_editing = !is_editing}
      >Edit</button>
		</div>

		<div class="flex">
			<div class="w-20 mr-5">
				<label
          for=""
          class="for-small-field"
        >Difficulty</label>
				<input
          class="small-text-field w-full"
				  bind:value={cookDifficulty}
        />
			</div>
			<div class="w-20 mr-5">
				<label
          for=""
          class="for-small-field"
        >Servings</label>
				<input
          class="small-text-field w-full"
				  bind:value={recipeServings}
        />
			</div>
			<div class="w-20 mr-5">
				<label
          for=""
          class="for-small-field"
        >Price</label>
				<input
          class="small-text-field w-full"
				  bind:value={recipePrice}
        />
			</div>

			<div class="w-20 mr-5">
				<label
          for=""
          class="for-small-field"
        >Rating</label>
				<input class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-zinc-100 focus:outline-none"
				bind:value={recipeRating}/>
			</div>
		</div>
	{/if}
</div>


<div class="my-5">
	<h1 class="text-xl font-bold">
    	Ingredients
	</h1>

  {#if !is_editing}
    <ul class="list-disc">
      {#each ingredients as ingredient}
        <li class="ml-5">
          {ingredient.quantity}{ingredient.unit} {ingredient.ingredientName}
        </li>
      {/each}
    </ul>
  {/if}

	{#if is_editing}
		{#each ingredients as ingredient, i}
			<li class="flex items-center align-text-bottom">
				<!-- <p class="pr-4">{ingredient.ingredientName}</p>-->
				<!-- <input
					id="ingredientName"
					type="text"
					class="small-text-field"
					value={ingredientsDb[ingredient.ingredientId].ingredientName}
				/> -->
				{console.log(ingredient.ingredientName)}
       			<select
					class="block w-max appearance-none rounded border border-gray-200 bg-gray-200 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-zinc-100 focus:outline-none"
					bind:value={ingredients[i].ingredientId}
					>
					{#each ingredientsDb as ingredient}
						<option value={ingredient.id}> {ingredient.ingredientName} </option>
					{/each}
				</select>
				<input
					id="ingredientQuantity"
					type="number"
					class="small-text-field w-10 ml-1"
					bind:value={ingredient.quantity}
				/>
				<select
					class="block ml-1 w-max appearance-none rounded border border-gray-200 bg-gray-200 px-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-zinc-100 focus:outline-none"
					bind:value={ingredient.unit}
				>
					<option value="pcs"> pcs </option>
					<option value="g"> g </option>
					<option value="oz"> oz </option>
					<option value="lols"> lols </option>
				</select>
				<button
					type="button"
					class="remove-item"
					onclick={() => removeIngredient(ingredient)}
        >x</button>
			</li>
		{/each}
		<button
		  class="add-item"
		  onclick={addIngredient}>+</button
		>
	{/if}
</div>

<div class="my-5">
	<h1 class="text-xl font-bold">Instructions</h1>
	{#if is_editing}
		<textarea
      class="w-full p-2.5"
      placeholder="Instructions..."
      bind:value={recipeInstructions}
    ></textarea>
	{:else}
		<p class="whitespace-pre-wrap">{recipeInstructions}</p>
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
    <textarea
      class="my-3 block w-full p-2.5"
      bind:value={reviewString}
    ></textarea>
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

  <button
      class="bg-main hover:bg-main_dark my-5 rounded px-4 py-2 font-bold text-white"
      onclick={ saveRecipe }
>Save Recipe</button> 
  <button
      class="bg-main hover:bg-main_dark my-5 rounded px-4 py-2 font-bold text-white"
      onclick={ unsaveRecipe }
>Unsave Recipe</button> 

  <hr />

  <div class="mt-5">
    <h1 class="text-xl font-bold">Reviews</h1>
    {#each recipeReviewList as recipeReview}
      <RecipeReview {recipeReview} />
      <!-- <p>{recipeReview.reviewString}</p> -->
    {/each}
  </div>
{/if}