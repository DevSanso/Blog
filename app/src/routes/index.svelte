


<svelte:head>
    <title>{appConfig.title}</title>
</svelte:head>

<MenuBar/>
<header class="header">
    <img width="100%" height="100%" alt="header" src="./image/background.jpg"/>
    <p>{appConfig.title}</p>
</header>
<nav class="search">
    <SearchBar searchEvent={evSearch}></SearchBar>
</nav>
<main class="decoration">
    <header class="sub-title">{appConfig.subTitle}</header>
    <span class="blog-explain">{appConfig.blogExplain}</span>
</main>

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
    .decoration > .sub-title {
        width : 100%;
        text-align: center;
        margin-bottom: 50px;
        font-size : 48px;
    }
    .decoration > .blog-explain {
        font-size : 21px;
    }
</style>


<script lang="ts">
    import MenuBar from "$lib/components/menu_bar.svelte";
    import SearchBar from '$lib/components/search_bar.svelte';
    import appConfig from "$lib/config/app.json";

    const searchHref = "/search"


    const makeRouterData = (data : string) => {
        let j = {
            title : data
        };
        return JSON.stringify(j);
    };
    const makeHref = (href : string,data : string) => `${href}/${data}`;

    const searchAction = (data : string) => {
        const d = makeRouterData(data);
        location.href = makeHref(searchHref,d);
    };

    const evSearch = (data : string) : undefined => {
        searchAction(data);
        return undefined;
    };
</script>