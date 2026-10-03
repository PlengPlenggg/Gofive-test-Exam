# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration.spec.ts >> empeo registration >> TC009 reject a promo code that has already been used
- Location: tests\registration.spec.ts:184:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByText(/ไม่ถูกต้อง|ไม่พบ|หมดอายุ|ถูกใช้|ใช้งานไม่ได้|invalid/i).or(locator('.error, .error-message, .invalid-feedback, .text-danger, mat-error, .p-error, [class*="error"], [class*="invalid"], [role="alert"], [class*="toast" i]').or(getByText(/กรุณา(กรอก|เลือก|ระบุ)|โดเมนนี้มีบัญชีใช้งานแล้ว|ไม่ถูกต้อง/))).first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" getByText(/ไม่ถูกต้อง|ไม่พบ|หมดอายุ|ถูกใช้|ใช้งานไม่ได้|invalid/i).or(locator('.error, .error-message, .invalid-feedback, .text-danger, mat-error, .p-error, [class*="error"], [class*="invalid"], [role="alert"], [class*="toast" i]').or(getByText(/กรุณา(กรอก|เลือก|ระบุ)|โดเมนนี้มีบัญชีใช้งานแล้ว|ไม่ถูกต้อง/))).first() with timeout 10000ms
  - waiting for getByText(/ไม่ถูกต้อง|ไม่พบ|หมดอายุ|ถูกใช้|ใช้งานไม่ได้|invalid/i).or(locator('.error, .error-message, .invalid-feedback, .text-danger, mat-error, .p-error, [class*="error"], [class*="invalid"], [role="alert"], [class*="toast" i]').or(getByText(/กรุณา(กรอก|เลือก|ระบุ)|โดเมนนี้มีบัญชีใช้งานแล้ว|ไม่ถูกต้อง/))).first()
    23 × locator resolved to <p class="error e-error">…</p>
       - unexpected value "hidden"

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
- textbox "อีเมล*": test123+1791010950096@gmail.com
- textbox "ชื่อ*": ทดสอบ
- textbox "นามสกุล*": ระบบ
- text: "+66"
- textbox "เบอร์มือถือ*": "0967690708"
- img "coupon"
- text: FREE15DAY 
- paragraph:
  - checkbox: 
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
```

# Test source

```ts
  40  |     this.termsCheckbox = page.locator('input[type="checkbox"]').first();
  41  |     this.errors = page.locator(UI.errorSelector).or(page.getByText(UI.errorText));
  42  |   }
  43  | 
  44  |   /** field ที่เป็น placeholder หรือ label ก็ได้ */
  45  |   private input(text: string): Locator {
  46  |     return this.page
  47  |       .getByPlaceholder(text, { exact: true })
  48  |       .or(this.page.getByLabel(text, { exact: true }))
  49  |       .first();
  50  |   }
  51  | 
  52  |   async goto(): Promise<void> {
  53  |     await this.page.goto('/Register/empeo');
  54  |     await this.submitButton.scrollIntoViewIfNeeded();
  55  |     await expect(this.submitButton).toBeVisible();
  56  |   }
  57  | 
  58  |   async selectCompanyType(label = UI.companyTypeThai): Promise<void> {
  59  |     await this.page.getByText(label, { exact: true }).click();
  60  |   }
  61  | 
  62  |   /** ค้นหาบริษัทด้วยเลขผู้เสียภาษี/ชื่อ แล้วเลือกผลลัพธ์แรก */
  63  |   async searchCompany(keyword: string): Promise<void> {
  64  |   await this.page.getByPlaceholder(UI.companySearch).fill(keyword);
  65  |   const result = this.page.locator(UI.companyResult).first();
  66  |   try {
  67  |     await result.waitFor({ state: 'visible', timeout: 5_000 });
  68  |     await result.click();
  69  |     } catch {
  70  |     // ไม่มีรายการเด้งลงมา -> กด Enter
  71  |     await this.page.getByPlaceholder(UI.companySearch).press('Enter');
  72  |     }
  73  |   }
  74  | 
  75  |   /** เปิด dropdown ด้วย placeholder แล้วเลือกตัวเลือกตามข้อความ */
  76  |   async selectDropdown(placeholder: string, option: string): Promise<void> {
  77  |     await this.input(placeholder)
  78  |       .or(this.page.getByText(placeholder, { exact: true }))
  79  |       .first()
  80  |       .click();
  81  |     const byRole = this.page.getByRole('option', { name: option, exact: true });
  82  |     const byText = this.page.getByText(option, { exact: true });
  83  |     await byRole.or(byText).first().waitFor({ state: 'visible' });
  84  |     const target = (await byRole.count()) > 0 ? byRole.first() : byText.last();
  85  |     await target.click();
  86  |   }
  87  | 
  88  |   async fillForm(data: FormData): Promise<void> {
  89  |     await this.selectCompanyType();
  90  |     if (data.company !== null) {
  91  |   if (!data.company) {
  92  |       throw new Error('ช่องค้นหาบริษัทเป็น field บังคับ: ตั้งค่า TAX_ID ก่อนรัน');
  93  |     }
  94  |   await this.searchCompany(data.company);
  95  |   }
  96  |     if (data.businessType) await this.selectDropdown(UI.businessTypeField, data.businessType);
  97  |     if (data.userRange) await this.selectDropdown(UI.userRangeField, data.userRange);
  98  |     if (data.email !== null) await this.email.fill(data.email);
  99  |     if (data.firstName !== null) await this.firstName.fill(data.firstName);
  100 |     if (data.lastName !== null) await this.lastName.fill(data.lastName);
  101 |     if (data.phone !== null) await this.phone.fill(data.phone);
  102 |   }
  103 | 
  104 |   async setPhone(value: string): Promise<void> {
  105 |     await this.phone.fill('');
  106 |     await this.phone.fill(value);
  107 |   }
  108 | 
  109 |   async setEmail(value: string): Promise<void> {
  110 |     await this.email.fill('');
  111 |     await this.email.fill(value);
  112 |   }
  113 | 
  114 |   async acceptTerms(): Promise<void> {
  115 |     await this.termsCheckbox.check({ force: true });
  116 |   }
  117 | 
  118 |   async submit(): Promise<void> {
  119 |     await this.submitButton.scrollIntoViewIfNeeded();
  120 |     if (await this.submitButton.isEnabled()) {
  121 |       await this.submitButton.click();
  122 |     }
  123 |   }
  124 | 
  125 |   // ---------- Promo code ----------
  126 |   async applyPromo(code: string): Promise<void> {
  127 |     if (!(await this.promoInput.isVisible())) {
  128 |       await this.promoToggle.click();
  129 |     }
  130 |     await this.promoInput.fill('');
  131 |     await this.promoInput.fill(code);
  132 |     await this.promoApplyButton.click();
  133 |   }
  134 | 
  135 |   async expectPromoApplied(code: string): Promise<void> {
  136 |     await expect(this.page.getByText(code, { exact: true }).first()).toBeVisible();
  137 |   }
  138 | 
  139 |   async expectPromoError(): Promise<void> {
> 140 |     await expect(this.page.getByText(UI.promoError).or(this.errors).first()).toBeVisible();
      |                                                                              ^ Error: expect(locator).toBeVisible() failed
  141 |   }
  142 | 
  143 |   // ---------- Assertions ----------
  144 |   /** ยังอยู่ที่ฟอร์ม และไม่ไปหน้า OTP */
  145 |   async expectStayOnForm(): Promise<void> {
  146 |     // รอให้ request/animation หลังกดปุ่มเสร็จก่อนยืนยันว่า "ไม่ไปต่อ"
  147 |     await this.page.waitForLoadState('networkidle').catch(() => undefined);
  148 |     await this.page.waitForTimeout(1000);
  149 |     await expect(this.submitButton).toBeVisible();
  150 |     await expect(this.page.getByText(UI.otpTitle)).toHaveCount(0);
  151 |   }
  152 | 
  153 |   /** soft: ถ้าข้อความ error ไม่ตรง selector จะบันทึกเป็น fail แต่เคสยังรันต่อ */
  154 |   async expectErrorShown(): Promise<void> {
  155 |     await expect.soft(this.errors.first()).toBeVisible();
  156 |   }
  157 | }
  158 | 
```