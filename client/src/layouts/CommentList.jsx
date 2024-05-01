import React from 'react';
import { Comment } from 'components/excerpts/Comment';

export const CommentList = ({ commentList, publicationID, user }) => {
    return (
        <section>
            <h3>Comments</h3>
            <div className='comments__list'>
                {commentList.length === 0 ? (
                    <p>No comments yet added.</p>
                ) : (
                    commentList.map((comment) => (
                        <Comment
                            {...comment}
                            publicationID={publicationID}
                            user={user}
                            key={comment._id}
                        />
                    ))
                )}
            </div>
        </section>
    );
};
