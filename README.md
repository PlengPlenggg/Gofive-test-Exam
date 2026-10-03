# empeo Registration – Automation Tests (Playwright + TypeScript)

ทดสอบหน้าสมัคร https://portal.uat.gofive.co.th/Register/empeo ครอบคลุม TC001–TC009

## Test Case Design
| Test Case ID | Test Scenario | Expected Result |
|---|---|---|
| TC001 | Register with valid data and valid promo code | Registration succeeds and the create-password page is displayed |
| TC002 | Validate required fields and email format, then register after correction | Required-field and email validation errors are displayed |
| TC003 | Reject invalid phone numbers, then register with a valid number | Invalid phone numbers are rejected and a valid number proceeds to OTP |
| TC004 | Reject invalid promo code, then accept a valid one | Invalid promo code shows an error and valid promo code is accepted |
| TC005 | Reject invalid OTP inputs, then accept the correct OTP | Incomplete, invalid, and incorrect OTP values are rejected |
| TC006 | Handle expired OTP, then register with a newly requested OTP | Expired OTP is detected and a newly requested OTP can be used |
| TC007 | Validate each required field when it is blank | The appropriate validation error is displayed for each blank field |
| TC008 | Prevent registration when terms are not accepted | Registration cannot continue until the terms are accepted |
| TC009 | Reject a promo code that has already been used | An error is displayed when the promo code has already been used |

## วิธีรัน
```bash
npm install
npx playwright install chromium

npm test                 # รันทั้งหมด (headless) บันทึกวิดีโอทุกเคส
npm run test:headed      # เปิดเบราว์เซอร์ให้เห็น (เหมาะอัดวิดีโอส่ง)
npm run test:ui          # โหมด UI ของ Playwright
npx playwright test -g "TC001"   # รันเฉพาะเคส
npm run report           # เปิด HTML report
```
วิดีโออยู่ที่ `test-results/` และรายงานที่ `playwright-report/`

## Test Results และหลักฐานการรัน
ผลการรันจะถูกเก็บไว้ในโฟลเดอร์ต่อไปนี้:

- `test-results/` เก็บวิดีโอ ภาพหน้าจอ และ trace ของแต่ละ Test Case
- `playwright-report/` เก็บ HTML Report สำหรับเปิดดูผลรวมและรายละเอียดแต่ละเคส

หลังจากรันเทสต์แล้ว สามารถเปิดรายงานด้วยคำสั่ง:

```bash
npm run report
```

เมื่อส่งโปรเจกต์ ให้ส่งโฟลเดอร์ `test-results/` และ `playwright-report/` ไปพร้อมกับ source code ได้เลย ส่วน `node_modules/` ไม่ต้องส่ง เพราะติดตั้งใหม่ได้จาก `package.json`

## ตัวแปรปรับค่า (Environment variables)
| ตัวแปร | ค่าเริ่มต้น |
|---|---|
| `PHONE` | 0967690708 |
| `OTP_EXPIRE_SECONDS` | 30 |
| `TAX_ID` | 0845558000034 |

## Data Tax_ID ในกรณีที่ทางบริษัทจะลองรันใหม่ทั้งหมด
Tax_ID: 0305566007110 ให้ไปแก้ในหน้า config/testData.ts ในบรรทัด taxId: process.env.TAX_ID ?? '0845558000034',

## โครงสร้าง
```
src/config/locators.ts   # locator/ข้อความทั้งหมด 
src/config/testData.ts   # ข้อมูลทดสอบ
src/pages/               # Page Object: RegisterPage, OtpPage
tests/registration.spec.ts
```

## Remark
- TC003 Fail เพราะเว็ปสามารถอนุญาตให้ใส่เบอร์โทรที่มีตัวอักษตรผสมอยู่ได้
- TC007 Fail เพราะไม่ได้กรอกชื่อบริษัทกดไปต่อไม่ได้แต่ไม่มี error แสดงบอกบนหน้าจอ
- TC009 Fail เพราะ Promo Code สามารถใส่ได้เรื่อยๆ

