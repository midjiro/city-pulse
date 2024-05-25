import { Link } from 'react-router-dom';

export const DraftExcerpt = ({ _id, title, content }) => {
    return (
        <article className="excerpt">
            <div className="excerpt__content">
                <h2 className="excerpt__title">
                    <Link className="excerpt__link" to={`/drafts/${_id}`}>
                        {title}
                    </Link>
                </h2>
                <p className="excerpt__text">
                    {content.length > 100
                        ? content.subst(0, 100) + '...'
                        : content}
                </p>
            </div>
        </article>
    );
};
