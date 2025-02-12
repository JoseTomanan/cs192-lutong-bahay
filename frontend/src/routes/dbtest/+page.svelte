<script>
  let users = [];

  async function fetchUsers() {
    const response = await fetch("http://127.0.0.1:8000/users/");
    users = await response.json();
  }

  fetchUsers()
</script>


<div class="p-4 flex flex-col space-y-3">
  <h1 class="text-2xl font-bold text-gray-800">links</h1>
  <nav class="flex flex-col space-y-2">
    {#each users as user}
      <li>{user.email}: {user.password}</li>
    {/each}  
  </nav>
</div> 
