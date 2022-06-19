import React,{useState} from 'react';

import '@assets/css/view/search.css';

import SearchBox from '@app/widget/SearchBox';
import PostSimpleBox from '@app/widget/PostSimpleBox';
import {search, emptyBody,ResultElement} from '@lib/rest/search_post';
import {redirectPostPage} from '@lib/redirect/post';
import * as local from '@lib/storage/storage';
import root from '@lib/init/ui';


const SearchView = () => {
    const [searchBody,setSearchBody] = useState(emptyBody);
    const [searchText,setSearchText] = useState(local.getSearchTitle());
    local.setSearchTitle("");

    const makePostBox = (element : ResultElement,clickAction : (data : any)=> undefined) : JSX.Element  => {
        return (
            <section>
                <PostSimpleBox
                    title={element.title}
                    date={element.date}
                    content={""}
                    onClick={clickAction}
                />
            </section>
        );
    };

    const postBoxClkAction = (id : string) : (data : any)=> undefined => {
        return ((data : any) => {
            redirectPostPage(location.host,id);
            return undefined;
        });
    };

    const renderPostBoxsAction = () => {
        if(searchBody.length == 0)return "";
        return searchBody.map(value => makePostBox(value,postBoxClkAction(value.id)));
    };
    const startSearchAction = async() => {
        let res = await search(searchText);
        setSearchBody(res);
    };
    const searchBoxEventAction = (item : string) : undefined=> {
        setSearchText(item);
        startSearchAction();
        return undefined;
    }
    startSearchAction();
    return (
        <div>
            <SearchBox onSearchClick={searchBoxEventAction}/>
            {renderPostBoxsAction()}
        </div>
    );
}


root.render(<SearchView/>);