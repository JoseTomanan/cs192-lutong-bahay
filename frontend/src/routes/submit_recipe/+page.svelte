<script lang="ts">
	import { onMount } from 'svelte';
	// let recipes = []
	// let recipeName = ''
	// let direction = 'ascending'
	// let is_negative = true
	// let sort= 'recipeName'

	let ingredientsDb: any[];

	let recipeName = '';
	let cookDifficulty = 3;
	let instructions = '';
	let servings = 1;
	let price = 50;

	let ingredients =
    [{
			ingredientObject: {id: 4, ingredientName: 'salt'},
			ingredientQuantity: 4
		}];
	let ingredientNames: string[] = ['salt'];
	let ingredientQuantity = 0;

	let currentIngredient = { id: 0, ingredientName: '' };

	let equipment = [
		{
			equipmentName: 'pan',
			equipmentQuantity: 1
		}
	];
	let equipmentName = '';
	let equipmentQuantity = 1;

	onMount(async () => {
		fetchIngredients();
	});

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
				alert('No recipes found');
			} else {
				const result = data;
				ingredientsDb = result.map((val: { id: any; ingredientName: any; }) => {
					return { id: val.id, ingredientName: val.ingredientName };
				});
				console.log(ingredientsDb);
			}
		} catch {
			alert('No database connection');
		}
	}

	async function submitRecipe() {
		let input = {
			recipeName: recipeName,
			cookDifficulty: cookDifficulty,
			equipment: equipment.toString(),
			instructions: instructions,
			servings: servings,
			price: price,
			ratings: 0
		};

		// console.log(JSON.stringify(input))
		// console.log(JSON.stringify(ingredients))

		try {
			const response = await fetch('http://127.0.0.1:8000/api/recipes/create_recipe/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify([input, ingredients])
			});

			const data = await response.json();
			if (data.hasOwnProperty('error')) {
				alert('No recipes found');
			} else {
				const result = data;
				// console.log(result)
			}
		} catch {
			alert('No database connection');
		}
	}

  async function handleAddRecipe() {
    let passableRecipe = {
        recipeName, cookDifficulty, servings, equipment,
        "ingredients": ingredientNames,
        instructions, price,
        "ratings": 0
      }

    try {
      const response = await fetch("http://localhost:8000/api/recipes/add-recipe/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(passableRecipe)
      });

      const data = await response.json();

      console.log(data)
  
      if (response['status'] == 200) {
        alert("Recipe added successfully!");
        recipeName = "";
        cookDifficulty = 3;
        price = 30;
        ingredientNames = [];
        equipment = [];
        servings = 0;
      }
      
      else
        alert(data.message || "Failed to add recipe.");

    } catch (err) {
      alert("Error connecting to the server.");
    }
  }

	// https://svelte.dev/playground/9983c53df057451db328b94553b88202?version=5.25.2
	const addIngredient = () => {
		ingredients = [
        ...ingredients,
        {ingredientObject: currentIngredient, ingredientQuantity}
		  ];

    ingredientNames = [
        ...ingredientNames,
        currentIngredient.ingredientName
      ]
		
    currentIngredient;
		ingredientQuantity = 0;
		console.log(ingredients);
	};

	const removeIngredient = (ingredient: { ingredientObject: { id: number; ingredientName: string; }; ingredientQuantity: number; }) => {
		ingredients = ingredients.filter(
        (i) => i.ingredientObject.ingredientName !== ingredient.ingredientObject.ingredientName
      );

    ingredientNames = ingredientNames.filter(
        (i) => !(ingredientNames.includes(i))
      )
	};

	const addEquipment = () => {
		equipment = [
			...equipment,
			{
				equipmentName,
				equipmentQuantity
			}
		];
		equipmentName = '';
		equipmentQuantity = 0;
	};

	const removeEquipment = (equipment_i: { equipmentName: string; equipmentQuantity: number; }) => {
		equipment = equipment.filter((i) => i !== equipment_i);
	};
</script>

<!-- FLOWBITE https://flowbite.com/docs/forms/search-input/ -->

