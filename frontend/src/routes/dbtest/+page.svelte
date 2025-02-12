<script>
	import { goto } from "$app/navigation";

  let users = [];
  let inputEmail = "";
  let inputPassword = "";
  let error="";

  async function fetchUsers() {
    const response = await fetch("http://127.0.0.1:8000/users/");
    users = await response.json();
  }

  fetchUsers()

  async function submitUserForm() {
    console.log(inputEmail, inputPassword)
      const response = await fetch('http://127.0.0.1:8000/add-user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: inputEmail, password: inputPassword })
      });

      const data = await response.json();
      console.log(data)
      
      if (response.ok) {
        console.log("User add successful");
        return;
      } else
      {
        console.log("User add fail");
      }
  }

  async function functionDeleteUserForm(input_id) {
    console.log(input_id)
      const response = await fetch('http://127.0.0.1:8000/delete-user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: input_id})
      });

      const data = await response.json();
      console.log(data)
      
      if (response.ok) {
        console.log("User delete successful");
        goto('dbtest')
        return;
      } else
      {
        console.log("User add fail");
      }
  }
</script>


<div class="flex flex-col">
  <h1 class="text-2xl font-bold text-gray-800">User Database</h1>
  <div class="-m-1.5 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Password</th>
              <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {#each users as user}
            <tr>
              <td 
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{user.id}
              </td>
              <td 
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.email}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.password}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                <button 
                  type="submit" 
                  class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                  on:click={() => functionDeleteUserForm(user.id)}
                  >
                  Delete
                </button>
              </td>
            </tr>
            {/each}  
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"><form id="form1">x</form></td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <input 
                  form="form1" type="text" name="email"
                  bind:value={inputEmail}
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <input form="form1" type="text" name="password"
                bind:value={inputPassword}
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                <button 
                  form="form1"
                  type="submit" 
                  class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
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
