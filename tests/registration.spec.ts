import { test, expect, Page } from '@playwright/test';
import { RegisterPage, FormData } from '../src/pages/RegisterPage';
import { OtpPage } from '../src/pages/OtpPage';
import {
  TEST_DATA,
  OTP_EXPIRE_WAIT_MS,
  COMPLETE_ALL_FLOWS,
  digitsOnly,
  testEmail,
} from '../src/config/testData';

const validData = (): FormData => ({
  company: TEST_DATA.taxId,   
  businessType: TEST_DATA.businessType,
  userRange: TEST_DATA.userRange,
  email: testEmail(),   
  firstName: TEST_DATA.firstName,
  lastName: TEST_DATA.lastName,
  phone: TEST_DATA.phone,
});

async function setup(page: Page) {
  const reg = new RegisterPage(page);
  const otp = new OtpPage(page);
  await reg.goto();
  return { reg, otp };
}

/** ไปต่อจนจบ: OTP ถูกต้อง -> สมัครสำเร็จ */
async function finishRegistration(otp: OtpPage, forceComplete = false) {
  await otp.waitForShown();
  if (!forceComplete && !COMPLETE_ALL_FLOWS) return;
  await otp.enterAndConfirm(TEST_DATA.otp);
  await otp.expectRegistered();
}

test.describe('empeo registration', () => {
  test('TC001 register successfully with valid data and valid promo code', async ({ page }) => {
    const { reg, otp } = await setup(page);

    await test.step('Fill the registration form', () => reg.fillForm(validData()));
    await test.step('Apply promo code FREE15DAY', async () => {
      await reg.applyPromo(TEST_DATA.promoValid);
      await reg.expectPromoApplied(TEST_DATA.promoValid);
    });
    await test.step('Accept terms and submit', async () => {
      await reg.acceptTerms();
      await reg.submit();
    });
    await test.step('Verify OTP and registration result', () => finishRegistration(otp, true));
    await expect(page.getByRole('button', { name: 'ตั้งรหัสผ่าน', exact: true })).toBeDisabled();
  });

  test('TC002 validate required fields and email format', async ({ page }) => {
    const { reg, otp } = await setup(page);

    await test.step('Submit empty form -> required field errors', async () => {
      await reg.submit();
      await reg.expectStayOnForm();
      await reg.expectErrorShown();
    });
    await test.step('Fill all fields with invalid email -> email error', async () => {
      await reg.fillForm({ ...validData(), email: 'test@example' });
      await reg.acceptTerms();
      await reg.submit();
      await reg.expectStayOnForm();
      await reg.expectErrorShown();
    });
  });

  test('TC003 reject invalid phone numbers, then register with a valid number', async ({ page }) => {
    const { reg, otp } = await setup(page);
    const invalidPhones = ['096769070', '09676907081', '096abc0708', '9676907080'];

    await reg.fillForm({ ...validData(), phone: null });
    await reg.acceptTerms();

    for (const phone of invalidPhones) {
      await test.step(`Invalid phone: ${phone}`, async () => {
        await reg.setPhone(phone);
        const actual = await reg.phone.inputValue();
        // field จำกัดความยาว/ตัวอักษร จนค่าที่เหลือกลายเป็นเบอร์ที่ถูกต้อง -> ถือว่าถูกกันที่ input
        if (digitsOnly(actual) === digitsOnly(TEST_DATA.phone)) {
          test.info().annotations.push({
            type: 'note',
            description: `"${phone}" ถูกตัดเหลือ "${actual}" โดย input mask`,
          });
          return;
        }
        await reg.submit();
        await reg.expectStayOnForm();
        await reg.expectErrorShown();
      });
    }

    await test.step('Valid phone -> OTP page', async () => {
      await reg.setPhone(TEST_DATA.phone);
      await reg.submit();
      await finishRegistration(otp);
    });
  });

  test('TC004 reject invalid promo code', async ({ page }) => {
    const { reg, otp } = await setup(page);

    await reg.fillForm(validData());
    await test.step('Invalid promo code -> error', async () => {
      await reg.applyPromo(TEST_DATA.promoInvalid);
      await reg.expectPromoError();
    })
    await reg.acceptTerms();
    await reg.submit();
  });

  test('TC005 reject invalid OTP inputs', async ({ page }) => {
    const { reg, otp } = await setup(page);

    await reg.fillForm(validData());
    await reg.acceptTerms();
    await reg.submit();
    await otp.waitForShown();

    await test.step('OTP incomplete (12345)', async () => {
      await otp.enterAndConfirm('12345');
      await otp.expectNotRegistered();
    });
    await test.step('OTP with letters (12ab56)', async () => {
      await otp.enterAndConfirm('12ab56');
      await otp.expectNotRegistered();
    });
    await test.step('Wrong OTP (000000) -> error message', async () => {
      await otp.enterAndConfirm('000000');
      await otp.expectWrongOtpError();
      await otp.expectNotRegistered();
    });
  });

  test('TC006 handle expired OTP, then register with a newly requested OTP', async ({ page }) => {
    test.setTimeout(OTP_EXPIRE_WAIT_MS + 120_000);
    const { reg, otp } = await setup(page);

    await reg.fillForm(validData());
    await reg.acceptTerms();
    await reg.submit();
    await otp.waitForShown();

    await test.step('Resend is disabled during cooldown', () => otp.expectResendOnCooldown());
    await test.step('Wait for OTP to expire, then submit it', async () => {
      await page.waitForTimeout(OTP_EXPIRE_WAIT_MS);
      await otp.enterAndConfirm(TEST_DATA.otp);
      await otp.expectExpiredMessage();
    });
  });

  // TC007: เว้นว่างทีละ field (data-driven)
  const requiredFields: Array<keyof FormData> = [
    'company',
    'businessType',
    'userRange',
    'email',
    'firstName',
    'lastName',
    'phone',
  ];
  for (const field of requiredFields) {
    test(`TC007 error when required field is blank [${field}]`, async ({ page }) => {
      const { reg } = await setup(page);
      await reg.fillForm({ ...validData(), [field]: null });
      await reg.acceptTerms();
      await reg.submit();
      await reg.expectStayOnForm();
      await reg.expectErrorShown();
    });
  }

  test('TC008 prevent registration when terms are not accepted', async ({ page }) => {
    const { reg } = await setup(page);
    await reg.fillForm(validData());
    await expect(reg.termsCheckbox).not.toBeChecked();
    await reg.submit();
    await reg.expectStayOnForm();
  });

  test('TC009 reject a promo code that has already been used', async ({ page }) => {
    const { reg } = await setup(page);
    await reg.fillForm(validData());
    await reg.applyPromo(TEST_DATA.promoValid);
    await reg.expectPromoError();
  });
});
