'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Brands', [
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
        name: 'Samsung',
        description: 'Samsung Electronics Co., Ltd. is a South Korean multinational conglomerate headquartered in Samsung Town, Seoul. It comprises numerous affiliated businesses, most of them united under the Samsung brand, and is the largest South Korean chaebol (business conglomerate).',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xiaomi',
        description: 'Xiaomi Corporation is a Chinese electronics company headquartered in Beijing. Xiaomi makes and invests in smartphones, mobile apps, laptops, bags, earphones, shoes, fitness bands, and many other products.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Huawei',
        description: 'Huawei Technologies Co., Ltd. is a Chinese multinational networking and telecommunications equipment and services company headquartered in Shenzhen, Guangdong. It is the largest telecommunications equipment manufacturer in the world, having overtaken Ericsson in 2012.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nike',
        description: 'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Adidas',
        description: 'Adidas AG is a German multinational corporation, headquartered in Herzogenaurach, Germany, that designs and manufactures shoes, clothing and accessories. It is the largest sportswear manufacturer in Europe, and the second largest in the world, after Nike.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Puma',
        description: 'Puma SE, branded as PUMA, is a German multinational company that designs and manufactures athletic and casual footwear, apparel and accessories, which is headquartered in Herzogenaurach, Bavaria, Germany.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Reebok',
        description: 'Reebok International Limited is a British multinational corporation, headquartered in Boston, Massachusetts, that designs, develops, markets and distributes athletic and casual footwear, apparel and accessories.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lego',
        description: 'The Lego Group is a Danish family-owned company based in Billund, Denmark. It is best known for the manufacture of Lego-brand toys, consisting of colourful interlocking plastic bricks accompanying an array of gears, minifigures and various other parts.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Playmobil',
        description: 'Playmobil is a German toy company that produces and markets a range of plastic toys. The company was founded in 1974 by Hans Beck and is headquartered in Zirndorf, Bavaria, Germany.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hasbro',
        description: 'Hasbro, Inc. is an American multinational toy and board game company. It is the 3rd largest toy maker in the world, after the Chinese companies Mattel and JAKKS Pacific.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});
  }
};
