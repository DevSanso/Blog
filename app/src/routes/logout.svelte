<div>
    <form  bind:this={formElement} method="post" action="/user/logout">
    </form>
</div>


<script lang="ts">
    let formElement : HTMLFormElement;
    import {onMount} from 'svelte';

    onMount(() => {formElement.submit();});
</script>