module.exports = (sequelize, DataTypes) => {
    const Retailer = sequelize.define('Retailer', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profilePicURL: {
            type: DataTypes.STRING,
        },
        emailToken: {
            type: DataTypes.STRING,
        },
        resetToken: {
            type: DataTypes.STRING,
        },
        expireToken: {
            type: DataTypes.DATE,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    })

    Retailer.associate = (models) => {
        Retailer.hasMany(models.Product, {
            onDelete: 'cascade',
            foreignKey: 'retailerId',
            as: 'retailer',
        })
    }

    return Retailer
}
