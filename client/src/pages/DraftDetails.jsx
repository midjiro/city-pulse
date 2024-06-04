import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { selectSingleDraft } from 'features/selectors';
import { createPost, createEvent } from 'features/publication/publicationAPI';
import { removeDraft } from 'features/drafts/draftsSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Dropdown } from 'components/ui/Dropdown';

export const DraftDetails = () => {
    const { draftID } = useParams();
    const draft = useSelector((state) => selectSingleDraft(state, draftID));
    const isEvent = draft?.hasOwnProperty('scheduledFor');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePublish = async () => {
        try {
            const action = isEvent ? createEvent(draft) : createPost(draft);
            await dispatch(action).then(unwrapResult);
            toast(`${isEvent ? 'Event' : 'Post'} successfully published.`);
            await handleDelete();
        } catch (error) {
            toast(error);
        }
        navigate('/drafts/');
    };

    const handleDelete = async () => {
        await dispatch(removeDraft(draft._id));
        navigate('/drafts/');
    };

    if (!draft) {
        return (
            <>
                <h2>
                    Oops! We are unable to find the draft you are looking for
                </h2>
                <p>It might have been removed or updated.</p>
            </>
        );
    }

    return (
        <article className="publication">
            <div className="publication__header">
                <h2>{draft.title}</h2>
                <Dropdown title="Actions">
                    <button
                        className="btn btn--success"
                        onClick={handlePublish}
                    >
                        Publish
                    </button>
                    <button className="btn btn--danger" onClick={handleDelete}>
                        Delete
                    </button>
                </Dropdown>
            </div>
            {isEvent && (
                <>
                    <p>
                        Scheduled for:{' '}
                        {format(new Date(draft.scheduledFor), 'PPPPp')}
                    </p>
                    <p>
                        Will be held in:
                        <a href={`http://maps.google.com/?q=${draft.location}`}>
                            {draft.location}
                        </a>
                    </p>
                </>
            )}
            <Markdown>{draft.content}</Markdown>
        </article>
    );
};
