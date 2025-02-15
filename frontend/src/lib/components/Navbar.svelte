<script lang="ts">
    import { page } from '$app/state';
    
    let pages = ['dashboard', 'login', 'search', 'dbtest'];
  </script>
  
  <nav class="p-4 bg-white shadow">
    <div class="flex space-x-4">
      {#each pages as route}
        <a 
          href="/{route}" 
          class="px-3 py-2 rounded-md {page.url.pathname === '/' + route 
            ? 'bg-blue-500 text-white' 
            : 'text-gray-600 hover:bg-blue-100'}"
        >
          {route}
        </a>
      {/each}
    </div>
  </nav>