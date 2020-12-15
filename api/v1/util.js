const { 
    User: { model: User}, 
    Restaurant: { model: Restaurant }
} = require('../../models');

module.exports = {
    authenticate: (sessionId, oid = null) => {        
        return new Promise((resolve, reject) => {
            User.findOne({ sessionId }).then(user => {
                if (oid == null) {
                    resolve(user);
                } else {
                    if (user == null) resolve(null);
                    Restaurant.findOne({ owner: user._id, $or: [{_id: oid}, {'menus._id': oid}] }).then(doc => {
                        resolve(doc);
                    }).catch(err => reject(err));
                }
            }).catch(err => reject(err));
        })
    }
}