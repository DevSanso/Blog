<nav class="login">
    <section>
        <input placeholder="Email"bind:value={emailText}>
        <input placeholder="Password" bind:value={passwordText}>
    </section>
    <nav>
        <button on:click={btnEvent}>Login</button>
    </nav>
</nav>

<style>
    nav.login {
        width : 1100px;
        height : 360px;

        margin-top : 30vh;
        margin-left : 90px;

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

    const makePostUrl = (email : string,password : string) => `email=${email}&password=${password}`;
    
    const btnAction = async() => {
        let body = makePostUrl(emailText,passwordText);
        let res = await axios.post("/login",body);
        if(res.status != 302){
            alert("로그인 실패");
            return;
        }
        const ck = res.headers['set-cookie'] as string[];
        ck.forEach(value => document.cookie = value);
        location.href = "/";
    }
    const btnEvent = () => {
        btnAction();
    }
</script>