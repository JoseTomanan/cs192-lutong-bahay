<script lang="ts">
	import { onMount } from "svelte";
	import { usernameStore } from '$lib/stores/auth';

	let props = $props();
	let reviewerId = props.recipeReview.reviewer
	let reviewId = props.recipeReview.id
	let username = $state("");

	onMount(async () => {
		functionUserById() 
	})

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

	  async function deleteReviewById() {
		const response = await fetch('http://127.0.0.1:8000/api/reviews/delete-review-by-id', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ review_id: reviewId })
		});

		let userObject = await response.json();

		if (response.ok) {
			username = userObject.username;
			alert('review delete success')
			fetchRecipeReviews()
			console.log('Review delete successful');
			return;
		} else {
			alert('review delete fail')
			console.log('Review delete fail');
		}
  	}
</script>

<div class="container my-4 p-5 border">
	<p class="font-bold text-gray-800 text-lg">{username}</p>
	<p class="my-1">{props.recipeReview.reviewString}</p>
	<p class="text-sm text-zinc-400">Rating: {props.recipeReview.reviewRating}</p>
	<button class="text-sm text-secondary" onclick={deleteReviewById}>Delete Review</button>
	
</div>
