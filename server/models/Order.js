module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.DOUBLE(10, 2),
            defaultValue: 0.0,
            allowNull: false,
        },
        orderedDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(
                'pending',
                'approved',
                'refused',
                'delivered',
                'received'
            ),
            defaultValue: 'pending',
            allowNull: false,
        },
    })

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'user',
        })
        Order.belongsTo(models.Product, {
            onDelete: 'cascade',
            foreignKey: 'productId',
            as: 'product',
        })
    }

    return Order
}
