<script lang="ts">
    let email = '';
    let password = '';
    let error = '';
    
    let loginMethods = [
        {name: 'Google', icon: '/google.webp'}, 
        {name: 'Facebook', icon: '/facebook.png'}, 
    ] 
    
    async function handleSubmit()
    {
        console.log(email, password)
        try {
            const response = await fetch('http://localhost:8000/api/index/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            console.log(data)
            
            if (!response.ok) {
                const data = await response.json();
                error = data.error;
                return;
            }
            
            const { token } = await response.json();
            localStorage.setItem('token', token);
            // goto('/dashboard');
        }
        
        catch (err) {
            error = 'Login failed';
            console.log(error)
        }
    } 
</script>

<section 
    class="flex min-h-screen items-center justify-center bg-gradient-to-br bg-white"
>
    <div
        class="bg-white w-full flex flex-col h-5/6 justify-center max-w-xl space-y-3 rounded-lg px-12 py-12 shadow-xl border"
        style="background: url(/liempo_edited.xpng); background-size:cover"
    >
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <h1 class="text-4xl font-bold -mb-4 text-emerald-800">
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
                    class="space-y-2 w-full rounded border p-2"
                    required
                />
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
            <a class="mt-2 text-blue-500 hover:text-blue-700 hover:underline" href="#top">
                Don't have an account?
            </a>
        </div>
    </div>
</section> 
