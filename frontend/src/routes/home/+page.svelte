<script lang="ts">
    import TitleText from "$lib/components/TitleText.svelte";
    import { usernameStore } from '$lib/stores/auth';

    function getCookie(name: String) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
  }
}
</script>

<!-- // {#if ($usernameStore) != ""} -->
    <TitleText text="Welcome, {getCookie('username')}!"/> 
<!-- // {:else} -->
    <!-- // <TitleText text="Welcome"/>  -->
<!-- // {/if}  -->

<h2 class="italic text-gray-400 pt-1 pb-2"> What would you like to do?</h2>

<pre class="text-gray-500 mt-4">
    ⠀ ／l、
    （ﾟ､ ｡ ７    
    ⠀ l、ﾞ ~ヽ    
      じしf_, )ノ
</pre>

