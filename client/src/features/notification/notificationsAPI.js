export const sendNotification = async (socket, sender, msg, publication) => {
    try {
        await socket.emit('send-notification', {
            sender,
            recipient: publication.author,
            publicationType: publication.hasOwnProperty('location')
                ? 'event'
                : 'post',
            publicationID: publication._id,
            msg,
        });
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
