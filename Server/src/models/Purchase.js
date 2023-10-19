const { DataTypes } = require('sequelize');

const Purchase = (sequelize) =>
    sequelize.define(
        'purchase',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        mpId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comicId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        paranoid: true,
    }
);


module.exports = Purchase;

