<script lang="ts">
	import { onMount } from "svelte";

	let props = $props();
	let reviewerId = props.recipeReview.reviewer
	let username = $state("");

	onMount(async () => {
		functionUserById() 
	})

	async function functionUserById() {
		const response = await fetch('http://127.0.0.1:8000/api/users/fetch-user-by-id/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: reviewerId })
		});

		let userObject = await response.json();

		if (response.ok) {
			username = userObject.username;
			console.log('User fetch successful');
			return;
		} else {
			console.log('User fetch fail');
		}
  }
</script>

<div class="container my-1 py-3 px-10">
	<p class="font-bold">{username}</p>
	<p class="my-1">{props.recipeReview.reviewString}</p>
	<p class="text-sm text-zinc-400">Rating: {props.recipeReview.reviewRating}</p>
</div>
