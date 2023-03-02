'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'No definido',
        description: 'No definido',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eletrónicos',
        description: 'Produtos eletrónicos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Informática',
        description: 'Produtos de informática',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Telefonia',
        description: 'Produtos de telefonia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Acessórios',
        description: 'Produtos de acessórios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Casa',
        description: 'Produtos de casa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jardin',
        description: 'Produtos de jardin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bebé',
        description: 'Produtos de bebé',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moda',
        description: 'Produtos de moda',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Deportes',
        description: 'Produtos de deportes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Juguetes',
        description: 'Produtos de juguetes',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
