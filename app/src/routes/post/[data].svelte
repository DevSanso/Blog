<section class="post">
    <div class="header-border"></div>
    <header>
        <img alt="image" width="900px" height="400px" src={getImgWithResponse()}>
        <h3>{getTitleWithResponse()}</h3>
        <p class="date">{getDateWithResponse()}</p>
    </header>
    <section class="content">
        {getContentWithResponse()}
    </section>
</section>


<style>
    div.header-border {
        width : 100%;
        height : 20px;
        margin-bottom: 50px;
        background-color: black;
    }
    section.post > header {
        margin-bottom: 100px;
    }
    section.post > header > img {
        margin-left: 190px;
        margin-bottom: 100px;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    }
    section.post > header > h3 {
        font-size : 64px;
        text-align: center;
        margin : 0;
    }
    section.post > header > p {
        font-size : 24px;
        text-align: right;
    }
    section.post > section {
        min-height : 400px;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
        font-size : 28px;
        padding: 50px;
        word-break: break-all;
    }
</style>

<script lang="ts" context="module">
     interface PageData {
        id : string
    }

    interface ResponseBody {
        img : string,
        title : string
        date : string,
        content : string
    }
</script>


<script lang="ts">
    import {page} from '$app/stores';

    import axios from 'axios';
    import type {AxiosResponse} from 'axios';
    import SearchBar from '$lib/components/search_bar.svelte';
    import PostShortcut from '$lib/components/post_shortcut.svelte';
    const searchHref = "/search";

    let loading = true;
    let post : ResponseBody = {
        "title" : "hello world",
        "date" : "1997-01-01:23:23:23",
        "img" : "/image/material-close.png",
        "content": "hello world"
    }


 

    const chkDataProps = (data : PageData) => {
        return typeof data === 'string'
    };

    const makeGetUrl= (url : string,title : string) => `${url}?id=${title}`;
    const convertResBody = (res : AxiosResponse<any,any>) => res.data as ResponseBody;
    const isOkStatusCode = (res : AxiosResponse<any,any>) => res.status == 200;



    const startSearchContent = async (data : PageData) => {
        if(!chkDataProps(data))
            throw `wrong search component data : ${JSON.stringify(data)}`;
        
        const res = await axios.get(makeGetUrl("/post",data.id));

        if(!isOkStatusCode(res)){
            throw `error (http code : ${res.status}`;
        }else {
            post = convertResBody(res);
        }
        loading = false;
    };


    const  returnDataWithBody= <T extends keyof ResponseBody>(t  : T) => post[t];

    const getTitleWithResponse = () => returnDataWithBody("title");
    const getDateWithResponse = () => returnDataWithBody("date");
    const getContentWithResponse= () => returnDataWithBody("content");
    const getImgWithResponse = () => returnDataWithBody("img");

    page.subscribe(value => {});
    //page.subscribe(value =>  startSearchContent(JSON.parse(value.params["data"])));
    
</script>