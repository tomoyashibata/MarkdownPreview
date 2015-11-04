import React     from 'react';
import Marked    from 'marked';
import _         from 'lodash';

/**
 * 新規コメント投稿Form
 */
export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCommentText : ''
        };
    }

    componentDidMount() {
        this.setState({
            newCommentTextLength: this.state.newCommentText.length,
            newCommentTextLines : this._getTextLines(this.state.newCommentText)
        });
    }

    _changeNewCommentText(e) {
        var commentText = e.target.value

        this.setState({
            newCommentText      : commentText,
            newCommentTextLength: commentText.length,
            newCommentTextLines : this._getTextLines(commentText)
        })
    }

    _getTextLines(s) {
        return s.split('\n').length;
    }

    render() {
        var markedCommentText = Marked(this.state.newCommentText, { sanitize: true });
        var lineNumbers       = this.state.newCommentTextLines;

        return (
            <div id="commentForm">
                <div id="commentForm__box-edit-tag">
                    <input type="text" />
                </div>
                <div id="commentForm__wrapper-edit" className="md-horizontal">
                    <h2>New comment</h2>
                    <div id="commentForm__wrapper-edit__box-edit">
                        <div id="commentForm__wrapper-edit__box-edit__box-line-numbers" className="md-horizontal">
                            {_.range(0, this.state.newCommentTextLines).map(l => <span className="l-line-number">{l+1}</span>)}
                        </div>
                        <textarea id="commentForm__wrapper-edit__box-edit__textarea" onChange={this._changeNewCommentText.bind(this)} />
                    </div>
                </div>
                <div id="commentForm__box-preview" className="md-horizontal">
                    <h2>Realtime preview</h2>
                    <span dangerouslySetInnerHTML={{__html: markedCommentText}} />
                </div>
            </div>
        );
    }
}