<div class="flex gap-2">
	<div class="w-1/3 space-y-5">
		<!-- Recipe info -->
		<h1 class="text-lg font-bold">
      Set Recipe Info
    </h1>

		<!-- https://v1.tailwindcss.com/components/forms -->
		<form class="w-full max-w-lg">
			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="w-full px-3">
					<label
						class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
						for="recipeName"
          >Recipe name</label>
					<input
						id="recipeName"
						class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
						type="text"
						placeholder="Recipe name"
						bind:value={recipeName}
					/>
				</div>
			</div>

			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="mb-6 w-full px-3 md:mb-0 md:w-1/3">
					<label
						class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
						for="servings"
					>Servings</label>
					<input
						id="servings"
						class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
						type="text"
						placeholder="Servings"
						bind:value={servings}
					/>
				</div>

				<div class="w-full px-3 md:w-1/3">
					<label
						class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
						for="price"
					>Price</label>
					<input
						id="price"
						class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
						type="text"
						placeholder="Price"
						bind:value={price}
					/>
				</div>

				<div class="w-full px-3 md:w-1/3">
					<label
						class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
						for="cookDifficulty"
					>Difficulty</label>
					<input
						id="cookDifficulty"
						class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
						type="text"
						placeholder="Difficulty"
						bind:value={cookDifficulty}
					/>
				</div>
			</div>

			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="w-full px-3">
					<label
						class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
						for="instructions"
					>Instructions</label>
					<input
						id="instructions"
						class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
						type="text"
						placeholder="Instructions"
						bind:value={instructions}
					/>
				</div>
			</div>
		</form>

		<!-- Add to list of ingredients -->
		<div class="space-y-5">
			<form class="max-w-md" on:submit|preventDefault={addIngredient}>
				<h1 class="text-lg font-bold">Add Ingredients</h1>
				<div class="flex">
					<div>
						<label for="ingredientName">Ingredient</label>
						<!-- <input id="ingredientName" type="text" bind:value={ingredientName} /> -->
						<select
							class="block w-max appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-zinc-100 focus:outline-none"
							bind:value={currentIngredient}
						>
							{#each ingredientsDb as ingredient}
								<option value={ingredient}> {ingredient.ingredientName} </option>
							{/each}
						</select>
					</div>

					<div class="ml-5">
						<label for="ingredientQuantity">Quantity</label>
						<input
							id="ingredientQuantity"
							type="text"
							class="small-text-field block w-20 appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
							bind:value={ingredientQuantity}
						/>
					</div>
				</div>
				<input
					type="submit"
					value="Add Ingredient"
					class="submit-button my-4 rounded bg-zinc-100 px-5 py-4 hover:bg-lime-200"
				/>
			</form>

			<!-- Display ingredients -->
			<ul>
				<li class="flex items-center align-text-bottom">
					<p>ingredientName</p>
					<p class="pl-20">ingredientQuantity</p>
				</li>
				<!-- {#each ingredients as ingredient} -->
				{#each ingredients as ingredient}
					<li class="flex items-center align-text-bottom">
						<!-- <p class="pr-4">{ingredient.ingredientName}</p>-->
						<input
							id="ingredientName"
							type="text"
							class="small-text-field"
							bind:value={ingredient.ingredientObject.ingredientName}
						/>
						<input
							id="ingredientQuantity"
							type="text"
							class="small-text-field"
							bind:value={ingredient.ingredientQuantity}
						/>
						<button
							type="button"
							class="py-0.3 mb-2 me-2 rounded-full bg-red-700 px-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
							on:click={() => removeIngredient(ingredient)}>x</button
						>
					</li>
				{/each}
			</ul>

			<!-- Add to list of equipment -->
			<h1 class="text-lg font-bold">Add Equipment</h1>
			<form on:submit|preventDefault={addEquipment} class="max-w-md">
				<label for="equipmentName">Add equipment</label>
				<input id="equipmentName" type="text" class="small-text-field" bind:value={equipmentName} />
				<input
					id="equipmentQuantity"
					type="text"
					class="small-text-field"
					bind:value={equipmentQuantity}
				/>
				<input
					type="submit"
					value="Add Equipment"
					class="submit-button my-4 rounded bg-zinc-100 px-5 py-4 hover:bg-lime-200"
				/>
			</form>

			<!-- Display equipment -->
			<ul>
				<li class="flex items-center align-text-bottom">
					<p>equipmentName</p>
					<p class="pl-20">equipmentQuantity</p>
				</li>

        {#each equipment as equipment}
          <li class="flex items-center align-text-bottom">
            <!-- <p class="pr-4">{ingredient.ingredientName}</p>-->
            <input
              id="equipmentName"
              type="text"
              class="small-text-field"
              bind:value={equipment.equipmentName}
            />
            <input
              id="equipmentQuantity"
              type="text"
              class="small-text-field"
              bind:value={equipment.equipmentQuantity}
            />

            <button
              type="button"
              class="py-0.3 mb-2 me-2 rounded-full bg-red-700 px-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              on:click={() => removeEquipment(equipment)}
            >x</button>
          </li>
        {/each}
			</ul>

			<!-- Submit recipe -->
			<button
				class="bg-main hover:bg-main-dark rounded border px-4 py-2 font-bold text-white"
        on:click|preventDefault={handleAddRecipe}
      >Submit Recipe</button>
		</div>
		<!-- FLOWBITE https://flowbite.com/docs/forms/select/ -->
	</div>
</div>
<!-- FLOWBITE https://flowbite.com/docs/components/tables/ -->