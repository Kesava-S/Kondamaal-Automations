const fs = require('fs');
const path = require('path');

// Base URL of the website
const BASE_URL = 'https://hubsmort.com';

// Static pages to include
const staticPages = [
    '',
    '/services',
    '/privacy-policy',
    '/terms-of-service'
];

// Function to get dynamic service slugs
function getServiceSlugs() {
    try {
        // Read the services data file directly
        // Note: We can't require ES modules in this CommonJS script easily without setup,
        // so we'll read the file and parse it or just duplicate the logic for now if it's simple.
        // Actually, let's try to read the file content and extract slugs using regex to avoid import issues.
        const servicesPath = path.join(__dirname, '..', 'data', 'services.js');
        const fileContent = fs.readFileSync(servicesPath, 'utf8');

        const slugs = [];
        const regex = /slug:\s*["']([^"']+)["']/g;
        let match;

        while ((match = regex.exec(fileContent)) !== null) {
            slugs.push(match[1]);
        }

        return slugs;
    } catch (error) {
        console.error('Error reading services data:', error);
        return [];
    }
}

function generateSitemap() {
    const serviceSlugs = getServiceSlugs();
    const date = new Date().toISOString();

    const staticUrls = staticPages.map(page => {
        return `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    const serviceUrls = serviceSlugs.map(slug => {
        return `
  <url>
    <loc>${BASE_URL}/services/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join('')}
${serviceUrls.join('')}
</urlset>`;

    fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
}

generateSitemap();
