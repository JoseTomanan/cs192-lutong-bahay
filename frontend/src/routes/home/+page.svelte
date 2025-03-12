<script lang="ts">
    import TitleText from "$lib/components/TitleText.svelte";
    import { onMount } from 'svelte';

    function getCookie(name: String) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }

    // onMount(() => {
    //     cookieString = document.cookie;
    //     let pairs = cookieString.split(";");
    //     let splittedPairs = pairs.map(cookie => cookie.split("="));
    //     const cookieObj = splittedPairs.reduce(function (obj, cookie) {
    //         obj[cookie[0]] = cookie[1];
    //         return obj;
    //     }, {})
    //     let username = cookieObj["username"];
    //     console.log(username);
    // });
    
    
</script>

<TitleText text="Welcome {getCookie("username")}!"/>

<pre class="text-gray-500 mt-4">
    ⠀ ／l、
    （ﾟ､ ｡ ７   
    ⠀ l、ﾞ ~ヽ
      じしf_, )ノ
</pre>

