<script lang="ts">
	import { goto } from '$app/navigation';
	import UserRow from './UserRow.svelte';

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

	let users: any[] = [];
	let inputEmail: string = '';
	let inputPassword: string = '';
	let error: string = '';

	async function fetchUsers() {
		const response = await fetch(`${baseUrl}/users/`);
		users = await response.json();
	}

	fetchUsers();

	async function submitUserForm() {
		console.log(inputEmail, inputPassword);
		const response = await fetch(`${baseUrl}/add-user/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: inputEmail, password: inputPassword })
		});

		const data = await response.json();
		console.log(data);

		if (response.ok) {
			console.log('User add successful');
			return;
		} else {
			console.log('User add fail');
		}
	}

	async function functionDeleteUserForm(input_id: number) {
		console.log(input_id);

		const response = await fetch(`${baseUrl}/delete-user/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: input_id })
		});

		const data = await response.json();
    
		console.log(data);

		if (response.ok) {
			console.log('User delete successful');
			goto('dbtest');
			return;
		} else {
			console.log('User add fail');
		}
  }
</script>

<div class="flex">
	<div class="w-lg">
		<h1 class="title-text">User Database</h1>
		<div class="-m-1.5 overflow-x-auto">
			<div class="inline-block min-w-full p-1.5 align-middle">
				<div class="overflow-hidden">
					<table class="min-w-full divide-y divide-gray-200">
						<thead>
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500">ID</th
								>
								<th
									scope="col"
									class="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500">Email</th
								>
								<th
									scope="col"
									class="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500"
									>Password</th
								>
								<th
									scope="col"
									class="px-6 py-3 text-end text-xs font-medium uppercase text-gray-500">Action</th
								>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200">
							{#each users as user}
								<UserRow userProp={user} functionProp={functionDeleteUserForm} />
							{/each}
							<tr>
								<td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800"
									><form id="form1">x</form></td
								>
								<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
									<input form="form1" type="text" name="email" bind:value={inputEmail} />
								</td>
								<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
									<input form="form1" type="text" name="password" bind:value={inputPassword} />
								</td>
								<td class="whitespace-nowrap px-6 py-4 text-end text-sm font-medium">
									<button
										form="form1"
										type="submit"
										class="inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
										on:click={submitUserForm}
									>
										Add
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
