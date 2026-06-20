import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const origin = req.headers.origin || `https://${req.headers.host}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 100,
            product_data: {
              name: 'Coraline\'s Treat',
              description: 'One perfect treat for a very good girl',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?treat=success`,
      cancel_url: `${origin}/?treat=cancelled`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout session error:', err.message)
    return res.status(500).json({ error: 'Unable to create checkout session' })
  }
}
