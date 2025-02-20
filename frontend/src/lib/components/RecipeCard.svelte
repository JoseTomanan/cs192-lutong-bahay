<script lang="ts">
    export let title: string;
    export let ingredients: string;
    export let cooking_time: string;
    export let price: string;
    export let id: number;
</script>

<div class="rounded-2 duration-75 shadow-sm hover:shadow-lg border hover:border-primary overflow-hidden w-full
hover:bg-gradient-to-br hover:from-white hover:to-amber-50">
    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 text-main">{title}</div>
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
    <a href="/recipes/{id}" >
    <div class="px-6 py-4">
        <button class="bg-main hover:bg-main_dark text-white font-bold py-2 px-4 rounded">
            View Recipe 
        </button>
        
    </div>
    </a> 
</div>