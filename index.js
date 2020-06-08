const express = require('express');
const app = express();
const port = process.env.PORT || 2000;
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
app.use(bodyparser.json());

const puppeteer = require('puppeteer');
app.use(cors());


//scrap from google search using key word
app.post("/data", cors(), (req, res) => {

        console.log(req.body.key);
        (async() => {
            const browser = await puppeteer.launch({
                headless: true,
                //args: ['--proxy-server=161.129.155.43:3128']
                timeout: 50000
            });
            browser.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36")
            const page = await browser.newPage();
            const key = req.body.key;
            const url = 'https://www.google.com/search?q=' + key + '';
            await page.goto(url);
            await page.screenshot({ path: './images/screenshot.png' });
            const result = await page.evaluate(() => {
                var urlfromweb = [];
                let lenght = document.querySelectorAll('.sA5rQ').length;
                for (var i = 0; i < lenght; i++) {
                    if (document.querySelectorAll('.sA5rQ')[i].innerText !== null) {
                        urlfromweb[i] = document.querySelectorAll('.sA5rQ')[i].innerText;
                    }
                }
                return urlfromweb;
            })

            console.log({ data: result })
                // await browser.waitForTarget(() => true);
            await browser.close();
            res.json(result);
        })();

    })
    //////////////////////////////////////////////////////////////////////////////////////
var lg = console.log;
//visit link that gived from the user 
app.post('/visitlinks', cors(), (req, res) => {
        const keyword = req.body.key;
        const index = req.body.index;
        lg(keyword);
        lg(index);
        const url = "https://www.google.com/search?q=" + keyword + "";

        // const link = req.body.link;
        var browsers = [
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36", "", "", "",
            ""
        ];
        (async() => {
            const browser = await puppeteer.launch({
                headless: false,
                //args: ['--proxy-server=161.129.155.43:3128']
                timeout: 20000
            });
            browser.userAgent(browsers[0]);
            const page = await browser.newPage();
            linksposition(index, url, page);
            // await browser.waitForTarget(() => true);
            setTimeout(async() => {
                await browser.close();
            }, 60000);
        })();
        res.json({ result: "the following " + "link" + " visited by user from browser " + browsers[0] + "at : " + Date.now() });
    })
    //switch between link index

const linksposition = async(index, url, page) => {
    switch (index) {
        case "0":
            await page.goto(url);
            await page.screenshot({ path: './images/screenshot.png' });
            await page.evaluate(() => {
                setTimeout(() => {
                    document.getElementsByClassName("sA5rQ")[0].click();
                }, 3000);
            })
            break;
        case "1":
            await page.goto(url);
            await page.screenshot({ path: './images/screenshot.png' });
            await page.evaluate(() => {
                setTimeout(() => {
                    document.getElementsByClassName("sA5rQ")[1].click();
                }, 3000);
            })
            break;
        case "2":
            await page.goto(url);
            await page.screenshot({ path: './images/screenshot.png' });
            await page.evaluate(() => {
                setTimeout(() => {
                    document.getElementsByClassName("sA5rQ")[2].click();
                }, 3000);
            })
            break;
        default:
            await page.goto(url);
            await page.screenshot({ path: './images/screenshot.png' });
            await page.evaluate(() => {
                setTimeout(() => {
                    document.getElementsByClassName("sA5rQ")[3].click();
                }, 3000);
            })
            break;

    }
}


app.listen(port);