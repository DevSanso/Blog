<div class="editor">
    <header>
        <img width="900px" alt="post image" height="300px" src={imageData} on:click={chkImage}>
        <input class="title" bind:this={titleInputElement} placeholder="제목">
    </header>
    <textarea bind:value={contentData}></textarea>
    <nav class="buttons">
        <button on:click={btnBack}>Back</button>
        <button>Push</button>
    </nav>
    <input type="file" style="opacity : 0" bind:this={fileDialogElement} on:change={changePostImage}>
    
</div>

<style>
    div.editor > header > img {
        margin-left: 190px;
        margin-right : 190px;
        margin-bottom: 100px;
        margin-top : 100px;
        border-style: solid;
    }
    div.editor > header > img:hover {
        cursor: pointer;
        border-color: coral;
    }
    div.editor > textarea {
        height : 500px;
        width : 100%;
        margin-top : 100px;
        margin-bottom: 100px;
        overflow-y: scroll;
        resize : none;
        font-size : 21px;

    }
    input.title {
        height : 56px;
        width : 1180px;


        border-radius: 100px;
        padding-left : 50px;
        padding-right : 50px;

        font-size : 48px;

    }
    div.editor > nav {
        width : 100%;
        height : 80px;
    }
    div.editor > nav  > button {
        width: 240px;
        margin-left: 220px;
        margin-right: 100px;
        height : 80px;
        font-size : 36px;
        border-radius: 30px;
    }
    div.editor > nav  > button:hover {
        cursor: pointer;
    }
</style>

<script lang="ts">
    import axios from 'axios';

    let imageData : string = "/image/material-close.png";
    let contentData : string = "";
    let fileDialogElement : HTMLInputElement;
    let titleInputElement : HTMLInputElement;

    const getFileBlob = (fl : FileList) => fl[0].slice();
    const chkImageData = (imgData : string) => imgData == "/image/material-close.png" ? undefined :imgData;
    const makeHtmlTagFromTextareaValue = (value : string) => `<div>${value}</div>`;
    const makePostJson = (img : string | undefined,title : string, content : string) => {
        if(img == undefined)return {titile : title,content : content};
        return {img : img as string,title: title,content : content};
    }

    const uploadImage = async() => {
        let fl = fileDialogElement.files;
        if(fl== null)return;
        
        let file = getFileBlob(fl);
        if(file == undefined)return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            imageData = reader.result as string;
        }
        reader.readAsDataURL(file);
        
        
    }
    

    const redirectRoot = () => {
        location.href = "/";
    }
    const pushPostToServer = async () => {
        let imgData = chkImageData(imageData);
        let contentEle = makeHtmlTagFromTextareaValue(contentData);
        let body = makePostJson(imageData,titleInputElement.value,contentEle);
        let res = await axios.post("/post/editor",body,{withCredentials : true});

        if(res.status != 302) {
            alert(`status code : ${res.status}`);
            location.href = "/";
            return;
        }
        location.href = res.headers["Location"];
    }

    const fileDialog = () => fileDialogElement.click();
    const chkImage = () =>  fileDialog();




    const changePostImage = () => {
        uploadImage();
    }
    const btnBack = () => redirectRoot();
    const btnPush = () =>pushPostToServer(); 
</script>