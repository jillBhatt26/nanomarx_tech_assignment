const APIError = require('../../common/APIError');

const destroySession = session =>
    new Promise((resolve, reject) => {
        session.destroy(error => {
            if (error)
                return reject(
                    new APIError(
                        500,
                        error.message ??
                            'Error occurred while destroying session'
                    )
                );

            return resolve(true);
        });
    });

module.exports = destroySession;
