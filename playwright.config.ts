import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  // ข้อมูลทดสอบชุดเดียว (เบอร์/โค้ดเดียว) จึงรันทีละเคสตามลำดับในไฟล์
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['./src/reporters/testcase-video-reporter.ts'],
  ],
  use: {
    baseURL: 'https://portal.uat.gofive.co.th',
    locale: 'th-TH',
    video: 'on', // บันทึกวิดีโอทุกเคส (อยู่ใน test-results/)
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    launchOptions: { slowMo: Number(process.env.SLOW_MO ?? 0) },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
