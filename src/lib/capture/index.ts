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
  browser,
  evaluator,
  browserOptions,
}) => {
  if (browser === undefined) browser = await getBrowser(browserOptions)

  const page = await browser.newPage()
  await page.goto(url)

  if (evaluator) await evaluator(page)

  const image = await page.screenshot()

  browser.close()

  return image as Buffer
}

export default capture
