<section class="search">
    <nav>
        <SearchBar searchEvent={evSearch}></SearchBar>
    </nav>
    {#if loading}
        <div class="searching">
            searching...
        </div>
    {:else}
       {#each getBodyData() as item}
            <div  class="shortcut">
                <PostShortcut title={item.title} img={item.img} id={item.id}></PostShortcut>
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

<script lang="ts" context="module">
    interface PageData {
        title: string
    }

    interface ResponseElement {
         title : string,
         id : string,
         img : string
    }
    type ResponseBody = Array<ResponseElement>;
</script>


<script lang="ts">
    import {page} from '$app/stores';

    import axios from 'axios';
    import type {AxiosResponse} from 'axios';
    import SearchBar from '$lib/components/search_bar.svelte';
    import PostShortcut from '$lib/components/post_shortcut.svelte';
    const searchHref = "/search";

    let loading = true;
    let posts : ResponseBody

    const chkDataProps = (data : PageData) => {
        return typeof data.title === 'string'
    };

    const makeGetUrl= (url : string,title : string) => `${url}?title=${title}`;
    const convertResBody = (res : AxiosResponse<any,any>) => res.data as ResponseBody;
    const isOkStatusCode = (res : AxiosResponse<any,any>) => res.status == 200;
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


    const startSearchContent = async (data : PageData) => {
        if(!chkDataProps(data))
            throw `wrong search component data : ${JSON.stringify(data)}`;
        
        const res = await axios.get(makeGetUrl("/search",data.title));

        if(!isOkStatusCode(res)){
            posts = new Array();
            
        }else {
            posts = convertResBody(res);
        }
        loading = false;
    };
    const returnBodyData = () => posts;
    const  getBodyData = () => returnBodyData();

    page.subscribe(value => {});
    //page.subscribe(value =>  startSearchContent(JSON.parse(value.params["data"])));
    
</script>