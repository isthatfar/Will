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

