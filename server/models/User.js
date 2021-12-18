module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
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
        gender: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        profilePicURL: {
            type: DataTypes.STRING,
        },
        cloudinaryId: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user',
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
            allowNull: false,
        },
    })

    User.associate = (models) => {
        User.hasMany(models.Order, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'user',
        })

        User.hasMany(models.Wishlist, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'wishlist',
        })

        User.hasMany(models.Review, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'review',
        })

        User.hasMany(models.ProductReview, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'productReview',
        })
    }

    return User
}
