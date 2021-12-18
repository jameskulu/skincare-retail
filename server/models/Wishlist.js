module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define('Wishlist', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    })

    Wishlist.associate = (models) => {
        Wishlist.belongsTo(models.User, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'user',
        })
        Wishlist.belongsTo(models.Product, {
            onDelete: 'cascade',
            foreignKey: 'productId',
            as: 'product',
        })
    }

    return Wishlist
}
