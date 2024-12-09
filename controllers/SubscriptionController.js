
const stripe = require('stripe')('sk_test_51OGv2gKIMRn2BAKSnuGqZ3RdJjFlHu2iu53pPkTJLVBtYxkgrubbg4b7Dtr3Zx6dQa3XSvZzePpbHjCSpagS7rfY00cqs9vcje');
const Subscription = require('../models/Suscription');

exports.createSubscription = async(req, res) => {
    try {
        const { stripe_id, tripe_status, stripe_price, name } = req.body;

        const subscription = await Subscription.create(req.body);

        res.status(201).json({subscription, mensaje: 'Susbcripción creada exitosamente'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateSubscription = async(req, res) => {
    try {
        const { stripe_status_active } = req.body;

        await stripe.products.update(
            req.params.id,
            {
                active: stripe_status_active
            }
        )

        const subscription = await Subscription.findByPk(req.params.id);

        await subscription.update(req.body);

        res.status(201).json({subscription, mensaje: 'Susbcripción actualizada exitosamente'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getSubscriptions = async(req, res) => {
    try {
        const subscriptions = await Subscription.findAll(); 

        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getStripeSubscriptions = async(req, res) => {
    try {
        const products = await stripe.products.list({
            active: true
        })

        const subscriptions = await Promise.all(
            products.data.map(async (product) => {
                try {
                    const price = await stripe.prices.retrieve(`${product.default_price}`);
                    return { 
                        id: product.id,
                        active: product.active,
                        description: product.description,
                        name: product.name,
                        currency: price.currency,
                        product_id: price.product,
                        interval_count: price.recurring.interval_count,
                        unit_amount: price.unit_amount,
                    };
                } catch (err) {
                    console.error(`Error al obtener el precio del producto ${product.id}:`, err.message);
                    return null;
                }
            })
        );

        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}