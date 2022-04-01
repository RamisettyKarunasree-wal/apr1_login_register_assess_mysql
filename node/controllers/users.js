const bcrypt = require('bcrypt');
const connector = require('../connect');
const jwt = require('jsonwebtoken');
const createUsersTable = (req, res) => {
  var sql =
    'create table users(id int(2) PRIMARY KEY AUTO_INCREMENT,username varchar(300) UNIQUE,password varchar(200) not null)';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
};

const getUsers = (req, res) => {
  var sql = 'select * from users';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
};
const registerUser = (req, res) => {
  let encryptedPassword;
  try {
    let salt = bcrypt.genSaltSync(10);
    console.log(salt);
    encryptedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(encryptedPassword);
  } catch (error) {
    console.log(error);
    console.log('error in brcypt');
  }
  const username = req.body.username;
  const password = encryptedPassword;
  var sql = `insert into users (username,password) values (?,?)`;
  connector.query(sql, [username, password], function (err, results) {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.json({ status: 0, debug_data: 'username already exists' });
      } else {
        res.json(err);
      }
    } else {
      res.json({ status: 1, data: 'user created' });
    }
  });
};
const loginUser = async (req, res) => {
  console.log(req.body);
  var sql = `select * from users where username=?`;
  connector.query(sql, [req.body.username], function (err, results) {
    if (err) {
      res.json(err);
    } else {
      if (results.length === 0) {
        res.json({ status: 0, debug_data: 'User not found' });
      } else {
        console.log(results);
        const passCorrect = bcrypt.compareSync(
          req.body.password,
          results[0].password
        );
        if (!passCorrect) {
          res
            .status(400)
            .json({ status: 0, debug_data: 'user credentials wrong' });
        } else {
          const payload = {
            user: {
              username: req.body.username,
            },
          };
          jwt.sign(
            payload,
            'secret_string',
            { expiresIn: 1200 },
            (err, token) => {
              if (err) {
                throw error;
                res.json({
                  status: 0,
                  debug_data: 'temporary error in backend',
                });
              }
              res.status(200).json({ token });
            }
          );
        }
      }
    }
  });
};
module.exports = {
  getUsers,
  registerUser,
  createUsersTable,
  loginUser,
};
