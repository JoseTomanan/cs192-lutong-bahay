<script lang="ts">
	import { goto } from "$app/navigation";
  
  let identifier = '';
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
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();
      const success = data.success 
      const message = data.message


      if (!success) {
        alert(message)
      } else {
        alert(message) // Hamdi's addition for testing
        // setAuth(true)
        goto('/home') 
      }
      
      if (!response.ok) { 
        const data = await response.json();
        const error = data.error;
        return;
      }
      
    } catch (err) {
      console.log('Login failed')
    }

  } 
</script>

<section>
  <div
      class="bg-background w-full flex flex-col h-5/6 justify-center max-w-xl space-y-3 rounded-lg px-12 py-12 shadow-xl border"
      style="background: url(/liempo_edited.xpng); background-size:cover"
  >
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <h1 class="text-4xl font-bold -mb-4 text-main">
              Lutong Bahay
          </h1>
          <h2 class="text-dark_gray pb-7 text-lg italic">
              Your database for Filipino recipes
          </h2>
          
          <div class="space-y-2"> 
              <input
                  type="text"
                  bind:value={identifier}
                  placeholder="Username of email"
                  class="space-y-2 w-full rounded border p-2 focus:outline-secondary focus:ring-0"
                  required
              />
              
              <input
                  type="password"
                  bind:value={password}
                  placeholder="Password" 
                  class="space-y-2 w-full rounded border p-2 focus:outline-secondary focus:ring-0"
                  required
              />
          </div>

          <button type="submit" class="w-full rounded bg-main p-2 text-white hover:bg-main_dark">
              Log in
          </button>
          
          <div class="flex items-center justify-center pt-3 pb-2">
              <hr class="flex-grow border-gray-200">
              <span class="px-4 text-dark_gray">OR</span>
              <hr class="flex-grow border-gray-200">
          </div>
      </form>

      <div class="space-y-3 flex flex-col items-center ">
          {#each loginMethods as {name, icon}} 
              <button
                  type="submit"
                  class="w-full rounded-full bg-white p-2 text-gray-700 border hover:bg-gray-100 flex items-center gap-3 justify-center"
              >
                  <img src={icon} alt={name} class="w-6 h-6">
                  Sign in with {name} 
              </button>  
          {/each}   
      </div> 

      <div class="flex justify-end"> 
          <a class="mt-2 text-secondary hover:text-secondary_dark hover:underline text-opacity-90" href="#top">
              Don't have an account?
          </a>
      </div>
  </div>
</section> 