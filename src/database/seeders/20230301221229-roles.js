'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Administrador',
        description: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vendedor',
        description: 'Vendedor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Comprador',
        description: 'Comprador',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
