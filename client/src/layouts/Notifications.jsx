import { NotificationExcerpt } from 'components/excerpts/NotificationExcerpt';
import { selectNotifications } from 'features/selectors';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

export const NotificationsModal = forwardRef((props, ref) => {
    const notifications = useSelector(selectNotifications);

    const handleClose = () => {
        ref.current.close();
    };

    return (
        <dialog className="modal" ref={ref}>
            <header className="modal__header">
                <h2 className="modal__header-title">Notifications</h2>
                <button className="btn modal__btn" onClick={handleClose}>
                    <i className="fa-solid fa-xmark fa-xl"></i>
                    <span className="sr-only">Close</span>
                </button>
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
