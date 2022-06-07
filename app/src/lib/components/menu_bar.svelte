<section class="bar">
    {#if !isOpenList}
        <img class="menu" width="30px" height="30px" alt="menu" src="./image/material-menu-icon.png" on:click={switchIsOpen}>
    {:else}
        <aside  class="href-menu" >
            <img class="menu" width="30px" height="30px" alt="menu" src="./image/material-menu-icon.png" on:click={switchIsOpen}>
            <div style="height : 50px;"></div>
            <div  data-simplebar  bind:this={menuElement}>
                {#each icons as item}
                    <nav class="scroll-item" on:click={hrefAction(item.url)}>
                        <img width="30px" height="30px" alt={item.name} src={item.iconUrl}>
                        <span>{item.name}</span>
                    </nav>
                {/each}
            </div>
        </aside>
    {/if}
</section>

<style scoped>
    .bar {
        width : 100%;
        height : 36px;
        background-color: #F8B400;
        position: relative;
        border-radius:100px;
    }
    .menu {
        position: absolute;
        right: 2%;
    }
    .menu:hover {
        cursor : pointer;
    }
    .href-menu{
        width : 250px;
        height : 300px;
        background-color: #FEF9A7;
        position: absolute;
        right : 2%;
        z-index : 1;
    }
    nav.scroll-item:hover {
        cursor: pointer;
        background-color: #F77E21;
    }
    nav.scroll-item {
        overflow-x: hidden;
        width: 100%;
        margin-top: 10px;

    }
    nav.scroll-item > *{
        vertical-align: middle;
        margin-left: 10px;
        margin-right: 10px;
        
    } 
    nav.scroll-item > span {
        margin-left: 60px;
    }
    .href-menu > div {
       height : 250px;
    }
</style>

<script context="module" lang="ts">

    export interface IconShortcut{
        iconUrl : string,
        name : string
        url : string
    }
    const createUrl = (loc : Location,path : string) => {
        return (new URL(loc.host,path)).toString();
    }
    const hrefAction = (path : string) : null => {
        location.href = createUrl(location,path);
        return null;
    }

</script>

<script lang="ts">
    import {  tick } from 'svelte';
    import  SimpleBar from "simplebar";



    import 'simplebar/dist/simplebar.css';


    let isOpenList : boolean = false;
    let menuElement : HTMLDivElement;
    let bar : SimpleBar | undefined;
    export let icons : Array<IconShortcut> = new Array<IconShortcut>();

    const setIsOpenList = (d : boolean) => isOpenList = d;
    const getIsOpenList = () : boolean => isOpenList;
    
    const isOpenListAction = () => setIsOpenList(!getIsOpenList());
    const newSimpleBar = () => new SimpleBar(menuElement);

    const switchIsOpen =async () => {
        isOpenListAction();
        if(isOpenList) {
            await tick();
            bar = newSimpleBar();
        }else {
            (bar as SimpleBar).unMount();
            bar = undefined;
        }
    }
    const makeScrollBar = () => newSimpleBar();


    
    
</script>