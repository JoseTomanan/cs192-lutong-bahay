<script lang="ts">
  import IngredientItem from '$lib/../routes/submit_recipe/+page.svelte'
  import IngredientObject from '$lib/../routes/submit_recipe/+page.svelte'

  export let cookDifficulty: string
  export let ratings: number
  export let price: number
  export let ingredients: IngredientObject[]
  export let id: number
  export let recipeName: string
  export let equipment: string
  export let servings: number

  console.log(recipeName, ingredients)
</script>

<div class="rounded-2 duration-75 shadow-sm hover:shadow-lg border hover:border-primary overflow-hidden w-full
hover:bg-gradient-to-br hover:from-white hover:to-amber-50 RecipeCard">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2 text-main">
      <a
        href="/recipes/{id}"
        class="text-main hover:text-main_dark hover:underline"
      >{ recipeName }</a>
    </div>
    
    <span class="text-gray-600 text-sm">
      <span class="font-semibold">
        Difficulty:
      </span>
      { cookDifficulty }
    </span>

    <p class="text-gray-700 text-sm">
      <span class="font-semibold">
        Rating:
      </span>
      {#if ratings != 0}
        { ratings }
      {:else}
        -
      {/if}
    </p>
    
    <p class="text-gray-700 text-sm">
      <span class="font-semibold">
        Price (PHP):
      </span>
      { price }.00
    </p>
    
    <!-- <p class="text-gray-700 text-sm">
      <span class="font-semibold">
        ID:
      </span>
      { id }
    </p> -->
    
    <p class="text-gray-700 text-sm">
      <span class="font-semibold">
        Equipment:
      </span>
      { equipment }
    </p>
    
    <p class="text-gray-700 text-sm">
      <span class="font-semibold">
        Servings:
      </span>
      { servings }
    </p>
  </div>

  <!-- <a href="/recipes/{id}" >
    <div class="px-6 py-4">
      <button
        class="bg-main hover:bg-main_dark text-white font-bold py-2 px-4 rounded"
      >View Recipe</button>
    </div>
  </a>  -->
</div>
