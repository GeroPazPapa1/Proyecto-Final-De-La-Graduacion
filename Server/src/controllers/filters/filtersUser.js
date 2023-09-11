const { User } = require ("../../db");
const { Op } = require('sequelize');


const filteredUsers = async (age, country, email, status, ban, verify, lastName, name) => {
    try {const conditions = {};
    if (age) {
        conditions.age = age
    }
  
    if (country) {
        conditions.country = {
        [Op.iLike]: `%${country}%`,
        }
    }
    
    if (email) {
        conditions.email = {
        [Op.iLike]: `%${email}%`,
      };
    }

    if (status === 'admin' || status === 'user') {
        conditions.status = status;
      }
  

    if (lastName) {
        conditions.lastName = {
          [Op.iLike]: `%${lastName}%`, 
        };
      }
    
     if (name) {
        conditions.name = {
          [Op.iLike]: `%${name}%`, 
        };
      }

    if (ban) {
        conditions.ban = ban;
    }

    if (verify) {
        conditions.verify = verify;
    }

      console.log(conditions);
    
    const filtersUser = await User.findAll({
      where: conditions,
    })
    return filtersUser;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    filteredUsers,}
