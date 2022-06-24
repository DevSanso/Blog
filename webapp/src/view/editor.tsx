import React,{createRef,useEffect,useState} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import {editorPost} from '@lib/rest/editor';
import root from '@lib/init/ui';

const closeImage = require("@assets/image/material-close.png");


const quillConfig = {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
};

const emptyTags : Array<string>= [];

const EditorView = () => {
    const editorRef = createRef<HTMLElement>();

    const [quill,setQuill] = useState<Quill | null>(null);
    const [headerImage,setHeaderImage] = useState<string>("");
    const [headerTitle,setHeaderTitle] = useState<string>("");
    
    const makeRequestBody = (title : string,img : string, tags : Array<string>,content : string) => {
        return {
            "title" : title,
            "img" : img,
            "tags" : tags,
            "content" : content
        };
    };

    const getContentConvertedHtmlFromQuill = (q : Quill) => q.root.innerHTML

    const createEditorElement =() => {
        const q = new Quill(editorRef.current as HTMLElement,quillConfig);
        setQuill(q);
    };
    const moveLocation = (url : string) => location.href = `${location.host}${url}`;

    const sendToServerAction = () => {
        const title = headerTitle;
        const image = headerImage;
        const content = getContentConvertedHtmlFromQuill(quill as Quill);
        const reqBody = makeRequestBody(title,image,emptyTags,content);

        editorPost(reqBody)
        .then((value)=> moveLocation(value))
        .catch((err) => {throw err;});
    };

    const moveRootAction = () => {
        moveLocation("/");
    };

    useEffect(() => {
        createEditorElement();
    },[]);

    return (
        <div>
            <header>

            </header>
            <section ref={editorRef}></section>
            <nav>
                <button onClick={moveRootAction}>Back</button>
                <button onClick={sendToServerAction}>Send</button>
            </nav>
        </div>
    )
}

root.render(<EditorView></EditorView>);