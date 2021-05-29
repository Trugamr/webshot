import chromium from 'chrome-aws-lambda'

export const getBrowser: GetBrowser = async options => {
  const browser = chromium.puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
    ...options,
  })

  return browser
}

const capture: Capture = async ({
  url,
  waitFor,
  browser,
  evaluator,
  browserOptions,
}) => {
  if (browser === undefined) browser = await getBrowser(browserOptions)

  const [page] = await browser.pages()
  try {
    // Vercel serverless functions have a 10 sec timeout
    const promises: Promise<any>[] = []

    // if wait interval before screenshot is specified wait for it
    // but goto page in parallel, this way both timeout and wait for can be respected
    if (waitFor) promises.push(page.waitForTimeout(waitFor))

    promises.push(page.goto(url, { timeout: 5000 }))

    await Promise.all(promises)
  } catch (error) {
    console.log(`Timed out for ${url}`)
  }

  if (evaluator) await evaluator(page)

  const image = await page.screenshot()

  browser.close()

  return image as Buffer
}

export default capture
