'use strict';

const { Grub, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
options.tableName = 'Grubs';



if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Grubs";
    return queryInterface.bulkInsert(options, [
      {
        name: 'hamburger',
        servingSize: 1.0,
        servingUnit: 'each',
        calories: 300,
        protein: 22,
        fats: 25,
        carbs: 11,
        sugar: 2,
        company: 'Burger King',
        description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Neque eros dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 2
      },
      {
        name: 'hotdog',
        servingSize: 2.0,
        servingUnit: 'each',
        calories: 250,
        protein: 44,
        fats: 35,
        carbs: 22,
        sugar: 33,
        company: 'Papaya King',
        description: 'consectetuer adipiscing elit. Neque eros dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 3
      },
      {
        name: 'ice cream',
        servingSize: 12,
        servingUnit: 'oz',
        calories: 600,
        protein: 5,
        fats: 55,
        carbs: 3,
        sugar: 22,
        company: 'Carvel',
        description: 'Neque eros dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 3
      },
      {
        name: 'grill chicken salad',
        servingSize: 1,
        servingUnit: 'bowl',
        calories: 350,
        protein: 84,
        fats: 140,
        carbs: 11,
        sugar: 28,
        company: 'Whole Foods',
        description: 'dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 2
      },
      {
        name: 'tuna sandwich',
        servingSize: 1,
        servingUnit: 'each',
        calories: 500,
        protein: 17,
        fats: 22,
        carbs: 12,
        sugar: 2,
        company: 'Zack Deli',
        description: 'parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 3
      },
      {
        name: 'pasta salad',
        servingSize: 5,
        servingUnit: 'oz',
        calories: 200,
        protein: 33,
        fats: 35,
        carbs: 7,
        sugar: 5,
        company: 'Home Made',
        description: 'Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 2
      },
      {
        name: 'mac and cheese',
        servingSize: 1.0,
        servingUnit: 'cup',
        calories: 150,
        protein: 22,
        fats: 25,
        carbs: 11,
        sugar: 2,
        company: 'Burger King',
        description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Neque eros dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 3
      },
      {
        name: 'cheese nachos',
        servingSize: 6,
        servingUnit: 'oz',
        calories: 600,
        protein: 44,
        fats: 35,
        carbs: 22,
        sugar: 33,
        company: 'Papaya King',
        description: 'consectetuer adipiscing elit. Neque eros dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 2
      },
      {
        name: 'coffee milkshake',
        servingSize: 6,
        servingUnit: 'oz',
        calories: 25,
        protein: 5,
        fats: 55,
        carbs: 3,
        sugar: 22,
        company: 'Carvel',
        description: 'Neque eros dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 3
      },
      {
        name: 'peanut butter brownie',
        servingSize: 1,
        servingUnit: 'each',
        calories: 400,
        protein: 84,
        fats: 140,
        carbs: 11,
        sugar: 28,
        company: 'Whole Foods',
        description: 'dapibus at malesuada parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 2
      },
      {
        name: 'egg salad sandwich',
        servingSize: 1,
        servingUnit: 'each',
        calories: 600,
        protein: 17,
        fats: 22,
        carbs: 12,
        sugar: 2,
        company: 'Zack Deli',
        description: 'parturient sem congue himenaeos. Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 3
      },
      {
        name: 'wonton soup',
        servingSize: 2,
        servingUnit: 'cup',
        calories: 400,
        protein: 33,
        fats: 35,
        carbs: 7,
        sugar: 5,
        company: 'Home Made',
        description: 'Turpis elementum aliquam curabitur lacinia morbi rutrum. Nullam maximus integer porttitor fusce euismod efficitur urna consectetur bibendum. Risus natoque in lectus; tristique platea commodo fermentum parturient. Aptent ut vitae tellus inceptos adipiscing arcu maecenas. Volutpat lacinia massa sollicitudin vitae maecenas dis sit sed eleifend.',
        userId: 2
      },

    ], {})
  },



  down: async (queryInterface, Sequelize) => {
    options.tableName = "Grubs";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [] }
    })
  }
}
