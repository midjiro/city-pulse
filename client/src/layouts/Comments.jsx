import React, { createContext } from 'react';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { Comment } from 'components/excerpts/Comment';

export const CommentContext = createContext(null);

export const Comments = ({ publication, user }) => {
    const commentList = publication.comments;

    const comments = commentList.map((comment) => (
        <Comments.ListItem
            id={comment._id}
            commentAuthor={comment.by}
            content={comment.content}
            key={comment._id}
        />
    ));

    return (
        <CommentContext.Provider value={{ publication, commentList, user }}>
            <section className="comments publication__comments">
                <Comments.Form />
                <Comments.List isEmpty={commentList.length === 0}>
                    {comments}
                </Comments.List>
            </section>
        </CommentContext.Provider>
    );
};

Comments.Form = CommentForm;
Comments.List = CommentList;
Comments.ListItem = Comment;
