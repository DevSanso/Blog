<script lang="ts">
    import MenuBar from "$lib/components/menu_bar.svelte";
    import SearchBar from '$lib/components/search_bar.svelte';
    import appConfig from "$lib/config/app.json";
</script>


<svelte:head>
    <title>{appConfig.title}</title>
</svelte:head>

<MenuBar/>
<header class="header">
    <img width="100%" height="100%" alt="header" src="./image/background.jpg"/>
    <p>{appConfig.title}</p>
</header>
<nav class="search">
    <SearchBar searchEvent={(d)=> {
        console.log(d);
        return  undefined;
    }}></SearchBar>
</nav>
<main></main>

<style>
    .header {
        position: relative;
        width : 100%;
        height : 360px;
        margin-top : 50px;
        
    }

    .header > p {
        position : absolute;
        top : 50%;
        left : 50%;
        transform: translate(-50%,-50%);
        font-size : 64px;
        margin : 0;
        margin-top: 30px;
    }
    .search {
        margin-top : 100px;
        margin-bottom : 100px;
    }
</style>


