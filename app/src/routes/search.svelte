<section class="search">
    <nav>
        <SearchBar searchEvent={searchEventHandler}></SearchBar>
    </nav>
    {#if loading}
        <div class="searching">
            searching...
        </div>
    {:else}
       {#each getBodyData() as item}
            <div  class="shortcut">
                <PostShortcut title={item.title} img={"/image/background.jpg"} id={item.id}></PostShortcut>
            </div>
       {/each}
    {/if}
</section>


<style>
    section.search {
        min-height: 60vh;
    }
    section.search > nav {
        margin-top : 100px;
        margin-bottom: 200px;
    }
    section.search > div.searching {
        width: 100%;
        text-align: center;
        font-size : 52px;
    }
    div.shortcut {
        margin-top : 100px;
        margin-bottom: 100px;
    }
</style>




<script lang="ts">
    import {onMount} from 'svelte';
    import SearchBar from '$lib/components/search_bar.svelte';
    import PostShortcut from '$lib/components/post_shortcut.svelte';
    import restApi from '$lib/restapi/search';
    import * as storage from '$lib/storage/local';

    let elements : Array<{title : string,date : string, id : string}>;
    let loading = false;
    

    const makeRestBody = (title : string) => {return {title : title}};

    const searchEventHandler =(data : string) =>  {
        storage.setItem("search","title",data);
        location.reload();
        return undefined;
    };
    
    const setElements = (val : Array<{title : string,date : string, id : string}>) => elements = val;
    const setLoading = (val : boolean) => loading = val;
    const searchPost = async() => {
        const title = storage.getltem("search","title");
        let res : Array<{title : string,date : string, id : string}>;

        try {
            res = await restApi(makeRestBody(title as string));
        }catch(e) {
            alert(JSON.stringify(e));
            location.href = "/";
            return;
        }
        setElements(res);
        setLoading(true);
    }
    const getBodyData = () => elements;

    onMount(()=> {
        searchPost();
    });

</script>