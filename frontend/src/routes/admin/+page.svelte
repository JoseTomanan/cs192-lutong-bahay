<script lang="ts">
  import TitleText from "$lib/components/TitleText.svelte";

  let username: string = ""
  let isLoading: boolean = false

  function getCookie(name: string) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)

    if (parts.length === 2) {
      return parts.pop()!.split(';').shift();
    }
  }
  
  async function suspendUser() {
    try {
      const response = await fetch('http://localhost:8000/api/users/suspend-user/', {
        method: 'POST', 
        credentials: 'include',
        headers: {
          ...(getCookie("csrftoken") && { 'X-CSRFToken': getCookie("csrftoken") }),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username})
      });

      alert(`${username} suspended`)
    } catch {
      alert(`failed to suspend ${username}`)
    } 
  }

  async function reactivateUser() {
    try {
      await fetch('http://localhost:8000/api/users/activate-user/', {
        method: 'POST', 
        credentials: 'include',
        headers: {
          ...(getCookie("csrftoken") ? { 'X-CSRFToken': getCookie("csrftoken") } : {}),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username})
      });

      alert(`${username} reactivated`)
    } catch {
      alert(`failed to reactivate ${username}`)
    } 
  }
</script>

<TitleText text={`Administrator`}/>

<article class="rounded-lg my-8 w">
  <h2 class="text-lg font-semibold mb-4">Suspend a user</h2>

  <div class="mb-4">
    <label
      for="username"
      class="for-small-field"
    >Enter username</label>
    <input 
      id="username"
      class="small-text-field px-4 py-2"
      type="text" 
      bind:value={username}
      placeholder="Username..."
    />
  </div>
  
  <div class="flex space-x-4 w-1/2">
    <button 
      on:click={suspendUser}
      disabled={isLoading}
      class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
    >Suspend</button>
    
    <button 
      on:click={reactivateUser}
      disabled={isLoading}
      class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
    >Reactivate</button>
  </div>
    
  {#if isLoading}
    <div class="mt-4 text-center text-gray-500">
      Processing...
    </div>
  {/if}

</article>

<!-- <pre class="text-gray-500 mt-4">
⠀ ／l、         
（ﾟ､ ｡ ７     pagod na ako
⠀ l、ﾞ ~ヽ      
  じしf_, )ノ
</pre> -->