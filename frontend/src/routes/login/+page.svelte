<script lang="ts">
	import { goto } from "$app/navigation";
  import { isAuthenticated, setAuth } from '$lib/stores/auth'

  let email = '';
  let password = '';
  let error = '';
  
  let loginMethods = [
      {name: 'Google', icon: '/google.webp'}, 
      {name: 'Facebook', icon: '/facebook.png'}, 
  ] 

  async function handleSubmit() {
    try { 
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      const success = data.success 
      const message = data.message

      if (!success) {
        alert(message)
      } else {
        setAuth(true)
        goto('/home') 
      }
      
      if (!response.ok) { 
        const data = await response.json();
        const error = data.error;
        return;
      }
      
    } catch (err) {
      console.error('Login failed')
    }

  } 
</script>

<section class="bg-gradient-to-br from-white to-lime-50">
  <div
      class="bg-white w-full flex flex-col justify-center max-w-xl space-y-3 rounded-lg px-12 py-12 shadow-xl border-gray-200 border"
  >
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <h1 class="text-4xl font-semibold -mb-4 text-main">
              Lutong Bahay
          </h1>
          <h2 class="text-gray-600 pb-7 text-lg italic">
              Your database for Filipino recipes
          </h2>
          
          <div class="space-y-2">  
              <input
                  type="email"
                  bind:value={email}
                  placeholder="Email"
                  class="space-y-2 w-full rounded border p-2"
                  required
              />
              
              <input
                  type="password"
                  bind:value={password}
                  placeholder="Password" 
                  class="space-y-2 w-full rounded border p-2 focus:outline-gray-700 focus:ring-0 hover:border-gray-700"
                  required
              />
          </div>

          <button type="submit" class="w-full rounded bg-main p-2 text-white hover:bg-main_dark">
              Log in
          </button>
          
          <div class="flex items-center justify-center pt-4 pb-2">
              <hr class="flex-grow border-gray-200">
              <span class="px-4 text-gray-400">OR</span>
              <hr class="flex-grow border-gray-200">
          </div>
      </form>

      <div class="space-y-3 flex flex-col items-center ">
          {#each loginMethods as {name, icon}} 
              <button
                  type="submit"
                  class="w-full rounded-full hover:border-gray-700 bg-white p-2 text-gray-700 border hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 flex items-center gap-3 justify-center"
              >
                  <img src={icon} alt={name} class="w-6 h-6">
                  Sign in with {name} 
              </button>  
          {/each}   
      </div> 

      <div class="flex justify-end"> 
          <a class="mt-2 text-gray-700 hover:text-gray-900 hover:underline text-opacity-90" href="#top">
              Don't have an account?
          </a>
      </div>
  </div>
</section> 
