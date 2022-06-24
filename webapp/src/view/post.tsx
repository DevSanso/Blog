import React,{useState} from 'react';


import PageHeader from '@app/widget/PageHeader';
import * as local from'@lib/storage/storage';
import {post as restGet,ResponseBody} from '@lib/rest/post';
import root from '@lib/init/ui';

const closeImg = require("@assets/image/material-close.png");

type State = ResponseBody | null

const Post = () => {
    const [data,setData] = useState<State>(null);
    const id = local.getPostId();

    const setEmptyBody = () => {
        setData({
            title : "empty",
            date : (new Date()).toString(),
            content : "<div>empty</div>",
            img : {
                data : null
            }
        });
    }

    const restConnection = async() => {
        if(id == null){
            setEmptyBody();
            return;
        }
        const body = await restGet(location.host,id as string);
        if(body == null) {
            setEmptyBody();
            return;
        }
        setData(body);
    };

    const renderBody = () => {
        if(data == null)
            return (<div>loading...</div>);
        
        return (
            <section>
                <PageHeader
                    title={data.title}
                    hint={data.date}
                    headerImg={data.img != null?data.img : closeImg}
                />
                <div dangerouslySetInnerHTML={{__html : data.content}}></div>
            </section>
        );
    };

    restConnection();
    return (
        <div>
            {renderBody()}
        </div>
    );
};


root.render(<Post></Post>)