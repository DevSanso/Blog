import React,{Component} from 'react';
import "@assets/css/widget/PostSimpleBox.css";



interface Props {
    title : string
    date : string
    content : string
    onClick : (data : Omit<Props,"onClick">) => undefined
}

class PostSimpleBox extends Component<Props,{}> {
    public constructor(props : Props) {
        super(props);
    }
    private convertData = (p : Props) => p  as Omit<Props,"onClick">;
    private getPropsAction = () => this.convertData(this.props);
    private ckAction = () => {
        this.props.onClick(this.getPropsAction())
    }

    public render = () => (
        <div area-post-simeple-box="" onClick={this.ckAction}>
            <header>
                <span className="title">{this.props.title}</span>
                <span className="date">{this.props.date}</span>
            </header>
            <section>{this.props.content}</section>
        </div>
    )
}

export default PostSimpleBox;
