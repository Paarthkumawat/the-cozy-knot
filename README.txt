# The Cozy Knot — website starter

A responsive static website for a handmade crochet business.

## Preview locally
1. Extract the ZIP.
2. Open `index.html` in Chrome, Edge or Firefox.
3. Internet is needed for Google Fonts and the sample stock photos.

## Before publishing — important customisation
1. Open `script.js` in Notepad or VS Code.
2. Replace `91XXXXXXXXXX` with the business WhatsApp number (country code + number, digits only). Example format: `91` + 10-digit Indian mobile number.
3. Replace `INSTAGRAM_URL` with the real Instagram profile URL.
4. Open `products.js`. Update product names, categories, prices and image paths.
5. Put product photos in the `assets` folder. Example: `assets/pink-crochet-bouquet.jpg`, then set `image: "assets/pink-crochet-bouquet.jpg"`.
6. Replace the sample story text in `index.html` with the owner's real story if desired.

## Publish free with GitHub Pages
1. Create/sign in to a GitHub account (a parent/guardian can help manage the business account).
2. Create a new public repository, e.g. `the-cozy-knot`.
3. Upload `index.html`, `style.css`, `script.js`, `products.js`, README and the `assets` folder.
4. In the repository open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose branch **main**, folder **/(root)**, then Save.
7. Wait for GitHub Pages to publish. The site address will look like `https://YOUR-USERNAME.github.io/the-cozy-knot/`.

GitHub's interface can change; if the Pages option looks different, use GitHub Pages documentation:
https://docs.github.com/pages

## Ordering and payments
- The cart creates an order summary and opens WhatsApp. It does not charge customers or store orders in a database.
- Confirm stock, delivery fees and payment directly with the customer.
- Online card/UPI checkout needs a payment provider and a secure server-side integration. Do not collect card or UPI PIN details on this static site.
- Sample product images are placeholders. Replace them with your own photos before launch.
