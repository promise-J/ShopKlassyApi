const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)


router.post('/', (req, res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes)=>{
        if(stripeErr) {
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json(stripeRes)
        }
    })

    // try {
    //     stripe.customers.create({
    //         name: req.body.name,
    //         email: req.body.email,
    //         source: req.body.stripeToken
    //     }).then(customer => stripe.charges.create({
    //         amount: req.body.amount * 100,
    //         currency: 'usd',
    //         customer: customer.id,
    //         description: 'Thank you for your generous donation.'
    //     })).then(() => res.render('complete.html'))
    //         .catch(err => console.log(err))
    // } catch (err) { res.send(err) }
})


module.exports = router
