/**
 * Created by tim.cluff on 4/7/2017.
 */

// StatusError
function StatusError(msg, status) {
    var err = Error.call(this, msg);
    err.status = status;
    err.name = 'StatusError';
    return err;
}

// Set statusError as object
StatusError.prototype = Object.create(Error.prototype, {
    constructor: { value: StatusError }
});

// module export
module.exports = StatusError;

