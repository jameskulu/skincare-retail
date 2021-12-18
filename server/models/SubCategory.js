module.exports = (sequelize, DataTypes) => {
    const SubCategory = sequelize.define('SubCategory', {
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
    })

    SubCategory.associate = (models) => {
        SubCategory.hasMany(models.Product, {
            onDelete: 'cascade',
            foreignKey: 'subCategoryId',
            as: 'subCategory',
        })

        SubCategory.belongsTo(models.Category, {
            onDelete: 'cascade',
            foreignKey: 'categoryId',
            as: 'category',
        })
    }

    return SubCategory
}
