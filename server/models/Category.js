module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
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

    Category.associate = (models) => {
        Category.hasMany(models.SubCategory, {
            onDelete: 'cascade',
            foreignKey: 'categoryId',
            as: 'subCategory',
        })
    }

    return Category
}
