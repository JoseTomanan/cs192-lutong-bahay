<script lang="ts">
	import { onMount } from 'svelte';

  interface IngredientObject {
    id: number;
    ingredientName: string;
  }

  interface IngredientItem {
    ingredientObject: IngredientObject;
    ingredientQuantity: number;
  }

  interface EquipmentItem {
    equipmentName: string,
    equipmentQuantity: number;
  }

	let ingredientsDb: any[] = [];

	let recipeName: string = '';
	let cookDifficulty: number = 3;
	let instructions: string = '';
	let servings: number = 1;
	let price: number = 50;

  let currentIngredient: IngredientObject = { id: 0, ingredientName: '' };

	let ingredients: IngredientItem[] = [{
			ingredientObject: {id: 4, ingredientName: 'salt'},
			ingredientQuantity: 1
		}];
	let ingredientQuantity = 1;

	let equipment: EquipmentItem[] = [{
			equipmentName: 'pan',
			equipmentQuantity: 1
		}];

  let equipmentName: string = '';
	let equipmentQuantity: number = 1;

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

	async function handleCreateRecipe() {
    const equipmentListOfNames: string = equipment
      .map(item => item.equipmentName)
      .join(', ');

		let input = {
			recipeName: recipeName,
			cookDifficulty: cookDifficulty,
			equipment: equipmentListOfNames,
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
				const result = data[0].toString();
        console.log(result)
        alert(`Recipe added successfully!`)
			}
		} catch {
			alert('No database connection');
		}
	}

	// https://svelte.dev/playground/9983c53df057451db328b94553b88202?version=5.25.2
	const addIngredient = () => {
		ingredients = [
        ...ingredients,
        {ingredientObject: currentIngredient, ingredientQuantity}
		  ];
		
    currentIngredient;
		ingredientQuantity = 0;
		console.log(ingredients);
	};

	const removeIngredient = (ingredient: IngredientItem) => {
		ingredients = ingredients.filter(
        (i) => i.ingredientObject.ingredientName !== ingredient.ingredientObject.ingredientName
      );
	};

	const addEquipment = () => {
		equipment = [
			...equipment,
			{equipmentName, equipmentQuantity}
		];
		equipmentName = '';
		equipmentQuantity = 0;
	};

	const removeEquipment = (equipment_i: EquipmentItem) => {
		equipment = equipment.filter((i) => i !== equipment_i)
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
            class="for-small-field"
            for="recipeName"
          >RECIPE NAME</label>
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
            class="for-small-field"
            for="servings"
          >SERVINGS</label>
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
            class="for-small-field"
            for="price"
          >PRICE</label>
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
            class="for-small-field"
            for="cookDifficulty"
          >DIFFICULTY</label>
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
            class="for-small-field"
            for="cookDifficulty"
          >INSTRUCTIONS</label>
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
		<div class="space-y-7">
			<form class="max-w-md space-y-5" on:submit|preventDefault={addIngredient}>
				<h1 class="text-lg font-bold">
          Add Ingredients
        </h1>
        
				<div class="flex gap-x-5">
					<div>
						<label
              class="for-small-field"
              for="ingredientName"
            >INGREDIENT</label>
						<select
							class="block w-max appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-zinc-100 focus:outline-none"
							bind:value={currentIngredient}
						>
              <option disabled selected>Choose...</option>
							{#each ingredientsDb as ingredient}
								<option value={ingredient}>{ ingredient.ingredientName }</option>
							{/each}
						</select>
					</div>

					<div>
						<label
              class="for-small-field"
              for="ingredientQuantity"
            >QUANTITY</label>
            <input
							id="ingredientQuantity"
							type="text"
							class="small-text-field px-4 py-3 w-20"
							bind:value={ingredientQuantity}
						/>
						<!-- <input
							id="ingredientQuantity"
							type="text"
							class="small-text-field block w-20 appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
							bind:value={ingredientQuantity}
						/> -->
					</div>

          <input
            type="submit"
            value="+"
            class="submit-button w-1/4"
          />
				</div>
			</form>

			<!-- Display ingredients -->
			<ul>
				<li class="flex items-center align-text-bottom">
					<label
            class="for-small-field grow" for=""
          >NAME</label>
					<label
            class="for-small-field grow"
            for=""
          >QUANTITY</label>
				</li>
				
				{#each ingredients as ingredient}
					<li class="flex items-center align-text-bottom">
						<!-- <p class="pr-4">{ingredient.ingredientName}</p>-->
						<input
							id="ingredientName"
							type="text"
							class="small-text-field grow"
							bind:value={ingredient.ingredientObject.ingredientName}
            />
						<input
							id="ingredientQuantity"
							type="text"
							class="small-text-field grow"
							bind:value={ingredient.ingredientQuantity}
            />
						<button
							type="button"
							class="py-0.3 mb-2 me-2 rounded-full bg-red-700 px-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
							on:click={() => removeIngredient(ingredient)}
            >x</button>
					</li>
				{/each}
			</ul>

			<!-- Add to list of equipment -->
			<h1 class="text-lg font-bold">
        Add Equipment
      </h1>
			<form on:submit|preventDefault={addEquipment} class="max-w-md">
				<label
          class="for-small-field"
          for="equipmentName"
        >ADD EQUIPMENT</label>
				<input
          id="equipmentName"
          type="text"
          class="small-text-field w-1/3"
          bind:value={equipmentName}
          />
				<input
					id="equipmentQuantity"
					type="text"
					class="small-text-field w-1/3"
					bind:value={equipmentQuantity}
				  />
				<input
          type="submit"
          value="+"
          class="submit-button w-1/4"
				  />
			</form>

			<!-- Display equipment -->
			<ul>
				<li class="flex items-center align-text-bottom">
					<label
            class="for-small-field" for=""
          >EQUIPMENT NAME</label>
					<label
            class="for-small-field pl-20"
            for=""
          >QUANTITY</label>
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
        on:click|preventDefault={handleCreateRecipe}
      >Submit Recipe</button>
		</div>
		<!-- FLOWBITE https://flowbite.com/docs/forms/select/ -->
	</div>
</div>
<!-- FLOWBITE https://flowbite.com/docs/components/tables/ -->