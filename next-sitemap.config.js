/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://automaitee.com',
    generateRobotsTxt: true,
    outDir: 'public',
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: ['/custom-page'], // Typically custom pages might be excluded, but user has it in sitemap currently. Kept unless asked to remove.
    // Removed additionalPaths as these pages are auto-discovered by next-sitemap.
    // Defined priorities in transform function for better control.
    transform: async (config, path) => {
        // Custom priority for Homepage
        if (path === '/') {
            return {
                loc: path,
                changefreq: 'daily',
                priority: 1.0,
                lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
                alternateRefs: config.alternateRefs ?? [],
            }
        }

        // Custom priority for Booking/Contact
        if (path === '/book-consultation') {
            return {
                loc: path,
                changefreq: 'daily',
                priority: 0.9,
                lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
                alternateRefs: config.alternateRefs ?? [],
            }
        }

        // Handle /services and dynamic /services/[slug] pages
        if (path.includes('/services')) {
            return {
                loc: path,
                changefreq: 'weekly',
                priority: 0.9,
                lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
                alternateRefs: config.alternateRefs ?? [],
            };
        }

        // Default for other pages (like /privacy-policy, /terms-of-service, etc.)
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        };
    },
};
