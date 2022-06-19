import React,{Component} from 'react';
import "@assets/css/widget/PageHeader.css";

interface Props {
    headerImg : string
    title : string
    hint : string
}


class PageHeader extends Component<Props> {

    public constructor(props : Props) {
        super(props);
    }

    public render() {
        return (
            <div area-page-header="">
                <header>
                    <img width="100%" height="100%" src={this.props.headerImg}></img>
                </header>
                <section>
                    {this.props.title}
                </section>
                <footer>
                    {this.props.hint}
                </footer>
            </div>
        );
    }
}

export default PageHeader;