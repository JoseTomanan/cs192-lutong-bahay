<script lang="ts">
	import { goto } from "$app/navigation";
  import { isAuthenticated, setAuth } from '$lib/stores/auth'
  import { onMount } from "svelte";
  import { usernameStore } from '$lib/stores/auth';
  import BarLoader from "$lib/components/BarLoader.svelte";

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  let username = '';
  let password = '';
  let confirm_password = '';
  let error = '';
  let loading = false
  
  let loginMethods = [
      {name: 'Google', icon: '/google.webp', loginFunction: loginWithGoogle}, 
      {name: 'Facebook', icon: '/facebook.png', loginFunction: ()=>{}}, 
  ] 

  

  onMount(async () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get("access_token");

    if (accessToken) {
        // console.log("Google Access Token:", accessToken);
        await handleGoogleLogin(accessToken);
    } else {
        console.log("No access token found!");
    }
  });

  async function handleSubmit() {
    loading = true
    try { 
      const response = await fetch(`${baseUrl}/api/users/add-user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirm_password })
      }); 


      const data = await response.json();
      const success = data.success 
      const message = data.message

      console.log(data)

      if (!success) {
        alert(data.message)
      } else {
        // alert(message)
        goto('/login')
      }       
    } catch (err) {
      alert('No database connection')
    } finally {
      loading = false
    }
  }

  function loginWithGoogle() {
    const clientId = '408545476434-o2bvopje0mbmad7blibvl0l2pkm7g1kp.apps.googleusercontent.com'
    const redirectUri = "http://localhost:5173"; // Change if needed

    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=email%20profile`;

    window.location.href = authUrl;
  }

  
  async function handleGoogleLogin(accessToken: string) {
    try { 
      console.log("\ngoogleFunction called\n")
      console.log("Google Access Token:", accessToken)
      const response = await fetch(`${baseUrl}/auth/social/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider: "google", access_token: accessToken })
      });

      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      

      if (data.key) {
        console.log("Django Token:", data.key);
        localStorage.setItem("authToken", data.key);
        console.log("Stored Token:", localStorage.getItem("authToken"));
        setAuth(true)
        goto('/recipes') 
        // setTimeout(() => {
        //           window.location.href = "http://localhost:5173/home";
        //       }, 2000);  // 500ms delay
        // // window.location.href = "/home"; // Redirect after login
      }
      
      
    } catch (err) {
      console.error('Login failed')
    }
  }
</script>




{#if loading}
  <BarLoader />
{/if}



<section class="bg-gradient-to-b from-lime-100 to-lime-200">
  <div
    class="w-full flex flex-col justify-center max-w-xl space-y-3 rounded-lg 
    px-12 py-12 shadow-xl border-gray-200 border
    bg-gradient-to-br from-white to-gray-50"
  >
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <h1
        class="text-4xl font-bold mb-7 text-stone-600 bg-gradient-to-br pb-0.5 from-main_dark to-stone-600 text-transparent bg-clip-text"
      >Register an account</h1>
      <div class="space-y-2">  
        <input
          type="text"
          bind:value={username}
          placeholder="Username or email"
          class="space-y-2 w-full rounded border p-2 hover:border-gray-700 focus:shadow-md"
          required
        />
        <input
          type="password"
          bind:value={password}
          placeholder="Password" 
          class="space-y-2 w-full rounded border p-2 focus:outline-gray-700 focus:ring-0 hover:border-gray-700 focus:shadow-md"
          required
        />
        <input
          type="password"
          bind:value={confirm_password}
          placeholder="Confirm password" 
          class="space-y-2 w-full rounded border p-2 focus:outline-gray-700 focus:ring-0 hover:border-gray-700
          focus:shadow-md"
          required
        />
      </div>
      <button type="submit" class="w-full rounded bg-stone-600 hover:shadow-md p-2 text-white hover:bg-stone-400">
        Sign up
      </button>
      <div class="flex items-center justify-center pt-4 pb-2">
        <hr class="flex-grow border-gray-200">
        <span class="px-4 text-gray-400">
          OR
        </span>
        <hr class="flex-grow border-gray-200">
      </div>
    </form>

    <div class="space-y-3 flex flex-col items-center ">
      {#each loginMethods as {name, icon, loginFunction}} 
        <button
          type="submit"
          class="w-full rounded-full hover:border-gray-700 bg-white p-2 text-gray-700 border hover:bg-gradient-to-br
          hover:from-gray-50 hover:to-gray-100 flex items-center gap-3 justify-center hover:shadow-md"
          on:click={loginFunction}
        >
          <img src={icon} alt={name} class="w-6 h-6">
          Sign in with {name}
        </button>  
      {/each}   
    </div> 

      <div class="flex justify-end"> 
        <a
          class="mt-2 text-gray-800 hover:text-gray-900 hover:underline text-opacity-90"
          href="/login"
        >Have an account?</a>
      </div>
  </div>
</section> 

<style>
  .animate-pulse {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
