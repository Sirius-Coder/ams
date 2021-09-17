const userModel = require('../../models/user');

module.exports.editPatient = (req, res) => {
  userModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    (err, docs) => {
      if (err) {
        res.json({ success: false, msg: 'Oops! An error occured' });
        throw err;
      }
      res.json({
        success: true,
        msg: 'The Patient name has been updated',
      });
    }
  );
};
