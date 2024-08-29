const puppeteer = require('puppeteer')
const fs = require('fs')

async function run(searchQuery) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    })
    const page = await browser.newPage()
    await page.goto('https://play.google.com/store/games?hl=en', {
        waitUntil: "domcontentloaded"
    })

    await page.waitForSelector('#kO001e > header > nav > div > div:nth-child(1) > button')
    await page.click('#kO001e > header > nav > div > div:nth-child(1) > button', {
        delay: 20
    })

    await page.waitForSelector('#kO001e > header > nav > c-wiz > div > div > label > input')
    await page.type('#kO001e > header > nav > c-wiz > div > div > label > input', searchQuery)
    await page.keyboard.press("Enter")

    await page.waitForSelector('#yDmH0d > c-wiz:nth-child(7) > div > div > c-wiz > c-wiz > c-wiz > section > div > div > div > div > div > div.VfPpkd-aGsRMb > div > a')
    const links = await page.$$eval('#yDmH0d > c-wiz:nth-child(7) > div > div > c-wiz > c-wiz > c-wiz > section > div > div > div > div > div > div.VfPpkd-aGsRMb > div > a', allAnchors => allAnchors.map(anchor => anchor.href));

    async function extract(url) {
        await page.goto(url, {
            waitUntil: "domcontentloaded"
        })

        try {
            // Wait for the title element to appear and extract the app's title
            await page.waitForSelector('h1', { timeout: 2000 })
            const titleElement = await page.$('h1')
            const title = await titleElement.evaluate(t => t.textContent)

            // Extract the company's name
            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.qxNhq > div > div > div > div.Vbfug.auoIOc > a > span', { timeout: 2000 })
            const companyElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.qxNhq > div > div > div > div.Vbfug.auoIOc > a > span')
            const company = await companyElement.evaluate(c => c.textContent)

            // Check if the app contains ads
            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.qxNhq > div > div > div > div.ulKokd > div', { timeout: 2000 })
            const adsElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.qxNhq > div > div > div > div.ulKokd > div')
            const ads = await adsElement.evaluate(a => a.textContent)

            // Extract the app's rating
            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(1) > div.ClM7O', { timeout: 2000 })
            const ratingElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(1) > div.ClM7O')
            const rating = await ratingElement.evaluate(r => r.textContent)

            // Extract the number of reviews
            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(1) > div.g1rdde', { timeout: 2000 })
            const reviewElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(1) > div.g1rdde')
            const review = await reviewElement.evaluate(r => r.textContent)

            // Extract the number of downloads
            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(2) > div.ClM7O', { timeout: 2000 })
            const downloadsElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(2) > div.ClM7O')
            const downloads = await downloadsElement.evaluate(d => d.textContent)

            return {
                title,
                company,
                ads,
                rating,
                review,
                downloads
            }
        } catch (e) {
            console.error(e.message)
        }


    }

    const appData = []
    for (let link of links) {
        try {
            const data = await extract(link)
            appData.push(data)
        } catch (e) {
            console.error(e.message)
            await extract(link)
        }

    }
    
    await browser.close()
    console.log(appData)
    const stringifiedData = JSON.stringify(appData)
    fs.writeFileSync('data.json', stringifiedData)

}

run("Fun Games")