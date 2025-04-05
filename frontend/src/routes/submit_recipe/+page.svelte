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
		ingredientQuantity = 1;
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
		equipmentQuantity = 1;
	};

	const removeEquipment = (equipment_i: EquipmentItem) => {
		equipment = equipment.filter((i) => i !== equipment_i)
	};
</script>

<!-- FLOWBITE https://flowbite.com/docs/forms/search-input/ -->

<div class="gap-2 w-1/3 space-y-8">
  <!-- Recipe info -->
  <article class="space-y-2">
    <h1 class="text-lg font-bold">
      Set Recipe Info
    </h1>
    
    <!-- https://v1.tailwindcss.com/components/forms -->
    <form class="w-full max-w-lg space-y-4">
      <div class="flex flex-wrap">
        <div class="w-full">
          <label
            class="for-small-field"
            for="recipeName"
          >RECIPE NAME</label>
          <input
            id="recipeName"
            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            type="text"
            placeholder="Recipe name"
            bind:value={recipeName}
          />
        </div>
      </div>
  
      <div class="flex flex-wrap">
        <div class="w-1/3">
          <label
            class="for-small-field"
            for="servings"
          >SERVINGS</label>
          <input
            id="servings"
            class="small-text-field px-2 py-3 w-full"
            type="text"
            placeholder="Servings"
            bind:value={servings}
          />
        </div>
  
        <div class="w-1/3">
          <label
            class="for-small-field"
            for="price"
          >PRICE</label>
          <input
            id="price"
            class="small-text-field px-2 py-3 w-full"
            type="text"
            placeholder="Price"
            bind:value={price}
          />
        </div>
  
        <div class="w-1/3">
          <label
            class="for-small-field"
            for="cookDifficulty"
          >DIFFICULTY</label>
          <input
            id="cookDifficulty"
            class="small-text-field px-2 py-3 w-full"
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
  </article>

  <!-- Add to list of ingredients -->
  <article class="w-full max-w-lg space-y-4">
    <form class="max-w-md space-y-5" on:submit|preventDefault={addIngredient}>
      <h1 class="text-lg font-bold">
        Add Ingredients
      </h1>

      <div class="flex gap-x-4">
        <div class="w-1/2">
          <label
            class="for-small-field"
            for="ingredientName"
          >INGREDIENT</label>
          <select
            class="block rounded px-4 py-1.5 text-gray-700 bg-gray-200 focus:border-gray-500 focus:outline-none leading-tight w-full"
            placeholder="Choose..."
            bind:value={currentIngredient}
          >
            <option disabled selected>Choose...</option>
            {#each ingredientsDb as ingredient}
              <option value={ingredient}>{ ingredient.ingredientName }</option>
            {/each}
          </select>
        </div>

        <div class="w-1/3">
          <label
            class="for-small-field w-max"
            for="ingredientQuantity"
          >QUANTITY</label>
          <input
            id="ingredientQuantity"
            type="text"
            class="small-text-field px-4 py-1.5 w-full"
            placeholder="Quantity"
            bind:value={ingredientQuantity}
          />
        </div>

        <!-- <div class="h-max"> -->
          <button
            type="submit"
            class="add-item w-max h-min"
          >+</button>
        <!-- </div> -->
      </div>
    </form>

    <!-- Display ingredients -->
    <ul>
      <li class="flex align-text-bottom">
        <label
          class="for-small-field grow" for=""
        >CURRENT INGREDIENTS</label>
        <!-- <label
          class="for-small-field grow" for=""
        >QUANTITY</label> -->
      </li>
      
      {#each ingredients as ingredient}
        <li class="flex align-text-bottom gap-x-2">
          <!-- <p class="pr-4">{ingredient.ingredientName}</p>-->
          <input
            id="ingredientName"
            type="text"
            class="small-text-field w-1/2 px-2"
            bind:value={ingredient.ingredientObject.ingredientName}
          />
          <input
            id="ingredientQuantity"
            type="text"
            class="small-text-field w-1/2 px-2"
            bind:value={ingredient.ingredientQuantity}
          />
          <button
            type="button"
            class="remove-item"
            on:click={() => removeIngredient(ingredient)}
          >x</button>
        </li>
      {/each}
      
    </ul>
  </article>

  <!-- Add to list of equipment -->
  <article class="w-full max-w-lg space-y-4">
    <form
      class="max-w-md space-y-5"
      on:submit|preventDefault={addEquipment}
    >
      <h1 class="text-lg font-bold">
        Add Ingredients
      </h1>

      <div class="flex gap-x-4">
        <div class="w-1/2 gap-x-4">
          <label
            class="for-small-field"
            for="equipmentName"
          >EQUIPMENT</label>
          <input
            id="equipmentName"
            type="text"
            class="small-text-field px-4 py-1.5 block leading-tight w-full"
            placeholder="Equipment"
            bind:value={equipmentName}
          />
        </div>
        <div class="w-1/3">
          <label
            class="for-small-field"
            for="equipmentName"
          >QUANTITY</label>
          <input
            id="equipmentQuantity"
            type="text"
            class="small-text-field px-4 py-1.5 shrink w-full"
            bind:value={equipmentQuantity}
            />
        </div>
        <!-- <div class="w-1/3 flex align-items-center"> -->
        <button
          type="submit"
          class="add-item h-min"
        >+</button>
      </div>
      <!-- </div> -->
    </form>

    <!-- Display equipment -->
    <ul>
      <li class="flex align-text-bottom">
        <label
          class="for-small-field grow" for=""
        >CURRENT EQUIPMENT</label>
        <!-- <label
          class="for-small-field grow" for=""
        >QUANTITY</label> -->
      </li>

      {#each equipment as equipment}
        <li class="flex items-center align-text-bottom gap-x-2">
          <!-- <p class="pr-4">{ingredient.ingredientName}</p>-->
          <input
            id="equipmentName"
            type="text"
            class="small-text-field px-2 w-1/2"
            bind:value={equipment.equipmentName}
          />
          <input
            id="equipmentQuantity"
            type="text"
            class="small-text-field px-2 w-1/2"
            bind:value={equipment.equipmentQuantity}
          />
          <button
            type="button"
            class="remove-item"
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
  </article>
</div>
