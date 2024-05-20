import React from 'react';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

export const Comments = ({ publication, commentList, user }) => {
    return (
        <section className="comments publication__comments">
            {user && <CommentForm publicationID={publication._id} />}
            <CommentList
                publicationID={publication._id}
                publicationAuthor={publication.author}
                commentList={commentList}
                user={user}
            />
        </section>
    );
};
