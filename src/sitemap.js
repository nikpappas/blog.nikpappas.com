const fs = require('fs');

const { walk } = require('./renderUtils');



async function run() {
    const files = await walk("out", []);
    const htmls = files.filter(x =>
            x.endsWith(".html")
        )
        .filter(x => !x.endsWith('notFound.html'))
        .map(x => `
        <url>
            <loc>https://blog.nikpappas.com/${x.replace('out/', '').replace('index.html','').replace('.html','')}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
    `)
    return htmls.join("\n");
}

async function write() {
    const content = await run()


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        ${content}
        </urlset>`


    fs.writeFileSync("out/sitemap.xml", sitemap);
    const robots = `
    Sitemap: https://blog.nikpappas.com/sitemap.xml
    
    User-agent: * 
    Disallow: https://blog.nikpappas.com/notFound*
    `;
    fs.writeFileSync("out/robots.txt", robots);

}

write();