# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration.spec.ts >> empeo registration >> TC006 handle expired OTP, then register with a newly requested OTP
- Location: tests\registration.spec.ts:138:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/หมดอายุ|expired/i).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText(/หมดอายุ|expired/i).first() with timeout 10000ms
  - waiting for getByText(/หมดอายุ|expired/i).first()

```

```yaml
- img "logo"
- text: ไทย  โปรแกรมบริหารงาน บุคคลครบวงจร ให้เราช่วยคุณจัดการความท้าทายในการบริหารคนด้วยระบบที่ทันสมัย ทรงพลัง และใช้งานง่าย ลองใช้ฟรี 30 วัน
- button " ดูวิดีโอ"
- img "detail-image"
- text: ทดลองใช้งาน empeo ฟรี! ไม่จำเป็นต้องใช้บัตรเครดิต ยกเลิกได้ทุกเมื่อ
- radio [checked]
- text: บริษัทจดทะเบียนในไทย
- radio
- text: อื่นๆ 
- textbox "กรอกเลขประจำตัวผู้เสียภาษี หรือ ชื่อบริษัท": "0845558000034"
- textbox "ชื่อบริษัท*" [disabled]: บริษัท อเมซิ่ง พิกเซลส์ โฟโต้กราฟฟี่ จำกัด
- text: ค้าปลีก  1-20 
- textbox "อีเมล*": test123+1791010756890@gmail.com
- textbox "ชื่อ*": ทดสอบ
- textbox "นามสกุล*": ระบบ
- text: "+66"
- textbox "เบอร์มือถือ*": "0967690708"
- img "coupon"
- text: ใช้โค้ดส่วนลด
- paragraph:
  - checkbox [checked]: 
  - text: ฉันยอมรับ
  - link "นโยบายความเป็นส่วนตัว":
    - /url: https://www.empeo.com/privacy-policy/
  - text: และ
  - link "ข้อกำหนดและเงื่อนไขการใช้งาน":
    - /url: https://www.empeo.com/terms-and-conditions/
- button "ทดลองใช้ฟรี"
- img "image-step"
- text: ลงทะเบียนเรียบร้อย ใช้งานได้ทันที
- img "image-step"
- text: พร้อมคู่มือการใช้งาน ระบบแบบครบถ้วน
- img "image-step"
- text: พร้อมดูแลคุณ ผ่าน Live Chat ทุกวันไม่เว้นวันหยุด empeo ระบบ HR ที่บริษัทต่างๆให้ความไว้วางใจ
- img "footer-feature"
- text: 5,000+ บริษัท
- img "footer-feature"
- text: 45,000+ ผู้ใช้งานต่อวัน
- img "footer-feature"
- text: 30+ ทีมดูแลลูกค้ากว่า 30 คน
- list:
  - listitem
  - listitem
  - listitem
