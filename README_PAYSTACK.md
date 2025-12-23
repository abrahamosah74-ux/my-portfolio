Quick Paystack helper server

1) Copy `.env.example` to `.env` and set your secret key:

```
PAYSTACK_SECRET_KEY=sk_live_xxx_replace_with_yours
PORT=3000
```

2) Install dependencies:

```bash
npm install
```

3) Run the server:

```bash
npm run dev
```

4) Initialize a transaction from your frontend by POSTing to `/api/payments/initialize` with JSON body:

```json
{ "email": "customer@example.com", "amount": 100000, "metadata": { "service": "website" } }
```

The server will return Paystack's initialization response containing an `authorization_url` and a `reference`. Use `authorization_url` to redirect the user or use the `reference` with Paystack inline.
