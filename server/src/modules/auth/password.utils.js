const { hash: hashPassword, verify: verifyPassword } = require('argon2');

class PasswordUtils {
    static hash = input =>
        new Promise(async (resolve, reject) => {
            try {
                const hashedPassword = hashPassword(input, {
                    timeCost: 4,
                    memoryCost: 1024,
                    parallelism: 1,
                    hashLength: 32
                });

                return resolve(hashedPassword);
            } catch (error) {
                return reject(error.message);
            }
        });

    static verify = (hashed, input) =>
        new Promise(async (resolve, reject) => {
            try {
                const isPasswordCorrect = await verifyPassword(hashed, input);

                return resolve(isPasswordCorrect);
            } catch (error) {
                return reject(error.message);
            }
        });
}

module.exports = PasswordUtils;
