# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration.spec.ts >> empeo registration >> TC007 error when required field is blank [company]
- Location: tests\registration.spec.ts:166:9

# Error details

```
Error: locator.check: Clicking the checkbox did not change its state
Call log:
  - waiting for locator('input[type="checkbox"]').first()
    - locator resolved to <input type="checkbox" class="input-checkbox gf-icon-checkbox" data-testid="input_checkbox_registration_checkbox"/>
  - attempting click action
    - scrolling into view if needed
    - done scrolling
    - forcing action
    - performing click action
    - click action done
    - waiting for scheduled navigations to finish
    - navigations have finished

```

# Page snapshot

```yaml
- generic [ref=e7]:
  - generic [ref=e8]:
    - img "logo" [ref=e10]
    - generic [ref=e18]:
      - generic [ref=e19]: ไทย
      - generic [ref=e25]: 
    - generic [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e31]: โปรแกรมบริหารงาน บุคคลครบวงจร
        - generic [ref=e32]:
          - generic [ref=e33]:
            - generic [ref=e34]: ให้เราช่วยคุณจัดการความท้าทายในการบริหารคนด้วยระบบที่ทันสมัย ทรงพลัง และใช้งานง่าย
            - generic [ref=e36]:
              - generic [ref=e37]: ลองใช้ฟรี 30 วัน
              - button " ดูวิดีโอ" [ref=e40] [cursor=pointer]:
                - generic [ref=e41]: 
                - generic [ref=e42]: ดูวิดีโอ
          - img "detail-image" [ref=e43]
      - generic [ref=e45]:
        - generic [ref=e46]:
          - generic [ref=e47]: ทดลองใช้งาน empeo ฟรี!
          - generic [ref=e48]: ไม่จำเป็นต้องใช้บัตรเครดิต ยกเลิกได้ทุกเมื่อ
        - generic [ref=e50]:
          - generic [ref=e51]:
            - generic [ref=e54] [cursor=pointer]:
              - radio [checked] [ref=e56]
              - generic [ref=e57]: บริษัทจดทะเบียนในไทย
            - generic [ref=e60] [cursor=pointer]:
              - radio [ref=e62]
              - generic [ref=e63]: อื่นๆ
          - generic [ref=e72]:
            - generic [ref=e73]: 
            - textbox "กรอกเลขประจำตัวผู้เสียภาษี หรือ ชื่อบริษัท" [ref=e78]
          - generic [ref=e79]:
            - generic [ref=e87]:
              - generic [ref=e88]: ค้าปลีก
              - generic [ref=e94]: 
            - generic [ref=e105]:
              - generic [ref=e106]: 1-20
              - generic [ref=e112]: 
          - textbox "อีเมล*" [ref=e124]: test123+1791010821590@gmail.com
          - generic [ref=e125]:
            - textbox "ชื่อ*" [ref=e133]: ทดสอบ
            - textbox "นามสกุล*" [ref=e141]: ระบบ
          - generic [ref=e144]:
            - generic [ref=e145]: "+66"
            - textbox "เบอร์มือถือ*" [ref=e150]: "0967690708"
          - generic [ref=e151]:
            - img "coupon" [ref=e152]
            - generic [ref=e153] [cursor=pointer]: ใช้โค้ดส่วนลด
          - generic [ref=e154]:
            - paragraph [ref=e155]:
              - checkbox [ref=e156] [cursor=pointer]: 
              - generic [ref=e157]:
                - text: ฉันยอมรับ
                - link "นโยบายความเป็นส่วนตัว" [ref=e158] [cursor=pointer]:
                  - /url: https://www.empeo.com/privacy-policy/
                - text: และ
                - link "ข้อกำหนดและเงื่อนไขการใช้งาน" [ref=e159] [cursor=pointer]:
                  - /url: https://www.empeo.com/terms-and-conditions/
            - text: 
          - button "ทดลองใช้ฟรี" [ref=e162] [cursor=pointer]
        - generic [ref=e164]:
          - generic [ref=e165]:
            - img "image-step" [ref=e166]
            - generic [ref=e167]: ลงทะเบียนเรียบร้อย ใช้งานได้ทันที
          - generic [ref=e169]:
            - img "image-step" [ref=e170]
            - generic [ref=e171]: พร้อมคู่มือการใช้งาน ระบบแบบครบถ้วน
          - generic [ref=e173]:
            - img "image-step" [ref=e174]
            - generic [ref=e175]: พร้อมดูแลคุณ ผ่าน Live Chat ทุกวันไม่เว้นวันหยุด
    - generic [ref=e177]:
      - generic [ref=e178]:
        - generic [ref=e179]: empeo ระบบ HR ที่บริษัทต่างๆให้ความไว้วางใจ
        - generic [ref=e180]:
          - generic [ref=e181]:
            - img "footer-feature" [ref=e182]
            - generic [ref=e183]: 5,000+
            - generic [ref=e184]: บริษัท
          - generic [ref=e185]:
            - img "footer-feature" [ref=e186]
            - generic [ref=e187]: 45,000+
            - generic [ref=e188]: ผู้ใช้งานต่อวัน
          - generic [ref=e189]:
            - img "footer-feature" [ref=e190]
            - generic [ref=e191]: 30+
            - generic [ref=e192]: ทีมดูแลลูกค้ากว่า 30 คน
      - generic [ref=e195]:
        - list [ref=e196]:
          - listitem [ref=e197] [cursor=pointer]
          - listitem [ref=e198] [cursor=pointer]
          - listitem [ref=e199] [cursor=pointer]
        - img "image-preview" [ref=e203]
  - img "Crisp Chat" [ref=e205] [cursor=pointer]
```

# Test source

```ts
  15  | 
  16  | export class RegisterPage {
  17  |   readonly submitButton: Locator;
  18  |   readonly email: Locator;
  19  |   readonly firstName: Locator;
  20  |   readonly lastName: Locator;
  21  |   readonly phone: Locator;
  22  |   readonly promoToggle: Locator;
  23  |   readonly promoInput: Locator;
  24  |   readonly promoApplyButton: Locator;
  25  |   readonly termsCheckbox: Locator;
  26  |   readonly errors: Locator;
  27  | 
  28  |   constructor(private readonly page: Page) {
  29  |     this.submitButton = page.getByRole('button', { name: UI.submitButton, exact: true });
  30  |     this.email = this.input(UI.emailField);
  31  |     this.firstName = this.input(UI.firstNameField);
  32  |     this.lastName = this.input(UI.lastNameField);
  33  |     this.phone = this.input(UI.phoneField);
  34  |     this.promoToggle = page.getByText(UI.promoToggle, { exact: true });
  35  |     this.promoInput = page.getByPlaceholder(UI.promoInput);
  36  |     this.promoApplyButton = page
  37  |       .getByRole('button', { name: UI.promoApply, exact: true })
  38  |       .or(page.getByText(UI.promoApply, { exact: true }))
  39  |       .first();
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
> 115 |     await this.termsCheckbox.check({ force: true });
      |                              ^ Error: locator.check: Clicking the checkbox did not change its state
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
  140 |     await expect(this.page.getByText(UI.promoError).or(this.errors).first()).toBeVisible();
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