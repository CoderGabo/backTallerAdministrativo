const Sequelize = require('sequelize');
const db = require('../config/db');

const Subscription = db.define('subscriptions', {
    stripe_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    stripe_status_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    stripe_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});
module.exports = Subscription;
