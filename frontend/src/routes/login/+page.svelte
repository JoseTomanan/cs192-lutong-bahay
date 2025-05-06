<script lang="ts">
  import { goto } from "$app/navigation";
  import { isAuthenticated, setAdmin, setAuth } from '$lib/stores/auth';
  import { onMount } from "svelte";
  import { usernameStore } from '$lib/stores/auth';
  import BarLoader from "$lib/components/BarLoader.svelte";
  import Cookies from 'js-cookie';

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  let username = '';
  let password = '';
  let error = '';
  let loading = false
  let csrfToken = '';

  let loginMethods = [
    { name: 'Google', icon: '/google.webp', loginFunction: loginWithGoogle },
    // { name: 'Facebook', icon: '/facebook.png', loginFunction: () => {} },
  ];

  onMount(async () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get("access_token");

    if (accessToken) {
      await handleGoogleLogin(accessToken);
    }

    await fetch(`${baseUrl}/api/users/csrf/`, {
      method: "GET",
      credentials: "include",
    }).then(res => res.json())
      .then(data => {
        csrfToken = data.csrfToken;
  });

  function getCookie(name: String) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  async function handleSubmit() {
    console.log("js-cookie: " + Cookies.get("csrftoken"))
    console.log("getCookie: " + getCookie("csrftoken"))
    console.log("csrfToken: " + csrfToken)
    loading = true; // Start loading
    try {
      const response = await fetch(`${baseUrl}/api/users/login/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          // 'X-CSRFToken': Cookies.get("csrftoken"),
          // 'X-CSRFToken': getCookie("csrftoken"),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      const success = data.success;
      const message = data.message;
      const admin = data.is_staff;

      if (!success) {
        alert(message);
      } else {
        setAuth(true);
        $usernameStore = username;

        if (admin) {
          setAdmin(true);
          goto('/admin');
        } else {
          goto('/recipes');
        }
      }
    } catch (err) {
      alert('No database connection');
    } finally {
      loading = false; // Stop loading
    }
  }

  function loginWithGoogle() {
    const clientId = '408545476434-o2bvopje0mbmad7blibvl0l2pkm7g1kp.apps.googleusercontent.com';
    const redirectUri = `${window.location.origin}`;

    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=email%20profile`;

    window.location.href = authUrl;
  }

  async function handleGoogleLogin(accessToken: string) {
    loading = true; // Start loading
    try {
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
        localStorage.setItem("authToken", data.key);
        setAuth(true);
        goto('/recipes');
      }
    } catch (err) {
      console.error('Login failed');
    } finally {
      loading = false; // Stop loading
    }
  }
</script>

<!-- Progress Bar -->
{#if loading}
  <!-- <div class="fixed top-0 left-0 w-full h-1.5 bg-secondary animate-pulse"></div> -->
   <BarLoader />
{/if}

<section class="bg-gradient-to-br from-white to-lime-50">
  <div
    class="w-full flex flex-col justify-center max-w-xl space-y-3 rounded-lg 
    px-12 py-12 shadow-xl border-gray-200 border
    bg-gradient-to-br from-white to-gray-50"
  >
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <h1 class="text-4xl font-bold -mb-4 text-main bg-gradient-to-br pb-0.5 from-main to-lime-600 text-transparent bg-clip-text">
        Lutong Bahay
      </h1>
      <h2 class="text-gray-600 pb-5 text-lg italic">
        Your database for Filipino recipes
      </h2>
      
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
          class="space-y-2 w-full rounded border p-2 focus:outline-gray-700 focus:ring-0 hover:border-gray-700
          focus:shadow-md"
          required
        />
      </div>

      <button type="submit" class="w-full rounded bg-main hover:shadow-md p-2 text-white hover:bg-main_dark">
        Log in
      </button>
      
      <div class="flex items-center justify-center pt-4 pb-2">
        <hr class="flex-grow border-gray-200">
        <span class="px-4 text-gray-400">OR</span>
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
      <a class="mt-2 text-gray-800 hover:text-gray-900 hover:underline text-opacity-90" href="/register"> 
        Don't have an account? 
      </a>
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
