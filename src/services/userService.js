require('dotenv').config()
const User = require('../database/models').User;
// const Sales = require('../database/models').Sales;
const userService = {
    getUserByEmail: async (email) => {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        return user;
    },
    getSales: async (id) => {
        const sales = await Sales.findAll({
            where: {
                userId: id
            }
        });

        return sales;
    },
    getSaleById: async (id) => {
        const sale = await Sales.findOne({
            where: {
                id: id
            }
        });

        return sale;
    }
};

module.exports = userService;