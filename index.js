const puppeteer = require('puppeteer')

async function run(searchQuery) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    })
    const page = await browser.newPage()
    await page.goto('https://play.google.com/store/games?hl=en', {
        waitUntil: "domcontentloaded"
    })

    await page.click('#kO001e > header > nav > div > div:nth-child(1) > button', {
        delay: 20
    })

    await page.waitForSelector('#kO001e > header > nav > c-wiz > div > div > label > input')
    await page.type('#kO001e > header > nav > c-wiz > div > div > label > input', searchQuery)
    await page.keyboard.press("Enter")

    await page.waitForSelector('#yDmH0d > c-wiz:nth-child(7) > div > div > c-wiz > c-wiz > c-wiz > section > div > div > div > div > div > div.VfPpkd-aGsRMb > div > a')
    const links = await page.$$('#yDmH0d > c-wiz:nth-child(7) > div > div > c-wiz > c-wiz > c-wiz > section > div > div > div > div > div > div.VfPpkd-aGsRMb > div > a')

    const URLs = []

    for (let link of links) {
        const url = await link.evaluate(l => l.getAttribute('href'))
        URLs.push('https://play.google.com' + url)
    }
    const appData = []
    async function extract(url) {
        await page.goto(url, {
            waitUntil: "domcontentloaded"
        })

        try {
            await page.waitForSelector('h1', {
                timeout: 500
            })
            const titleElement = await page.$('h1')
            const title = await titleElement.evaluate(t => t.textContent)

            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.qxNhq > div > div > div > div.Vbfug.auoIOc > a > span', {
                timeout: 500
            })
            const companyElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.qxNhq > div > div > div > div.Vbfug.auoIOc > a > span')
            const company = await companyElement.evaluate(c => c.textContent)

            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.qxNhq > div > div > div > div.ulKokd > div', {
                timeout: 500
            })
            const adsElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.qxNhq > div > div > div > div.ulKokd > div')
            const ads = await adsElement.evaluate(a => a.textContent)

            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(1) > div.ClM7O', {
                timeout: 500
            })
            const ratingElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(1) > div.ClM7O')
            const rating = await ratingElement.evaluate(r => r.textContent)

            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(1) > div.g1rdde', {
                timeout: 500
            })
            const reviewElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(1) > div.g1rdde')
            const review = await reviewElement.evaluate(r => r.textContent)

            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(2) > div.ClM7O', {
                timeout: 500
            })
            const downloadsElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div.P9KVBf > div > div > c-wiz > div.hnnXjf.XcNflb.J1Igtd > div.JU1wdd > div > div > div:nth-child(2) > div.ClM7O')
            const downloads = await downloadsElement.evaluate(d => d.textContent)
            appData.push({
                title,
                company,
                ads,
                rating,
                review,
                downloads
            })
        } catch (e) {
            await page.waitForSelector('h1', {
                timeout: 500
            })
            const titleElement = await page.$('h1')
            const title = await titleElement.evaluate(t => t.textContent)

            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > c-wiz > div.hnnXjf > div.Il7kR > div > div > div > div.Vbfug.auoIOc > a > span', {
                timeout: 500
            })
            const companyElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > c-wiz > div.hnnXjf > div.Il7kR > div > div > div > div.Vbfug.auoIOc > a > span')
            const company = await companyElement.evaluate(c => c.textContent)
            let ads
            try {
                await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > c-wiz > div.hnnXjf > div.Il7kR > div > div > div > div.ulKokd > div > span', {
                    timeout: 500
                })
                const adsElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > c-wiz > div.hnnXjf > div.Il7kR > div > div > div > div.ulKokd > div > span')
                ads = await adsElement.evaluate(a => a.textContent)
            }catch (e) {

            }

            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > c-wiz > div.hnnXjf > div.JU1wdd > div > div > div:nth-child(1) > div.ClM7O > div > div', {
                timeout: 500
            })
            const ratingElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > c-wiz > div.hnnXjf > div.JU1wdd > div > div > div:nth-child(1) > div.ClM7O > div > div')
            const rating = await ratingElement.evaluate(r => r.textContent)

            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > c-wiz > div.hnnXjf > div.JU1wdd > div > div > div:nth-child(1) > div.g1rdde', {
                timeout: 500
            })
            const reviewElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > c-wiz > div.hnnXjf > div.JU1wdd > div > div > div:nth-child(1) > div.g1rdde')
            const review = await reviewElement.evaluate(r => r.textContent)

            await page.waitForSelector('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > c-wiz > div.hnnXjf > div.JU1wdd > div > div > div:nth-child(2) > div.ClM7O', {
                timeout: 500
            })
            const downloadsElement = await page.$('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > c-wiz > div.hnnXjf > div.JU1wdd > div > div > div:nth-child(2) > div.ClM7O')
            const downloads = await downloadsElement.evaluate(d => d.textContent)
            appData.push({
                title,
                company,
                ads,
                rating,
                review,
                downloads
            })
        }

        
    }
    for (let url of URLs) {
        try {
            await extract(url)
        } catch (e) {
            console.error(e)
            await extract(url)
        }

    }
    await browser.close()
    console.log(appData)
    
}

run("Notes app")