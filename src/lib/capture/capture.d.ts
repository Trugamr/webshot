type Browser = import('puppeteer-core').Browser
type BrowserLaunchArgumentOptions =
  import('puppeteer-core').BrowserLaunchArgumentOptions
type BrowserConnectOptions = import('puppeteer-core').BrowserConnectOptions
type LaunchOptions = import('puppeteer-core').LaunchOptions
type Product = import('puppeteer-core').Product

declare type PageEvaluator = (page: Page) => Promise<void>

declare interface CaptureOptions {
  url: string
  waitFor?: number
  browser?: Browser
  evaluator?: PageEvaluator
  browserOptions?: GetBrowserOptions
}

declare type CaptureQueryOptions =
  import('../../pages/api/capture/schemas').CaptureQuerySchema & {
    url: string
    wait_until?: number
  }

declare type Capture = (options: CaptureOptions) => Promise<Buffer>

declare type GetBrowserOptions = LaunchOptions &
  BrowserLaunchArgumentOptions &
  BrowserConnectOptions & {
    product?: Product
    extraPrefsFirefox?: Record<string, unknown>
  }
declare type GetBrowser = (options?: GetBrowserOptions) => Promise<Browser>
