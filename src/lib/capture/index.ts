import chromium from 'chrome-aws-lambda'
import playwright, { ElementHandle, Page } from 'playwright-core'

export const getBrowser: GetBrowser = async options => {
  let executablePath = await chromium.executablePath
  if (executablePath === null)
    executablePath =
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

  const browser = playwright.chromium.launch({
    executablePath,
    args: chromium.args,
    headless: chromium.headless,
    ...options,
  })

  return browser
}

const capture: Capture = async ({
  url,
  waitFor,
  selector,
  fullPage = false,
  browser,
  evaluator,
  browserOptions,
}) => {
  const timeout = 3000
  if (browser === undefined) browser = await getBrowser(browserOptions)

  const page = await browser.newPage()
  try {
    // Vercel serverless functions have a 10 sec timeout
    const promises: Promise<any>[] = []
    promises.push(page.goto(url, { timeout }))
    // if wait interval before screenshot is specified wait for it
    // but goto page in parallel, this way both timeout and wait for can be respected
    if (waitFor) promises.push(page.waitForTimeout(waitFor))
    // wait for selector to load if specified
    // if element with selector is not found timeout will throw an error anyway
    if (selector) promises.push(page.waitForSelector(selector, { timeout }))
    await Promise.all(promises)
  } catch (error) {
    console.log(url, error.message)
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

  const image = await elementToCapture.screenshot({ fullPage })

  browser.close()

  return image
}

export default capture
