import chromium from 'chrome-aws-lambda'
import { ElementHandle, Page } from 'puppeteer-core'

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
  selector,
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

  // Run javascript on page
  if (evaluator) await evaluator(page)

  // Find element to capture by selector
  let elementToCapture: undefined | Page | ElementHandle<Element>
  if (selector) {
    const selectedElement = await page.$(selector)
    if (selectedElement === null) {
      browser.close()
      throw new Error('Element with specified selector not found')
    }

    elementToCapture = selectedElement
  } else {
    elementToCapture = page
  }

  const image = (await elementToCapture.screenshot()) as Buffer
  browser.close()
  return image
}

export default capture
