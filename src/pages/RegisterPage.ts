import { Page, Locator, expect } from '@playwright/test';
import { UI } from '../config/locators';
import { TEST_DATA } from '../config/testData';

/** null = ไม่กรอก/ไม่เลือก field นั้น (ใช้ทดสอบ required field) */
export interface FormData {
  company: string | null;
  businessType: string | null;
  userRange: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
}

export class RegisterPage {
  readonly submitButton: Locator;
  readonly email: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly phone: Locator;
  readonly promoToggle: Locator;
  readonly promoInput: Locator;
  readonly promoApplyButton: Locator;
  readonly termsCheckbox: Locator;
  readonly errors: Locator;

  constructor(private readonly page: Page) {
    this.submitButton = page.getByRole('button', { name: UI.submitButton, exact: true });
    this.email = this.input(UI.emailField);
    this.firstName = this.input(UI.firstNameField);
    this.lastName = this.input(UI.lastNameField);
    this.phone = this.input(UI.phoneField);
    this.promoToggle = page.getByText(UI.promoToggle, { exact: true });
    this.promoInput = page.getByPlaceholder(UI.promoInput);
    this.promoApplyButton = page
      .getByRole('button', { name: UI.promoApply, exact: true })
      .or(page.getByText(UI.promoApply, { exact: true }))
      .first();
    this.termsCheckbox = page.locator('input[type="checkbox"]').first();
    this.errors = page.locator(UI.errorSelector).or(page.getByText(UI.errorText));
  }

  /** field ที่เป็น placeholder หรือ label ก็ได้ */
  private input(text: string): Locator {
    return this.page
      .getByPlaceholder(text, { exact: true })
      .or(this.page.getByLabel(text, { exact: true }))
      .first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/Register/empeo');
    await this.submitButton.scrollIntoViewIfNeeded();
    await expect(this.submitButton).toBeVisible();
  }

  async selectCompanyType(label = UI.companyTypeThai): Promise<void> {
    await this.page.getByText(label, { exact: true }).click();
  }

  /** ค้นหาบริษัทด้วยเลขผู้เสียภาษี/ชื่อ แล้วเลือกผลลัพธ์แรก */
  async searchCompany(keyword: string): Promise<void> {
  await this.page.getByPlaceholder(UI.companySearch).fill(keyword);
  const result = this.page.locator(UI.companyResult).first();
  try {
    await result.waitFor({ state: 'visible', timeout: 5_000 });
    await result.click();
    } catch {
    // ไม่มีรายการเด้งลงมา -> กด Enter
    await this.page.getByPlaceholder(UI.companySearch).press('Enter');
    }
  }

  /** เปิด dropdown ด้วย placeholder แล้วเลือกตัวเลือกตามข้อความ */
  async selectDropdown(placeholder: string, option: string): Promise<void> {
    await this.input(placeholder)
      .or(this.page.getByText(placeholder, { exact: true }))
      .first()
      .click();
    const byRole = this.page.getByRole('option', { name: option, exact: true });
    const byText = this.page.getByText(option, { exact: true });
    await byRole.or(byText).first().waitFor({ state: 'visible' });
    const target = (await byRole.count()) > 0 ? byRole.first() : byText.last();
    await target.click();
  }

  async fillForm(data: FormData): Promise<void> {
    await this.selectCompanyType();
    if (data.company !== null) {
  if (!data.company) {
      throw new Error('ช่องค้นหาบริษัทเป็น field บังคับ: ตั้งค่า TAX_ID ก่อนรัน');
    }
  await this.searchCompany(data.company);
  }
    if (data.businessType) await this.selectDropdown(UI.businessTypeField, data.businessType);
    if (data.userRange) await this.selectDropdown(UI.userRangeField, data.userRange);
    if (data.email !== null) await this.email.fill(data.email);
    if (data.firstName !== null) await this.firstName.fill(data.firstName);
    if (data.lastName !== null) await this.lastName.fill(data.lastName);
    if (data.phone !== null) await this.phone.fill(data.phone);
  }

  async setPhone(value: string): Promise<void> {
    await this.phone.fill('');
    await this.phone.fill(value);
  }

  async setEmail(value: string): Promise<void> {
    await this.email.fill('');
    await this.email.fill(value);
  }

  async acceptTerms(): Promise<void> {
    await this.termsCheckbox.check({ force: true });
  }

  async submit(): Promise<void> {
    await this.submitButton.scrollIntoViewIfNeeded();
    if (await this.submitButton.isEnabled()) {
      await this.submitButton.click();
    }
  }

  // ---------- Promo code ----------
  async applyPromo(code: string): Promise<void> {
    if (!(await this.promoInput.isVisible())) {
      await this.promoToggle.click();
    }
    await this.promoInput.fill('');
    await this.promoInput.fill(code);
    await this.promoApplyButton.click();
  }

  async expectPromoApplied(code: string): Promise<void> {
    await expect(this.page.getByText(code, { exact: true }).first()).toBeVisible();
  }

  async expectPromoError(): Promise<void> {
    await expect(this.page.getByText(UI.promoError).or(this.errors).first()).toBeVisible();
  }

  // ---------- Assertions ----------
  /** ยังอยู่ที่ฟอร์ม และไม่ไปหน้า OTP */
  async expectStayOnForm(): Promise<void> {
    // รอให้ request/animation หลังกดปุ่มเสร็จก่อนยืนยันว่า "ไม่ไปต่อ"
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    await this.page.waitForTimeout(1000);
    await expect(this.submitButton).toBeVisible();
    await expect(this.page.getByText(UI.otpTitle)).toHaveCount(0);
  }

  /** soft: ถ้าข้อความ error ไม่ตรง selector จะบันทึกเป็น fail แต่เคสยังรันต่อ */
  async expectErrorShown(): Promise<void> {
    await expect.soft(this.errors.first()).toBeVisible();
  }
}
