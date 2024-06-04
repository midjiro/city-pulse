export const CommentList = ({ children, isEmpty }) => {
    return (
        <section>
            <h3>Comments</h3>
            <div className="comments__list">
                {isEmpty ? <p>No comments yet added.</p> : children}
            </div>
        </section>
    );
};
