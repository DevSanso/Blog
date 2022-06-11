<nav class="login">
    <section>
        <input placeholder="Email"bind:value={emailText}>
        <input placeholder="Password" type="password" bind:value={passwordText}>
    </section>
    <nav>
        <button on:click={btnEvent}>Login</button>
    </nav>
    <form bind:this={formElement} style="opacity : 0;" action="/user/login" method="post">
        <input placeholder="Email"bind:value={emailText} name="email">
        <input placeholder="Password" type="password" bind:value={passwordText} name="password">
    </form>
</nav>

<style>
    nav.login {
        width : 1100px;
        height : 360px;

        margin-top : 30vh;
        margin-left : 90px;
        margin-bottom: 30vh;

        overflow: hidden;
    }
    
    nav.login > *  {
        float :left;
        overflow: hidden;
    }
    nav.login > section  {
        width : 900px;
    }
    nav.login > section  > input {
        width : 700px;
        height : 52px;
        background-color: #FF6363;
        border : none;
        border-radius: 100px;
        font-size : 42px;
        padding-left: 50px;
        padding-right : 100px;
        display : inline-block;
        text-align: left;
        margin-bottom: 20px;
    }
    nav.login > nav > button {
        width : 200px;
        height : 50px;
        font-size : 36px;
        border-radius: 30px;
    }
</style>

<script lang="ts">
    import axios from 'axios';

    let emailText = "";
    let passwordText = "";

    let formElement : HTMLFormElement;
    
    const btnAction = async() => {
        formElement.submit();
    }
    const btnEvent = () => {
        btnAction();
    }
</script>