<nav class="search-bar">
    <input bind:this={inputElement} on:input={inputEvent}>
    <button on:click={btnEvent}>search</button>
</nav>


<style>
    .search-bar  {
        width : 100%;
        height : 72px;
        text-align: center;
        position: relative;
    }

    .search-bar  > input {
        width : 900px;
        height : 72px;
        background-color: #FF6363;
        border : none;
        border-radius: 100px;
        font-size : 42px;
        padding-left: 50px;
        padding-right : 100px;
        display : inline-block;
        text-align: left;
    }
    .search-bar  > button {
        position :absolute;
        right: 130px;
        width : 56px;
        height : 56px;
        margin-top :8px;
        border-radius: 100px;
        border : none;
    }
    .search-bar  > button:hover {
        cursor: pointer;
    }
</style>

<script lang="ts">
    let inputValue : string = "";
    let inputElement : HTMLInputElement;
    export let searchEvent : (inputData : string) => undefined;

    const getInputValue = () => inputValue;
    const setInputValue = (d : string) => inputValue = d;
    const updateInput = ()  => setInputValue(inputElement.value);
    const searchAction = () => searchEvent(getInputValue());

    const inputEvent = () => {
        updateInput();
        return undefined;
    };

    const btnEvent = () => {
        searchAction();
        return undefined;
    };
</script>
