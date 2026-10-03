import { Page, Locator, expect } from '@playwright/test';
import { UI } from '../config/locators';

export class OtpPage {
  readonly title: Locator;
  readonly inputs: Locator;
  readonly confirmButton: Locator;
  readonly resendButton: Locator;
  readonly countdown: Locator;
  readonly toast: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByText(UI.otpTitle).first();
    this.inputs = this.title.locator('xpath=ancestor::*[.//input][1]').locator('input');
    this.confirmButton = page
    .getByRole('button', { name: UI.otpConfirmButton })
    .or(page.getByText(UI.otpConfirmButton))
    .last();
    this.resendButton = page
      .getByRole('button', { name: UI.resend })
      .or(page.getByText(UI.resend))
      .first();
    this.countdown = page.getByText(UI.countdown).first();
    this.toast = page.locator(UI.toast).first();
  }

  async waitForShown(): Promise<void> {
    try {
      await expect(this.title).toBeVisible({ timeout: 20_000 });
    } catch {
      const msgs = (
        await this.page.locator(UI.errorSelector).or(this.page.getByText(UI.errorText)).allInnerTexts()
      )
      .map((t) => t.trim())
      .filter(Boolean);
      throw new Error(
        `ไม่พบหน้า OTP หลังกด submit | error บนฟอร์ม: ${msgs.length ? msgs.join(' | ') : '(ไม่พบ)'}`,
      );
    }
  }

  /** พิมพ์ทีละตัว ใช้ได้ทั้งแบบ 6 ช่อง (auto-focus) และช่องเดียว */
  async enter(code: string): Promise<void> {
    const count = await this.inputs.count();
    for (let i = 0; i < count; i++) {
      await this.inputs.nth(i).fill('').catch(() => undefined);
    }
    if (count > 0) await this.inputs.first().click();
    await this.page.keyboard.type(code, { delay: 60 });
  }

  /** กดยืนยันถ้าปุ่มพร้อมใช้งาน (บางระบบ submit อัตโนมัติเมื่อครบ 6 หลัก) */
  async confirmIfPossible(): Promise<void> {
    if ((await this.confirmButton.isVisible()) && (await this.confirmButton.isEnabled())) {
      await this.confirmButton.click();
    }
  }

  async enterAndConfirm(code: string): Promise<void> {
    await this.enter(code);
    await this.confirmIfPossible();
  }

  // ---------- Assertions ----------
  async expectRegistered(): Promise<void> {
    await expect(this.page).toHaveURL(UI.createPasswordUrl, { timeout: 30_000 });
    await expect(this.page.getByText(UI.createPasswordTitle, { exact: true })).toBeVisible();
    await this.page.waitForTimeout(Number(process.env.END_PAUSE_MS ?? 0));
  }

  async expectNotRegistered(): Promise<void> {
    await this.page.waitForTimeout(1500);
    await expect(this.page).not.toHaveURL(UI.createPasswordUrl);
  }

  async expectWrongOtpError(): Promise<void> {
    // pop-up สีแดงมุมขวาบน (toast) หรือข้อความ error
    await expect(this.toast.or(this.page.getByText(UI.otpWrong)).first()).toBeVisible();
  }

  async expectExpiredMessage(): Promise<void> {
    await expect(this.page.getByText(UI.otpExpired).first()).toBeVisible();
  }

  /** ระหว่างนับเวลาต้องเห็น "รับ OTP ใหม่อีกครั้งได้ใน m:ss" และยังไม่มีลิงก์ขอใหม่ */
  async expectResendOnCooldown(): Promise<void> {
    await expect(this.countdown).toBeVisible();
    await expect(this.resendButton).toBeHidden();
  }

  /** รอตัวนับเวลาจบ แล้วกดขอ OTP ใหม่ */
  async resend(): Promise<void> {
    await expect(this.countdown).toBeHidden({ timeout: 60_000 });
    await expect(this.resendButton).toBeVisible();
    await this.resendButton.click();
  }
}
