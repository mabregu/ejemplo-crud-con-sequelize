const Invoice = (sequelize, DataTypes) => {
    const model = sequelize.define('Invoice', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {    
        tableName: 'invoices'
    });

    model.associate = (models) => {
        model.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    }

    return model;
};

module.exports = Invoice;