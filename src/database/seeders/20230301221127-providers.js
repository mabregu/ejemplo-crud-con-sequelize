'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Providers', [
      {
        name: 'No definido',
        description: 'No definido',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apple',
        description: 'Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services. It is considered one of the Big Four of technology along with Amazon, Google, and Facebook.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jardiland',
        description: 'Jardiland is a French chain of garden centres, with 100 stores in France, 2 in Belgium and 1 in Spain. It is a subsidiary of the Auchan Group.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bricorama',
        description: 'Bricorama is a French chain of DIY stores, with 100 stores in France. It is a subsidiary of the Auchan Group.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bricomarché',
        description: 'Bricomarché is a French chain of DIY stores, with 100 stores in France. It is a subsidiary of the Auchan Group.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Brico Dépôt',
        description: 'Brico Dépôt is a French chain of DIY stores, with 100 stores in France. It is a subsidiary of the Auchan Group.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Providers', null, {});
  }
};
