'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductStates', [
      {
        name: 'Nuevo',
        description: 'Producto nuevo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Usado',
        description: 'Producto usado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Reacondicionado',
        description: 'Producto reacondicionado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Reparado',
        description: 'Producto reparado',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductStates', null, {});
  }
};
