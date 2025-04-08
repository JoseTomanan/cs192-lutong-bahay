<script lang="ts">
  import { usernameStore } from '$lib/stores/auth';
  import Cookies from "js-cookie"
</script>



{#if ($usernameStore) != ""}
  <h1 class="title-text">Welcome, {Cookies.get("username")}!</h1>
{:else}
  <h1 class="title-text">Welcome back!</h1>
{/if}

<h2 class="italic text-gray-400 pt-1 pb-2">
  What would you like to do?
</h2>

<pre class="text-gray-500 mt-4">
  ⠀ ／l、
  （ﾟ､ ｡ ７
  ⠀ l、ﾞ ~ヽ
    じしf_, )ノ
</pre>