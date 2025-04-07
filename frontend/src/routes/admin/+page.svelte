<script lang="ts">
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

<h1 class="title-text">Administration</h1>

<article class="rounded-lg my-8 w space-y-4 w-1/3">
  <h2 class="text-lg font-semibold mb-4">Suspend a user</h2>

  <div>
    <label
      for="username"
      class="for-small-field"
    >Enter username</label>
    <input 
      id="username"
      class="small-text-field px-4 py-2 w-max"
      type="text" 
      bind:value={username}
      placeholder="Username..."
    />
  </div>
  
  <div class="flex space-x-4">
    <button 
      on:click={suspendUser}
      disabled={isLoading}
      class="destructive-text"
    >Suspend</button>
    
    <button 
      on:click={reactivateUser}
      disabled={isLoading}
      class="cta-text"
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