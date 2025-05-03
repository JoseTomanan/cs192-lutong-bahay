<script lang="ts">
  import DefaultLoader from "$lib/components/DefaultLoader.svelte";

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  let username: string = ""
  let loading: boolean = false
  let loadingText: string = ""
  

  function getCookie(name: string) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)

    if (parts.length === 2) {
      return parts.pop()!.split(';').shift();
    }
  }
    
  async function suspendUser() {
    loading = true
    loadingText = "Suspending user..."
    
    try {
      const response = await fetch(`${baseUrl}/api/users/suspend-user/`, {
        method: 'POST', 
        credentials: 'include',
        headers: {
          ...(getCookie("csrftoken") && { 'X-CSRFToken': getCookie("csrftoken") }),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username})
      });

      alert(`${username} suspended!`)
    } catch {
      alert(`Failed to suspend ${username}`)
    } finally {
      loading = false
    }
  }

  async function reactivateUser() {
    loading = true
    loadingText = "Reactivating user..."
    try {
      await fetch(`${baseUrl}/api/users/activate-user/`, {
        method: 'POST', 
        credentials: 'include',
        headers: {
          ...(getCookie("csrftoken") ? { 'X-CSRFToken': getCookie("csrftoken") } : {}),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username})
      });

      alert(`${username} reactivated!`)
    } catch {
      alert(`Failed to reactivate ${username}!`)
    } finally {
      loading = false
    }
  }
</script>

<h1 class="title-text text-2xl font-bold mb-6">Administration</h1>

<article class="rounded-lg my-8 w-full max-w-lg space-y-6 bg-white p-6 border-2 border-gray">
  <h2 class="text-lg font-semibold mb-4">Suspend or Reactivate a User</h2>

  <div class="space-y-4">
    <div class="space-y-2">
      <label
        for="username"
        class="block text-sm font-medium text-gray-700"
      >Enter Username</label>
      <input 
        id="username"
        class="md-text-field"
        type="text" 
        bind:value={username}
        placeholder="Enter username..."
      />
    </div>
    
    <div class="flex justify-between">
      <button 
        on:click={suspendUser}
        class="destructive-text"
      >Suspend</button>
      
      <button 
        on:click={reactivateUser}
        class="cta-text"
      >Reactivate</button>
    </div>
  </div>

  {#if loading}
    <div class="flex flex-col items-center justify-center mt-4 space-y-2">
      <DefaultLoader />
      <span class="text-gray-500 text-sm">{loadingText}</span>
    </div>
  {/if}
</article>

<!-- <pre class="text-gray-500 mt-4">
⠀ ／l、         
（ﾟ､ ｡ ７     pagod na ako
⠀ l、ﾞ ~ヽ      
  じしf_, )ノ
</pre> -->


