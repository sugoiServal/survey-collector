const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
const {
  creditTopUp,
} = require('../controllers/creditController')

// ? for test only
router.get('/', 
    (req, res) => {
        console.log('receive /api/credit/')
        res.json({"url": '123'})
    }
)

router.post('/checkout', [express.json(), requireAuth], async (req, res) => {
    console.log(req.body)
    const credit = req.body.credit
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${credit*10} SurveyCollector credits`
                    },
                    unit_amount: 100
                },
                quantity: credit
            }],
            client_reference_id: req.body._id,
            success_url: `${process.env.FRONT_URL}/checkout/success`,
            cancel_url: `${process.env.FRONT_URL}/surveys`
        })
        res.json({url: session.url})
        
    } catch (e) {
        console.log(e.message);
        res.status(500).json({error: e.message})
    }
})


const endpointSecret = 'whsec_297ca1a1684efdce2b9a8b9df4fe99f03ca9ec37ad92e1d336340e94700342d6';
router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
 // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      // console.log(event.type)
      // console.log(event.data.object)

      // add this amount of credit...
      const amount = event.data.object.amount_subtotal/100
      // to user _id in mongo
      const user = event.data.object.client_reference_id
      creditTopUp(user, amount)


    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});




module.exports = router