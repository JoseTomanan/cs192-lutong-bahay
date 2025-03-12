<script>
	import TitleText from "$lib/components/TitleText.svelte";

    
    let cookieString = document.cookie;
    let pairs = cookieString.split(";");
    let splittedPairs = pairs.map(cookie => cookie.split("="));
    const cookieObj = splittedPairs.reduce(function (obj, cookie) {
        obj[cookie[0]] = cookie[1];
    return obj;
    }, {})
    let username = cookieObj["username"];
</script>

<TitleText text={`Welcome, ${username}!`}/>