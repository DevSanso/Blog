<section class="post-shortcut" on:click={chkEvent}>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img alt="post image" width="300px" height="240px" src={img}>
    <div>
        <header>{getProcessingTitle()}</header>
    </div>
</section>


<style>
    section.post-shortcut {
        width : 1150px;
        height : 290px;
        margin-left: 65px;
        background-color: #D9D9D9;
        border-radius: 20px;
        
    }
    section.post-shortcut:hover {
        cursor: pointer;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    }
    section.post-shortcut > * {
        float : left;
        overflow: hidden;
        vertical-align: middle;
    }
    section.post-shortcut > img {
        margin-top : 25px;
        width : 300px;
        height : 240px;
        margin-left: 20px;
    }
    section.post-shortcut > div {
        margin-top : 10px;
        margin-left: 30px;
    }
    section.post-shortcut > div> header {
        font-size : 38px;
        margin-top: 40px;
    }
</style>


<script lang="ts">
    

    const titleMaxLen = 128;
    const contentMaxLen = 256;

    export let title : string;
    export let img : string =  "/image/material-close.png";
    export let id : string;


    const chkStrLen = (s : string,len : number) => {
        if(s.length <= len)return true;
        return false;
    };

    const cutString = (origin : string, len : number) => {
        return origin.slice(0,len);
    };
    const addPunctuationString = (origin : string) => `${origin}...`;

    const processTitle = () => {
        if(!chkStrLen(title,titleMaxLen)) 
            return addPunctuationString(cutString(title,titleMaxLen));
        return title;
    };



    const getProcessingTitle = () => {
        return processTitle();
    };





    const chkEvent = () => {};

</script>