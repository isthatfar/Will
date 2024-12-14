const admin = require('firebase-admin');
const handlebars = require('handlebars');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require('./swift-7c667-firebase-adminsdk-hf4um-115314e5d0.json')),
  storageBucket: 'swift-7c667.appspot.com'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Function to generate a PDF
async function generatePDF(data) {
    // Load the HTML template
    const templatePath = path.resolve(__dirname, 'template.html');
    const templateHtml = fs.readFileSync(templatePath, 'utf8');

    // Compile the template with Handlebars
    const template = handlebars.compile(templateHtml);
    const filledHtml = template(data);

    // Use Puppeteer to convert the filled HTML to PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(filledHtml, { waitUntil: 'networkidle0' });

    // Save the PDF as a buffer
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return pdfBuffer;
}

// Function to upload a PDF to Firebase Storage
async function uploadPDF(buffer, fileName) {
    const file = bucket.file(`wills/${fileName}`);
    const stream = file.createWriteStream({
        metadata: {
            contentType: mime.lookup('pdf'),
        }
    });

    return new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', async () => {
            const publicUrl = await file.getSignedUrl({
                action: 'read',
                expires: '03-01-2030'
            });
            resolve(publicUrl[0]);
        });
        stream.end(buffer);
    });
}

// Listen for changes in the Firestore database
db.collection('wills').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
            const data = change.doc.data();
            console.log('New will detected:', data);

            try {
                // Generate the PDF
                const pdfBuffer = await generatePDF(data);

                // Generate a file name
                const fileName = `${data.firstName}_${data.lastName}_Will.pdf`;

                // Upload the PDF to Firebase Storage
                const downloadUrl = await uploadPDF(pdfBuffer, fileName);
                console.log('PDF uploaded:', downloadUrl);

                // (Optional) Update Firestore with the PDF URL
                await change.doc.ref.update({ pdfUrl: downloadUrl });
                console.log('Firestore updated with PDF URL');
            } catch (error) {
                console.error('Error generating PDF:', error);
            }
        }
    });
});




// This is your test secret API key.
const stripe = require('stripe')('sk_test_51QEzOZKQ7pECBtXLn75fymEXXTbwtwYhLfA3S9ZSzJuyWQmUeIXNt5124lXxXNt6cskw0G5K3dvrHmZhr7s3VZA4007RWFvMgE');
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json()); // Parse JSON bodies
app.use(cors({ origin: 'http://127.0.0.1:5501' })); // Allow requests from your live server

const YOUR_DOMAIN = 'http://127.0.0.1:5501';

// Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  const { willType, deliveryMethod } = req.body;

  // Determine the price ID based on user selections
  let priceId = '';
  if (willType === 'single' && (deliveryMethod === 'digitalDownload' || deliveryMethod === '1stClassPost')) {
    priceId = 'price_1QPS6EKQ7pECBtXLvFR2C9Nj'; // Replace with actual Price ID for single will + digital/postage
  } else if (willType === 'couple' && (deliveryMethod === 'digitalDownload' || deliveryMethod === '1stClassPost')) {
    priceId = 'price_1QPS6FKQ7pECBtXLvFR2C9Nj'; // Replace with actual Price ID for couple will + digital/postage
  } else if (willType === 'single' && deliveryMethod === 'priorityReview') {
    priceId = 'price_1QPS6GKQ7pECBtXLvFR2C9Nj'; // Replace with actual Price ID for single will + priority review
  } else if (willType === 'couple' && deliveryMethod === 'priorityReview') {
    priceId = 'price_1QPS6HKQ7pECBtXLvFR2C9Nj'; // Replace with actual Price ID for couple will + priority review
  } else {
    res.status(400).send({ error: 'Invalid selection' });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Failed to create checkout session' });
  }
});

// Get Session Status
app.get('/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (error) {
    console.error('Error retrieving session status:', error);
    res.status(500).send({ error: 'Failed to retrieve session status' });
  }
});

// Start the server
app.listen(5501, () => console.log('Running on port 4242'));
