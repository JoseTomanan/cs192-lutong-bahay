<script lang="ts">
    import { page } from '$app/state';
    import { logout } from '$lib/stores/auth'
    
    let pages = ['home', 'recipes', 'users', 'profile']
  </script>
  
<nav class="p-4 bg-white shadow">
  <div class="flex space-x-4">
    {#each pages as route}
      <a 
        href="/{route}" 
        class="px-3 py-2 rounded-md {page.url.pathname === '/' + route 
          ? 'bg-main text-white' 
          : 'text-black hover:bg-blue-100'}"
      >
        {route}
      </a> 
    {/each}

    <button 
      on:click={logout}
      class="px-3 py-2 rounded-md text-gray"
    >Log out</button>
  </div>
</nav>