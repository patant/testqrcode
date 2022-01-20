// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  console.log(req.query);
  const cartResponse = await fetch(
    "https://api.dev.brinkcommerce.com/orderv1/carts",
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        products: [{ id: req.query.productId, quantity: 1 }],
        store: {
          countryCode: "SE",
          currencyUnit: "SEK",
          languageCode: "en",
          taxPercentage: 25,
        },
      }),
      method: "POST",
    }
  ).then((response) => response.json());

  const token = cartResponse.jwtToken;
  await fetch("https://api.dev.brinkcommerce.com/orderv1/carts", {
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: '{"products":[{"id":"e805999e-9378-4511-bfd9-7770ea1788d0","quantity":1}]}',
    method: "PUT",
  });

  const cartToOrderResponse = await fetch(
    "https://api.dev.brinkcommerce.com/orderv1/carts/klarna/orders",
    {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: '{"merchant_urls":{"terms":"https://demo.brinkcommerce.com/terms-and-conditions","checkout":"https://demo.brinkcommerce.com/checkout/?klarnaOrderId={checkout.order.id}","confirmation":"https://demo.brinkcommerce.com/success-klarna/?klarnaOrderId={checkout.order.id}"},"merchant_data":"{\\"errorPage\\":\\"https://demo.brinkcommerce.com/error/\\",\\"errorOutOfStockPage\\":\\"https://demo.brinkcommerce.com/error-out-of-stock/\\"}","options":{"additional_checkbox":{"text":"Subscribe to newsletter","checked":false,"required":false}}}',
      method: "POST",
    }
  ).then((response) => response.json());

  res.status(200).json(cartToOrderResponse);
}
