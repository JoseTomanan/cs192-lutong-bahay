<script lang="ts">
  let email = '';
  let password = '';
  
  let loginMethods = ['Google', 'Facebook']

  function handleSubmit() {
    console.log('Login attempted:', { email, password });
  }
</script>

<style>
  * {
    font-family: "Inter"
  }
</style> 
 

<div 
  class="flex min-h-screen items-center justify-center bg-gradient-to-br bg-white"
>
  <div class="bg-white w-full flex flex-col h-screen justify-center max-w-xl space-y-3 rounded-lg border px-12 py-12 shadow-xl"
  style="background: url(/liempo_edited.xpng); background-size:cover">
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <h1 class="text-4xl font-bold -mb-4 text-emerald-800">Lutong Bahay</h1>
      <h2 class="text-gray-600 pb-7 text-lg italic">Your database for Filipino recipes</h2>
      <div class="space-y-2">
        <div class="space-y-2">
          <input
            type="email"
            bind:value={email}
            placeholder="Email"
            class="w-full rounded border p-2"
            required
          />
        </div>
        <div class="space-y-2 mb-">
          <input
            type="password"
            bind:value={password}
            placeholder="Password"
            class="w-full rounded border p-2"
            required
          />
        </div>
      </div>
      <button type="submit" class="w-full rounded bg-emerald-500 p-2 text-white hover:bg-emerald-600">
        Log in
      </button>
    
    
      <div class="flex items-center justify-center pt-7 pb-4">
        <hr class="flex-grow border-gray-200">
        <span class="px-4 text-gray-500">OR</span>
        <hr class="flex-grow border-gray-200">
      </div>
    
    
    </form>

    <div class="space-y-3 flex flex-col items-center ">
      {#each loginMethods as loginMethod}
        <button type="submit" class="w-full rounded-full bg-white p-2 text-gray-700 border shadow-sm">
          Sign in with {loginMethod} 
        </button>
      {/each} 
    </div>
 
    <div class="flex justify-end">
      <span class="mt-2 text-blue-500 hover:text-blue-700 hover:underline">Don't have an account?</span>
    </div>
  </div>
</div> 