'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'MacBook Pro 13" 2020',
        slug: 'macbook-pro-13-2020',
        description: 'MacBook Pro 13" 2020',
        price: 2000,
        stock: 10,
        categoryId: 3,
        productStateId: 1,
        brandId: 2,
        providerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zapatillas Nike Air Max 270',
        slug: 'zapatillas-nike-air-max-270',
        description: 'Zapatillas Nike Air Max 270',
        price: 200,
        stock: 10,
        categoryId: 9,
        productStateId: 1,
        brandId: 6,
        providerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
