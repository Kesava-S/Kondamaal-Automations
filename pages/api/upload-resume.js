import multer from 'multer';
import { google } from 'googleapis';
import stream from 'stream';
import { supabase } from '../../lib/supabaseClient';

// Configure Multer (Memory Storage)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 4.5 * 1024 * 1024 } // 4.5MB limit for Vercel
});

export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper to run middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Verify Auth Token
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            throw new Error('Invalid token');
        }
    } catch (authError) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    try {
        await runMiddleware(req, res, upload.single('resume'));

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID;
        const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

        if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
            throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_JSON env var');
        }

        const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: SCOPES,
        });

        const drive = google.drive({ version: 'v3', auth });

        console.log(`Uploading file: ${req.file.originalname}`);

        const bufferStream = new stream.PassThrough();
        bufferStream.end(req.file.buffer);

        const fileMetadata = {
            name: `${Date.now()}_${req.file.originalname}`,
            parents: [DRIVE_FOLDER_ID],
        };

        const media = {
            mimeType: req.file.mimetype,
            body: bufferStream,
        };

        const file = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink, webContentLink',
        });

        // Make public
        await drive.permissions.create({
            fileId: file.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        res.status(200).json({
            message: 'Upload successful',
            fileUrl: file.data.webViewLink,
            fileId: file.data.id
        });

    } catch (error) {
        console.error('Error uploading to Drive:', error);
        res.status(500).json({ error: 'Failed to upload file.', details: error.message });
    }
}
