const { findSocketByUser } = require('../utils');

const recvNotification = (io, notification) => {
    if (notification.sender._id === notification.recipient._id) return;

    const socketsConnected = [...io.sockets.sockets.values()];

    const recipientSocketID = findSocketByUser(
        socketsConnected,
        notification.recipient
    );

    if (!recipientSocketID) return;

    io.to(recipientSocketID).emit('recv-notification', {
        ...notification,
        unreaded: true,
    });
};

module.exports = { recvNotification };
