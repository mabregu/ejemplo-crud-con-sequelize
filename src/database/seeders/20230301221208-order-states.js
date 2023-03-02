'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('OrderStates', [
      {
        name: 'Pendiente',
        description: 'Pedido pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Enviado',
        description: 'Pedido enviado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Entregado',
        description: 'Pedido entregado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cancelado',
        description: 'Pedido cancelado',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderStates', null, {});
  }
};
