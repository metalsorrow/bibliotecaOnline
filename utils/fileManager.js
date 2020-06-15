const fs = require('fs');

module.exports.removeFile = async (path) => {
    try {
        await fs.unlink(path)
    } catch (err) {
        return err
    }
}