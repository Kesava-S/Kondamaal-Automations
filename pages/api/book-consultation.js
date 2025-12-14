export default function handler(req, res) {
    if (req.method === 'POST') {
        // In a real application, you would save this data to a database or send an email.
        // For now, we'll just log it and return a success response.
        console.log('Consultation Request Received:', req.body);

        res.status(200).json({ message: 'Success', data: req.body });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
