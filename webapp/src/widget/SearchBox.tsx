import React,{FormEvent,useState} from 'react';
import "@assets/css/widget/SearchBox.css";


interface Props {
    onSearchClick : (search : string) => undefined
}


const SearchBox =(props : Props) => {
    const [inputData,setInputData] = useState("");

    const inputAction = (e : FormEvent<HTMLInputElement>) => setInputData(e.currentTarget.value);
    const btnAction =() => props.onSearchClick(inputData);

    return (
        <nav area-search-box="">
            <input onChange={inputAction}/>
            <button onClick={btnAction}>search</button>
        </nav>
    );
}

export default SearchBox;