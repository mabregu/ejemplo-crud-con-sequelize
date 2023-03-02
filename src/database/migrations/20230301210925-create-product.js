'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      brandId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Brands',
          key: 'id'
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      providerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Providers',
          key: 'id'
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      productStateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ProductStates',
          key: 'id'
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};