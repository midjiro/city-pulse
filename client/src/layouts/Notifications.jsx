import { NotificationExcerpt } from 'components/excerpts/NotificationExcerpt';
import { notificationActions } from 'features/notification/notificationReducer';
import { selectNotifications } from 'features/selectors';
import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const NotificationsModal = forwardRef((props, ref) => {
    const notifications = useSelector(selectNotifications);
    const dispatch = useDispatch();

    const handleClose = () => {
        ref.current.close();
    };

    const handleMark = () => {
        dispatch(notificationActions.markAllAsReaded());
    };

    return (
        <dialog className="modal" ref={ref}>
            <header className="modal__header">
                <h2 className="modal__header-title">Notifications</h2>
                <div className="modal__actions">
                    <button className="btn  modal__btn" onClick={handleMark}>
                        Read All
                    </button>
                    <button
                        className="btn btn--danger modal__btn "
                        onClick={handleClose}
                    >
                        <i className="fa-solid fa-xmark fa-xl"></i>
                        <span className="sr-only">Close</span>
                    </button>
                </div>
            </header>
            <section className="modal__content">
                {notifications.length === 0 ? (
                    <p>There are no notifications to display</p>
                ) : (
                    <div className="modal__results">
                        {notifications.map((notification, id) => (
                            <NotificationExcerpt {...notification} key={id} />
                        ))}
                    </div>
                )}
            </section>
        </dialog>
    );
});
