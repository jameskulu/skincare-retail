module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'user',
        })
        Comment.belongsTo(models.Product, {
            onDelete: 'cascade',
            foreignKey: 'productId',
            as: 'product',
        })
    }

    return Comment
}
