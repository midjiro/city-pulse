import React from 'react';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

export const Comments = ({ publicationID, commentList, user }) => {
    return (
        <section className='comments publication__comments'>
            {user && <CommentForm publicationID={publicationID} />}
            <CommentList
                publicationID={publicationID}
                commentList={commentList}
                user={user}
            />
        </section>
    );
};
