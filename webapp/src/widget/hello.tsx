import React from 'react';
import helloWorld from '@lib/print';



class HelloText extends React.Component {
    public render() {
        return (
            <div>{helloWorld()}</div>
        );
    }
}


export default HelloText;