'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@plantis.com',
        password: '$2b$10$XVplsiAwxn1fJRfrykKf2OHWwT5Jl2AtpXC9lgfkmSPaZ/KWSUicu',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vendedor',
        email: 'vendedor@plantis.com',
        password: '$2b$10$XVplsiAwxn1fJRfrykKf2OHWwT5Jl2AtpXC9lgfkmSPaZ/KWSUicu',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Comprador',
        email: 'comprador@gmail.com',
        password: '$2b$10$XVplsiAwxn1fJRfrykKf2OHWwT5Jl2AtpXC9lgfkmSPaZ/KWSUicu',
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
