const fs = require('fs');
const path = require('path');

// Base URL of the website
const BASE_URL = 'https://hubsmort.com';

function generateRobotsTxt() {
    const robotsTxt = `User-agent: *
Allow: /

# Block sensitive or non-essential paths (if any in future)
# Disallow: /admin/
# Disallow: /private/

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml
`;

    fs.writeFileSync(path.join(__dirname, '..', 'public', 'robots.txt'), robotsTxt);
    console.log('robots.txt generated successfully!');
}

generateRobotsTxt();
