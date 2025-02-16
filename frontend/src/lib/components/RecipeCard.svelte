<script lang="ts">
    export let name: string;
    export let ingredients: string;
    export let cooking_time: string;
    export let price: string;
</script>

<div class="max-w-sm rounded overflow-hidden border-2 border-solid border-black">
    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 text-main">{name}</div>
        <p class="text-gray-600 text-sm mb-2">
            <span class="font-semibold">Cooking Time:</span> {cooking_time}
        </p>
        <p class="text-gray-600 text-sm mb-4">
            <span class="font-semibold">Price:</span> {price}
        </p>
        <p class="text-gray-700 text-base">
            <span class="font-semibold">Ingredients:</span><br>
            {ingredients}
        </p>
    </div>
    <div class="px-6 py-4">
        <button class="bg-main hover:bg-main_dark text-white font-bold py-2 px-4 rounded">
            View Recipe
        </button>
    </div>
</div>