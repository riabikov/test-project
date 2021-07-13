const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const puppeteer = require('puppeteer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/api', async (req, res) => {
    if (req.body.site !== '') {
        let urls = [];

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (request.resourceType() === 'stylesheet') {
                urls.push({type: "CSS", link: request.url()});
            }
            if (request.resourceType() === 'script') {
                urls.push({type: "JS", link: request.url()});
            }
            request.continue();
        });
        await page.goto('https://' + req.body.site);
        //console.log(urls);
        await browser.close();
        res.send({response: urls});
    } else {
        res.send({error: {code: 666, reason: 'Без печенек работать не буду!'}});
    }
});

app.listen(port, () => {
    console.log(`Backend started at http://localhost:${port}`);
});