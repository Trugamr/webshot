import chromium from 'chrome-aws-lambda'

export const getBrowser = async () => {
  const browser = chromium.puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  })

  return browser
}

const capture: Capture = async ({ url, browser, evaluator }) => {
  if (browser === undefined) browser = await getBrowser()

  const page = await browser.newPage()
  await page.goto(url)

  if (evaluator) await evaluator(page)

  const image = (await page.screenshot()) as Buffer

  browser.close()

  return image
}

export default capture
