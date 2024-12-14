const admin = require('firebase-admin');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require('./swift-7c667-firebase-adminsdk-hf4um-115314e5d0.json')),
  storageBucket: 'swift-7c667.appspot.com'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Function to generate PDF using PDFKit
async function generatePDF(data) {
    const doc = new PDFDocument();
    const pdfPath = path.resolve(__dirname, `${data.firstName}_${data.lastName}_Will.pdf`);
    const stream = fs.createWriteStream(pdfPath);

    // Load and compile the HTML template
    const templatePath = path.resolve(__dirname, 'template.html');
    const templateHtml = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateHtml);
    const filledHtml = template(data);

    // Write content to PDF (you can customize this part as needed)
    doc.pipe(stream);
    doc.fontSize(20).text('Last Will and Testament', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(filledHtml, { align: 'left' });
    doc.end();

    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(pdfPath));
        stream.on('error', reject);
    });
}

// Function to upload PDF to Firebase Storage
async function uploadPDF(filePath, fileName) {
    const file = bucket.file(`wills/${fileName}`);
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(file.createWriteStream({ contentType: 'application/pdf' }))
            .on('finish', async () => {
                const [url] = await file.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2030',
                });
                resolve(url);
            })
            .on('error', reject);
    });
}

// Listen for Firestore Changes
db.collection('wills').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
            const data = change.doc.data();
            console.log('New will detected:', data);

            try {
                const pdfPath = await generatePDF(data);
                const fileName = `${data.firstName}_${data.lastName}_Will.pdf`;
                const downloadUrl = await uploadPDF(pdfPath, fileName);

                console.log('PDF uploaded:', downloadUrl);

                // Update Firestore with the PDF URL
                await change.doc.ref.update({ pdfUrl: downloadUrl });

                // Clean up the local file after uploading
                fs.unlinkSync(pdfPath);
            } catch (error) {
                console.error('Error generating or uploading PDF:', error);
            }
        }
    });
});
