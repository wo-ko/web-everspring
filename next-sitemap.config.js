/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.everspringagrochem.com',
    generateRobotsTxt: true, // สร้าง robots.txt ด้วย
    sitemapSize: 50000,        // ถ้ามีหลาย URL
    outDir: './public',
    changefreq: 'weekly',     // ค่า default ถ้าไม่ใส่ใน URL เฉพาะ
    priority: 0.7,            // ค่า default ถ้าไม่ใส่ใน URL เฉพาะ
    alternateRefs: [
        {
            href: 'https://www.everspringagrochem.com/th',
            hreflang: 'th',
        },
        {
            href: 'https://www.everspringagrochem.com/en',
            hreflang: 'en',
        },
    ],
    transform: async (config, url) => {
        // กำหนด changefreq, priority แยกหน้าเหมือน XML ที่ส่งมา
        const map = {
            '/th/': { changefreq: 'weekly', priority: 1.0 },
            '/th/about': { changefreq: 'monthly', priority: 0.7 },
            '/th/company': { changefreq: 'monthly', priority: 0.7 },
            '/th/product/all': { changefreq: 'weekly', priority: 0.9 },
            '/th/product/acaricide': { changefreq: 'weekly', priority: 0.8 },
            '/th/product/insecticide': { changefreq: 'weekly', priority: 0.8 },
            '/th/product/fungicide': { changefreq: 'weekly', priority: 0.8 },
            '/th/product/herbicide': { changefreq: 'weekly', priority: 0.8 },
            '/th/product/plant': { changefreq: 'weekly', priority: 0.8 },
            '/th/product/mollus': { changefreq: 'weekly', priority: 0.8 },
            '/th/news': { changefreq: 'weekly', priority: 0.7 },
            '/th/news/press': { changefreq: 'weekly', priority: 0.6 },
            '/th/news/events': { changefreq: 'weekly', priority: 0.6 },
            '/th/news/carrier': { changefreq: 'weekly', priority: 0.6 },
            '/th/contact': { changefreq: 'monthly', priority: 0.7 },
            '/en/': { changefreq: 'weekly', priority: 1.0 },
            '/en/about': { changefreq: 'monthly', priority: 0.7 },
            '/en/company': { changefreq: 'monthly', priority: 0.7 },
            '/en/product/all': { changefreq: 'weekly', priority: 0.9 },
            '/en/product/acaricide': { changefreq: 'weekly', priority: 0.8 },
            '/en/product/insecticide': { changefreq: 'weekly', priority: 0.8 },
            '/en/product/fungicide': { changefreq: 'weekly', priority: 0.8 },
            '/en/product/herbicide': { changefreq: 'weekly', priority: 0.8 },
            '/en/product/plant': { changefreq: 'weekly', priority: 0.8 },
            '/en/product/mollus': { changefreq: 'weekly', priority: 0.8 },
            '/en/news': { changefreq: 'weekly', priority: 0.7 },
            '/en/news/press': { changefreq: 'weekly', priority: 0.6 },
            '/en/news/events': { changefreq: 'weekly', priority: 0.6 },
            '/en/news/carrier': { changefreq: 'weekly', priority: 0.6 },
            '/en/contact': { changefreq: 'monthly', priority: 0.7 },
        }

        return {
            loc: url, // URL ปกติ
            changefreq: map[url]?.changefreq || 'weekly',
            priority: map[url]?.priority || 0.7,
            lastmod: new Date().toISOString().split('T')[0], // yyyy-mm-dd
        }
    },
}
