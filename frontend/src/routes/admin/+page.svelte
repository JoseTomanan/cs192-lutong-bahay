<script lang="ts">
  import DefaultLoader from "$lib/components/DefaultLoader.svelte";
  import toast, { Toaster } from 'svelte-french-toast';

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
      const response = await fetch('http://localhost:8000/api/users/suspend-user/', {
        method: 'POST', 
        credentials: 'include',
        headers: {
          ...(getCookie("csrftoken") && { 'X-CSRFToken': getCookie("csrftoken") }),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username})
      });

      toast(`${username} suspended!`, {icon: '🔒'})
    } catch {
      toast.error(`Failed to suspend ${username}`)
    } finally {
      loading = false
    }
  }

  async function reactivateUser() {
    loading = true
    loadingText = "Reactivating user..."
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

      toast(`${username} reactivated!`, {icon: '✅'})
    } catch {
      toast.error(`Failed to reactivate ${username}!`)
    } finally {
      loading = false
    }
  }
</script>

<Toaster />

<h1 class="title-text text-2xl font-bold mb-6">Administration</h1>

<article class="rounded-lg my-8 w-full max-w-lg space-y-6 bg-white p-6 shadow-md">
  <h2 class="text-lg font-semibold mb-4">Suspend or Reactivate a User</h2>

  <div class="space-y-4">
    <div>
      <label
        for="username"
        class="block text-sm font-medium text-gray-700 mb-2"
      >Enter Username</label>
      <input 
        id="username"
        class="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-main focus:border-main"
        type="text" 
        bind:value={username}
        placeholder="Enter username..."
      />
    </div>
    
    <div class="flex justify-between">
      <button 
        on:click={suspendUser}
        class="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition"
      >Suspend</button>
      
      <button 
        on:click={reactivateUser}
        class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition"
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


