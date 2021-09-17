const userModel = require('../../models/user');

module.exports.editDoctor = (req, res) => {
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
        msg: 'The Doctor name has been updated',
      });
    }
  );
};
