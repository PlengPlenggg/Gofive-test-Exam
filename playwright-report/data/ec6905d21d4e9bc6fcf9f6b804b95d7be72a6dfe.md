# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration.spec.ts >> empeo registration >> TC003 reject invalid phone numbers, then register with a valid number
- Location: tests\registration.spec.ts:71:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByText(/กรุณาตรวจสอบข้อความ|โปรดกรอกรหัส OTP/)
Expected: 0
Received: 2
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" getByText(/กรุณาตรวจสอบข้อความ|โปรดกรอกรหัส OTP/) with timeout 10000ms
  - waiting for getByText(/กรุณาตรวจสอบข้อความ|โปรดกรอกรหัส OTP/)
    23 × locator resolved to 2 elements
       - unexpected value "2"

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
              - textbox "กรอกเลขประจำตัวผู้เสียภาษี หรือ ชื่อบริษัท" [ref=e78]: "0845558000034"
            - generic [ref=e82]:
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - textbox "ชื่อบริษัท*" [disabled]: บริษัท อเมซิ่ง พิกเซลส์ โฟโต้กราฟฟี่ จำกัด
            - generic [ref=e83]:
              - generic [ref=e91]:
                - generic [ref=e92]: ค้าปลีก
                - generic [ref=e98]: 
              - generic [ref=e109]:
                - generic [ref=e110]: 1-20
                - generic [ref=e116]: 
            - textbox "อีเมล*" [ref=e128]: test123+1791010666427@gmail.com
            - generic [ref=e129]:
              - textbox "ชื่อ*" [ref=e137]: ทดสอบ
              - textbox "นามสกุล*" [ref=e145]: ระบบ
            - generic [ref=e148]:
              - generic [ref=e149]: "+66"
              - textbox "เบอร์มือถือ*" [ref=e154]: 096abc0708
            - generic [ref=e155]:
              - img "coupon" [ref=e156]
              - generic [ref=e157] [cursor=pointer]: ใช้โค้ดส่วนลด
            - generic [ref=e158]:
              - paragraph [ref=e159]:
                - checkbox [checked] [ref=e160] [cursor=pointer]: 
                - generic [ref=e161]:
                  - text: ฉันยอมรับ
                  - link "นโยบายความเป็นส่วนตัว" [ref=e162] [cursor=pointer]:
                    - /url: https://www.empeo.com/privacy-policy/
                  - text: และ
                  - link "ข้อกำหนดและเงื่อนไขการใช้งาน" [ref=e163] [cursor=pointer]:
                    - /url: https://www.empeo.com/terms-and-conditions/
              - text: 
            - button "ทดลองใช้ฟรี" [ref=e166] [cursor=pointer]
          - generic [ref=e168]:
            - generic [ref=e169]:
              - img "image-step" [ref=e170]
              - generic [ref=e171]: ลงทะเบียนเรียบร้อย ใช้งานได้ทันที
            - generic [ref=e173]:
              - img "image-step" [ref=e174]
              - generic [ref=e175]: พร้อมคู่มือการใช้งาน ระบบแบบครบถ้วน
            - generic [ref=e177]:
              - img "image-step" [ref=e178]
              - generic [ref=e179]: พร้อมดูแลคุณ ผ่าน Live Chat ทุกวันไม่เว้นวันหยุด
      - generic [ref=e181]:
        - generic [ref=e182]:
          - generic [ref=e183]: empeo ระบบ HR ที่บริษัทต่างๆให้ความไว้วางใจ
          - generic [ref=e184]:
            - generic [ref=e185]:
              - img "footer-feature" [ref=e186]
              - generic [ref=e187]: 5,000+
              - generic [ref=e188]: บริษัท
            - generic [ref=e189]:
              - img "footer-feature" [ref=e190]
              - generic [ref=e191]: 45,000+
              - generic [ref=e192]: ผู้ใช้งานต่อวัน
            - generic [ref=e193]:
              - img "footer-feature" [ref=e194]
              - generic [ref=e195]: 30+
              - generic [ref=e196]: ทีมดูแลลูกค้ากว่า 30 คน
        - generic [ref=e199]:
          - list [ref=e200]:
            - listitem [ref=e201] [cursor=pointer]
            - listitem [ref=e202] [cursor=pointer]
            - listitem [ref=e203] [cursor=pointer]
          - img "image-preview" [ref=e207]
    - img "Crisp Chat" [ref=e209] [cursor=pointer]
  - generic [ref=e212]:
    - generic [ref=e213] [cursor=pointer]: 
    - generic [ref=e216]:
      - paragraph [ref=e217]: กรุณาตรวจสอบข้อความ
      - generic [ref=e218]:
        - paragraph [ref=e219]: โปรดกรอกรหัส OTP ที่ถูกส่งไปยัง 096-XXX-0708
        - paragraph [ref=e220]: "ref: 4583"
      - generic [ref=e223]:
        - textbox [active] [ref=e224]
        - textbox [ref=e225]
        - textbox [ref=e226]
        - textbox [ref=e227]
        - textbox [ref=e228]
        - textbox [ref=e229]
      - button "ยืนยัน" [disabled] [ref=e232]
      - generic [ref=e233]: รับ OTP ใหม่อีกครั้งได้ใน 0:19
```

# Test source

```ts
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
> 150 |     await expect(this.page.getByText(UI.otpTitle)).toHaveCount(0);
      |                                                    ^ Error: expect(locator).toHaveCount(expected) failed
  151 |   }
  152 | 
  153 |   /** soft: ถ้าข้อความ error ไม่ตรง selector จะบันทึกเป็น fail แต่เคสยังรันต่อ */
  154 |   async expectErrorShown(): Promise<void> {
  155 |     await expect.soft(this.errors.first()).toBeVisible();
  156 |   }
  157 | }
  158 | 
```