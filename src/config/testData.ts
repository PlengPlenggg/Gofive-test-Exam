export const TEST_DATA = {
  phone: process.env.PHONE ?? '0967690708',
  otp: '123456',
  promoValid: 'FREE15DAY',
  promoInvalid: 'INVALID123',
  businessType: 'ค้าปลีก',
  userRange: '1-20',
  firstName: 'ทดสอบ',
  lastName: 'ระบบ',
  companyType: 'บริษัทจดทะเบียนในไทย',
  taxId: process.env.TAX_ID ?? '0845558000034',
};

export const OTP_EXPIRE_WAIT_MS = Number(process.env.OTP_EXPIRE_SECONDS ?? 30) * 1000;

export const COMPLETE_ALL_FLOWS = (process.env.COMPLETE_ALL ?? 'true') === 'true';

export function uniqueEmail(): string {
  return `qa.auto+${Date.now()}@example.com`;
}

export const digitsOnly = (s: string): string => s.replace(/\D/g, '');

export function testEmail(): string {
  return process.env.EMAIL ?? `test123+${Date.now()}@gmail.com`;
}