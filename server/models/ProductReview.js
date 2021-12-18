module.exports = (sequelize, DataTypes) => {
    const ProductReview = sequelize.define('ProductReview', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        isReviewed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    })

    ProductReview.associate = (models) => {
        ProductReview.belongsTo(models.User, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'user',
        })
        ProductReview.belongsTo(models.Product, {
            onDelete: 'cascade',
            foreignKey: 'productId',
            as: 'product',
        })
    }

    return ProductReview
}
