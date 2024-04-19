const isLoggedIn = (req, res, next) => {
    req.user
        ? next()
        : res.status(401).json({
              message: 'You are unauthorized.',
          });
};

const isCredentialsProvided = (req, res, next) => {
    const credentials = req.body;

    Object.keys(credentials).length !== 0
        ? next()
        : res.status(401).json({
              message: "You haven't provided credentials to authorize.",
          });
};

const uploadPicture = async (picture, bucket) => {
    const pictureName = `${Date.now()}_${picture.originalname}`;
    const file = bucket.file(pictureName);
    const stream = file.createWriteStream({
        metadata: {
            contentType: picture.mimetype,
        },
    });

    return await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', () => {
            const pictureURL = `https://storage.googleapis.com/${bucket.name}/${pictureName}`;
            resolve(pictureURL);
        });

        stream.end(picture.buffer);
    });
};

const deletePicture = async (picture, bucket) => {
    const [exists] = await bucket.file(picture).exists();

    if (exists) {
        await bucket.file(picture).delete();
    }
};

function addFieldIfTruthy(updateFields, fieldName, value) {
    if (value) {
        updateFields[fieldName] = value;
    }
}

async function handleProfilePictureUpdate(existingPicture, newFile, bucket) {
    if (existingPicture) {
        const prevPictureName = existingPicture.split('/').pop();
        await deletePicture(prevPictureName, bucket);
    }
    return await uploadPicture(newFile, bucket);
}

module.exports = {
    isLoggedIn,
    isCredentialsProvided,
    deletePicture,
    uploadPicture,
    addFieldIfTruthy,
    handleProfilePictureUpdate,
};
