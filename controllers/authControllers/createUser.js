const userModel = require('../../models/user');
const bcrypt = require('bcryptjs');

module.exports.createUser = (req, res) => {
  //Hashing the password before saving
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) throw err;
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    });
    //Creating a new user in the Db
    user.save(user, (error, docs) => {
      if (error) res.json({ success: false, msg: 'Email already exist !' });
      else {
        res.json({ success: true, msg: 'User Added!' });
        console.log(`${docs.name} has been added to the database successfully`);
      }
    });
  });
};
