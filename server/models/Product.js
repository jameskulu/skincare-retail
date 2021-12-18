module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE(10, 2),
            defaultValue: 0.0,
            allowNull: false,
        },
        imageURL: {
            type: DataTypes.STRING,
        },
        cloudinaryId: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    })

    Product.associate = (models) => {
        Product.belongsTo(models.Retailer, {
            onDelete: 'cascade',
            foreignKey: 'retailerId',
            as: 'retailer',
        })

        Product.belongsTo(models.SubCategory, {
            onDelete: 'cascade',
            foreignKey: 'subCategoryId',
            as: 'subCategory',
        })

        Product.hasMany(models.Order, {
            onDelete: 'cascade',
            foreignKey: 'productId',
            as: 'product',
        })

        Product.hasMany(models.Wishlist, {
            onDelete: 'cascade',
            foreignKey: 'productId',
            as: 'wishlist',
        })

        Product.hasMany(models.Review, {
            onDelete: 'cascade',
            foreignKey: 'itemId',
            as: 'review',
        })

        Product.hasMany(models.ProductReview, {
            onDelete: 'cascade',
            foreignKey: 'productId',
            as: 'productReview',
        })
    }

    return Product
}
