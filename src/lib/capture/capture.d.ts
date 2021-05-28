type Browser = import('puppeteer-core').Browser
type BrowserLaunchArgumentOptions =
  import('puppeteer-core').BrowserLaunchArgumentOptions
type BrowserConnectOptions = import('puppeteer-core').BrowserConnectOptions
type LaunchOptions = import('puppeteer-core').LaunchOptions
type Product = import('puppeteer-core').Product

declare type PageEvaluator = (page: Page) => Promise<void>

declare interface CaptureOptions {
  url: string
  browser?: Browser
  evaluator?: PageEvaluator
}

declare type CaptureQueryOptions = Pick<CaptureOptions, 'url'>

declare type Capture = (
  options: CaptureOptions & {
    browserOptions?: GetBrowserOptions
  },
) => Promise<Buffer>

declare type GetBrowserOptions = LaunchOptions &
  BrowserLaunchArgumentOptions &
  BrowserConnectOptions & {
    product?: Product
    extraPrefsFirefox?: Record<string, unknown>
  }
declare type GetBrowser = (options?: GetBrowserOptions) => Promise<Browser>
