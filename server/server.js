const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')
const cors = require('cors')
const db = require('./models')

const app = express()
require('dotenv').config()

// Middleware
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use('/uploads', express.static('uploads'))

// Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/retailers', require('./routes/retailers'))
app.use('/api/products', require('./routes/products'))
app.use('/api/sub-categories', require('./routes/subCategories'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/reviews', require('./routes/reviews'))

// Admin Routes
app.use('/api/admin/users', require('./routes/admin/users'))
app.use('/api/admin/retailers', require('./routes/admin/retailers'))
app.use('/api/admin/products', require('./routes/admin/products'))
app.use('/api/admin/sub-categories', require('./routes/admin/subCategories'))
app.use('/api/admin/categories', require('./routes/admin/categories'))
app.use('/api/admin/orders', require('./routes/admin/orders'))

// 404 not found
app.use((req, res) =>
    res.status(404).json({
        success: false,
        message: `404 Not found: /api/v2${req.url} does not exist`,
    })
)

// Error handling
app.use((err, req, res) =>
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
    })
)

// Defining PORT
const PORT = process.env.PORT || 5000

db.sequelize
    .sync()
    .then(() =>
        app.listen(PORT, () =>
            console.log(
                `${chalk.green('✓')} ${chalk.blue(
                    `Listening on http://localhost:${PORT}.`
                )}`
            )
        )
    )