- img "image-preview"
- img "Crisp Chat"
- text: 
- paragraph: กรุณาตรวจสอบข้อความ
- paragraph: โปรดกรอกรหัส OTP ที่ถูกส่งไปยัง 096-XXX-0708
- paragraph: "ref: 8054"
- textbox
- textbox
- textbox
- textbox
- textbox
- textbox
- button "ยืนยัน" [disabled]
- text: ยังไม่ได้รับ OTP? ส่งใหม่อีกครั้ง
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { UI } from '../config/locators';
  3  | 
  4  | export class OtpPage {
  5  |   readonly title: Locator;
  6  |   readonly inputs: Locator;
  7  |   readonly confirmButton: Locator;
  8  |   readonly resendButton: Locator;
  9  |   readonly countdown: Locator;
  10 |   readonly toast: Locator;
  11 | 
  12 |   constructor(private readonly page: Page) {
  13 |     this.title = page.getByText(UI.otpTitle).first();
  14 |     this.inputs = this.title.locator('xpath=ancestor::*[.//input][1]').locator('input');
  15 |     this.confirmButton = page
  16 |     .getByRole('button', { name: UI.otpConfirmButton })
  17 |     .or(page.getByText(UI.otpConfirmButton))
  18 |     .last();
  19 |     this.resendButton = page
  20 |       .getByRole('button', { name: UI.resend })
  21 |       .or(page.getByText(UI.resend))
  22 |       .first();
  23 |     this.countdown = page.getByText(UI.countdown).first();
  24 |     this.toast = page.locator(UI.toast).first();
  25 |   }
  26 | 
  27 |   async waitForShown(): Promise<void> {
  28 |     try {
  29 |       await expect(this.title).toBeVisible({ timeout: 20_000 });
  30 |     } catch {
  31 |       const msgs = (
  32 |         await this.page.locator(UI.errorSelector).or(this.page.getByText(UI.errorText)).allInnerTexts()
  33 |       )
  34 |       .map((t) => t.trim())
  35 |       .filter(Boolean);
  36 |       throw new Error(
  37 |         `ไม่พบหน้า OTP หลังกด submit | error บนฟอร์ม: ${msgs.length ? msgs.join(' | ') : '(ไม่พบ)'}`,
  38 |       );
  39 |     }
  40 |   }
  41 | 
  42 |   /** พิมพ์ทีละตัว ใช้ได้ทั้งแบบ 6 ช่อง (auto-focus) และช่องเดียว */
  43 |   async enter(code: string): Promise<void> {
  44 |     const count = await this.inputs.count();
  45 |     for (let i = 0; i < count; i++) {
  46 |       await this.inputs.nth(i).fill('').catch(() => undefined);
  47 |     }
  48 |     if (count > 0) await this.inputs.first().click();
  49 |     await this.page.keyboard.type(code, { delay: 60 });
  50 |   }
  51 | 
  52 |   /** กดยืนยันถ้าปุ่มพร้อมใช้งาน (บางระบบ submit อัตโนมัติเมื่อครบ 6 หลัก) */
  53 |   async confirmIfPossible(): Promise<void> {
  54 |     if ((await this.confirmButton.isVisible()) && (await this.confirmButton.isEnabled())) {
  55 |       await this.confirmButton.click();
  56 |     }
  57 |   }
  58 | 
  59 |   async enterAndConfirm(code: string): Promise<void> {
  60 |     await this.enter(code);
  61 |     await this.confirmIfPossible();
  62 |   }
  63 | 
  64 |   // ---------- Assertions ----------
  65 |   async expectRegistered(): Promise<void> {
  66 |     await expect(this.page).toHaveURL(UI.createPasswordUrl, { timeout: 30_000 });
  67 |     await expect(this.page.getByText(UI.createPasswordTitle, { exact: true })).toBeVisible();
  68 |     await this.page.waitForTimeout(Number(process.env.END_PAUSE_MS ?? 0));
  69 |   }
  70 | 
  71 |   async expectNotRegistered(): Promise<void> {
  72 |     await this.page.waitForTimeout(1500);
  73 |     await expect(this.page).not.toHaveURL(UI.createPasswordUrl);
  74 |   }
  75 | 
  76 |   async expectWrongOtpError(): Promise<void> {
  77 |     // pop-up สีแดงมุมขวาบน (toast) หรือข้อความ error
  78 |     await expect(this.toast.or(this.page.getByText(UI.otpWrong)).first()).toBeVisible();
  79 |   }
  80 | 
  81 |   async expectExpiredMessage(): Promise<void> {
> 82 |     await expect(this.page.getByText(UI.otpExpired).first()).toBeVisible();
     |                                                              ^ Error: expect(locator).toBeVisible() failed
  83 |   }
  84 | 
  85 |   /** ระหว่างนับเวลาต้องเห็น "รับ OTP ใหม่อีกครั้งได้ใน m:ss" และยังไม่มีลิงก์ขอใหม่ */
  86 |   async expectResendOnCooldown(): Promise<void> {
  87 |     await expect(this.countdown).toBeVisible();
  88 |     await expect(this.resendButton).toBeHidden();
  89 |   }
  90 | 
  91 |   /** รอตัวนับเวลาจบ แล้วกดขอ OTP ใหม่ */
  92 |   async resend(): Promise<void> {
  93 |     await expect(this.countdown).toBeHidden({ timeout: 60_000 });
  94 |     await expect(this.resendButton).toBeVisible();
  95 |     await this.resendButton.click();
  96 |   }
  97 | }
  98 | 
```