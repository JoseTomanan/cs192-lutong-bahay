<script lang="ts">
  let username = "testuser"
  import { usernameStore } from "$lib/stores/auth";
</script>

<h1 class="title-text">Saved</h1>

<p>{$usernameStore}</p>

