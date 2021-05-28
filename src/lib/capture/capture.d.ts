declare type PageEvaluator = (page: Page) => Promise<void>

declare interface CaptureOptions {
  url: string
  browser?: import('puppeteer').Browser
  evaluator?: PageEvaluator
}

declare type Capture = (options: CaptureOptions) => Promise<Buffer>
