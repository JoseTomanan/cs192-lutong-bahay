<script lang="ts">
  import { page } from '$app/state';
  import { logout, isAuthenticated, isAdmin } from '$lib/stores/auth'
  import { usernameStore } from '$lib/stores/auth';
  import OutgoingLink from '$lib/static/outgoing_link.svg'

  let pages = ['home', 'recipes', 'users', 'profile']

  let admin_pages = [
    ['admin', 'Administration'],
    ['submit_recipe', 'Add recipe'],
    ['edit_recipe', 'Edit recipe'],
    ['manage_review', 'Manage reviews']
    ]
</script>
  
<!-- <nav class="p-4 bg-white shadow">
  <div class="flex space-x-4">
    
    {#each pages as route}
     
        <a 
          href="/{route}" 
          class="border px-3 py-2 rounded-md {page.url.pathname === '/' + route ? 'bg-main text-white' 
          : 'text-black hover:bg-secondary hover:bg-opacity-50'}"
        >
          {route}
        </a> 
     
    {/each}
 

    <button 
      on:click={logout}
      class="px-3 py-2 rounded-md text-gray"
    >Log out</button>
  </div>
</nav> -->

<nav class="fixed top-0 left-0 h-screen w-64 border-r bg-white flex flex-col z-50
pt-8 px-2">
  <!-- <div class="p-6 border-b">
    <h1 class="text-2xl font-semibold text-main">Lutong Bahay</h1>
  </div> -->
  <div class="flex-1 p-2">
    <div class="flex flex-col space-y-2">
      {#each pages as route}
        <a 
          href="/{route}" 
          class="px-5 py-3 rounded-lg {
              page.url.pathname === '/' + route 
              ? 'bg-gradient-to-bl from-gray-600 to-gray-700 text-white' 
              : 'text-gray-700 bg-white hover:bg-gray-100'
            }"
        >
            {route[0].toUpperCase() + route.slice(1)}
        </a>
      {/each}

      {#if $isAdmin}
        {#each admin_pages as route}
          <a
            href="/{route[0]}" 
            class="px-5 py-3 rounded-lg {
                page.url.pathname === '/' + route[0]
                ? 'bg-main text-white' 
                : 'text-gray-700 bg-main bg-opacity-10 hover:bg-opacity-20'
              }"
          >
            { route[1] }
          </a>
        {/each}
      {/if}
    </div>
  </div>

  {#if ($usernameStore) != ""}
    <p class="pl-2 text-gray-400">
      @{$usernameStore}
    </p>
  {/if}

  <div class="p-2">
    {#if $isAdmin}
      <a 
        target="_blank"
        href="http://127.0.0.1:8000/admin" 
        class="px-5 py-3 my-2 rounded-lg text-gray-500 bg-white hover:bg-gray-100 flex justify-start gap-2"
      >
        <span class="italic text-gray-500">Open in Django</span>
        <img src="{OutgoingLink}" alt="" class="w-4 mt-0.5 opacity-60"/>
      </a>
    {/if}

    <button 
      on:click={logout}
      class="w-full px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 "
    >Logout</button>
  </div>
</nav>

<!-- https://flowbite.com/docs/components/navbar/ -->

<!-- <nav class="bg-white dark:bg-main w-full top-0 start-0">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/home" class="flex items-center space-x-3 ">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Lutong Bahay</span>
  </a>
  <div class="flex md:order-2 space-x-3 ">
    <button 
        on:click={logout}
        class="px-3 py-2 rounded-md text-gray"
    >Log out</button> 

    <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium bg-primary md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
      <li>
        <a href="#" class="block py-2 px-3 text-white bg-main_ rounded-sm md:bg-transparent hover:text-secondary_light" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
      </li>
    </ul>
  </div>
  </div>
</nav> -->