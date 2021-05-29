type Browser = import('playwright-core').Browser
type LaunchOptions = import('playwright-core').LaunchOptions

declare type PageEvaluator = (page: Page) => Promise<void>

declare interface CaptureOptions {
  url: string
  waitFor?: number
  selector?: string
  fullPage?: boolean
  browser?: Browser
  evaluator?: PageEvaluator
  browserOptions?: GetBrowserOptions
}

declare type CaptureQueryOptions = import('./schemas').CaptureQuerySchema & {
  url: string
}

declare type Capture = (options: CaptureOptions) => Promise<Buffer>

declare type GetBrowserOptions = LaunchOptions
declare type GetBrowser = (options?: GetBrowserOptions) => Promise<Browser>
