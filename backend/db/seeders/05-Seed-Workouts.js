'use strict';

const {User, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Workouts';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
      options.tableName = "Workouts";
      return queryInterface.bulkInsert(options, [
        {
          name: 'running',
          description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Neque eros dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
          userId: 1,
        },
        {
            name: 'cycling',
            description: 'consectetuer adipiscing elit. Neque eros dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
            userId: 2,
        },
        {
            name: 'walking',
            description: 'Neque eros dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
            userId: 1,
        },
        {
            name: 'rowing',
            description: 'eros dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
            userId: 2,
        },
        {
            name: 'yoga',
            description: 'parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
            userId: 1,
        }
      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Workouts";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        username: {[Op.in]: []}
      })
    }
  }
