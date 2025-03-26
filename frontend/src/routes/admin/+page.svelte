<script>
    import TitleText from "$lib/components/TitleText.svelte";
    
    let username = "";
    let isLoading = false;

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }
    
    async function suspendUser() {
        try {
            const response = await fetch('http://localhost:8000/api/users/suspend-user/', {
                method: 'POST', 
                credentials: 'include',
                headers: {
                    'X-CSRFToken': getCookie("csrftoken"),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username})
            });

            alert(`${username} suspended`)
        } catch {
            alert(`failed to suspend ${username}`)
        } 
    }

    async function reactivateUser() {
        try {
            const response = await fetch('http://localhost:8000/api/users/activate-user/', {
                method: 'POST', 
                credentials: 'include',
                headers: {
                    'X-CSRFToken': getCookie("csrftoken"),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username})
            });

            alert(`${username} reactivated`)
        } catch {
            alert(`failed to reactivate ${username}`)
        } 
    }

</script>

<TitleText text={`Admin`}/>

<div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">User Management</h2>
    
    <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input 
            id="username"
            type="text" 
            bind:value={username}
            placeholder="Enter username"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
    </div>
    
    <div class="flex space-x-4">
        <button 
            on:click={suspendUser}
            disabled={isLoading}
            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
            Suspend User
        </button>
        
        <button 
            on:click={reactivateUser}
            disabled={isLoading}
            class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
            Reactivate User
        </button>
    </div>
    
    {#if isLoading}
        <div class="mt-4 text-center text-gray-500">
            Processing...
        </div>
    {/if}
</div>

<!-- <pre class="text-gray-500 mt-4">
⠀ ／l、         
（ﾟ､ ｡ ７     pagod na ako
⠀ l、ﾞ ~ヽ      
  じしf_, )ノ
</pre> -->