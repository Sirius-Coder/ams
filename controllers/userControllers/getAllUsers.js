const userModel = require('../../models/user');

module.exports.getAllUsers = (req, res) => {
  userModel.find({ role: { $ne: 'Admin' } }, (err, docs) => {
    if (err) throw err;

    res.json({
      success: true,
      data: docs,
    });
  });
};

module.exports.getDoctors = (req, res) => {
  userModel.find({ role: 'Doctor' }, (err, docs) => {
    if (err) throw err;

    res.json({
      success: true,
      data: docs,
    });
  });
};
