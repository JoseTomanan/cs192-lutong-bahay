<script>
	import TitleText from "$lib/components/TitleText.svelte";

  let isRecipeReturned = true

  // do your code magic here pre idk what it looks like tho
</script>

<TitleText text={`Update a recipe`}/>

<form class="">
  <div class="relative">
    <input 
      type="search" 
      id="default-search"
      class="block w-full p-4 text-sm space-y-2 rounded border focs:border-none focus:outline-gray-700 focus:ring-0"
      placeholder="Name of recipe..."
      required
    />

    <button
      type="submit"
      class="text-white absolute end-2.5 bottom-2.5 bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-4 py-2"
    >Retrieve recipe</button>
  </div>

  {#if isRecipeReturned}
    <div
      class="flex"
    >
      <!--
        all the same components as submit recipes
        but only displays when recipe is in fact returned
        I'll let you do the honors of copy pasting from submit_recipe para hindi ka mamalik mata and shit
      -->

      <div>
        <button 
          type="submit" 
          class="rounded bg-gray-600 hover:shadow-md p-2 text-white hover:bg-gray-700"
        >Update recipe</button>
        <button 
          type="submit" 
          class="rounded bg-red-600 hover:shadow-md p-2 text-white hover:bg-opacity-70"
        >Delete Recipe</button>
      </div>
    </div>
  {/if}
</form>