<script>
  export let userProp;
  export let functionProp;
</script>

<tr>
  <td
    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
  >{userProp.id}</td>
  <td
    class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
  >{userProp.email}</td>
  <td
    class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
  >{userProp.password}</td>
  <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
    <button 
      type="submit" 
      class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
      on:click={() => functionProp(userProp.id)}
    >
      Delete
    </button>
  </td>
</tr>