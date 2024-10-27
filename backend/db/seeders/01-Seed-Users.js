'use strict';

const {User, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Users';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
      options.tableName = "Users";
      return queryInterface.bulkInsert(options, [
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password'),
          profileImg: 'https://nutrimatebucket.s3.amazonaws.com/1730042541186.png'
        },
        {
          email: 'user1@user.io',
          username: 'FakeUser1',
          hashedPassword: bcrypt.hashSync('password2'),
          profileImg: 'https://nutrimatebucket.s3.amazonaws.com/1730047926414.png'
        },
        {
          email: 'user2@user.io',
          username: 'FakeUser2',
          hashedPassword: bcrypt.hashSync('password3'),
          profileImg: 'https://nutrimatebucket.s3.amazonaws.com/1730047956330.jpg'
        },
        {
          email: 'scraper@user.io',
          username: 'Scraper',
          hashedPassword: bcrypt.hashSync('password4'),
          profileImg: ''
        }

      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Users";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        username: {[Op.in]: []}
      })
    }
  }
