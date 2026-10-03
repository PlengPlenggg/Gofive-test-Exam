/**
 */
export const UI = {
  // ---------- หน้าฟอร์ม [OK] ----------
  formHeading: 'ทดลองใช้งาน empeo ฟรี!',
  companyTypeThai: 'บริษัทจดทะเบียนในไทย',
  businessTypeField: 'ประเภทธุรกิจ*',
  userRangeField: 'ผู้ใช้งาน*',
  emailField: 'อีเมล*',
  firstNameField: 'ชื่อ*',
  lastNameField: 'นามสกุล*',
  phoneField: 'เบอร์มือถือ*',
  promoToggle: 'ใช้โค้ดส่วนลด',
  promoInput: 'รหัสส่วนลด',
  promoApply: 'ใช้โค้ด',
  submitButton: 'ทดลองใช้ฟรี',

  // ---------- หน้า OTP (modal) ----------
  otpTitle: /กรุณาตรวจสอบข้อความ|โปรดกรอกรหัส OTP/,
  otpInput: 'input[maxlength="1"]',
  otpConfirmButton: /^ยืนยัน$/,
  // ตัวนับเวลา "รับ OTP ใหม่อีกครั้ง
  countdown: /ได้ใน\s*\d{1,2}:\d{2}/,
  // ลิงก์ขอ OTP ใหม่ 
  resend: /ส่งใหม่อีกครั้ง|รับ OTP ใหม่(?!อีกครั้งได้ใน)|ส่ง OTP ใหม่|resend/i,

  // ---------- Toast / error ----------
  toast: '[role="alert"], [class*="toast" i], [class*="snack" i], [class*="notification" i]',
  errorSelector:
    '.error, .error-message, .invalid-feedback, .text-danger, mat-error, .p-error, [class*="error"], [class*="invalid"], [role="alert"], [class*="toast" i]',
  // ข้อความ 
  errorText: /กรุณา(กรอก|เลือก|ระบุ)|โดเมนนี้มีบัญชีใช้งานแล้ว|ไม่ถูกต้อง/,
  promoError: /ไม่ถูกต้อง|ไม่พบ|หมดอายุ|ถูกใช้|ใช้งานไม่ได้|invalid/i,
  otpWrong: /โปรดตรวจสอบอีกครั้ง|OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง|ผิด|invalid|incorrect/i,
  otpExpired: /หมดอายุ|expired/i,
  createPasswordTitle: 'กรุณาตั้งรหัสผ่าน',
  createPasswordUrl: /\/Register\/empeo\/create-password\?token=/,

  // ---------- ช่องค้นหาบริษัท (ใช้เมื่อกำหนด TAX_ID) ----------
  companySearch: 'กรอกเลขประจำตัวผู้เสียภาษี หรือ ชื่อบริษัท',
  companyResult:
    '[role="option"], [role="listbox"] li, [class*="autocomplete" i] li, [class*="search-result" i] > *, [class*="suggest" i] li',
};
