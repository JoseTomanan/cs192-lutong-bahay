<script>
  let pages = ['dashboard', 'login', 'search']
</script>


<div class="p-4 flex flex-col space-y-3">
  <h1 class="text-2xl font-bold text-gray-800">links</h1>
  <nav class="flex flex-col space-y-2">
    {#each pages as page}
      <a href="/{page}" class="text-blue-500 hover:text-blue-700">{page}</a>
    {/each}
  </nav>  
</div> 