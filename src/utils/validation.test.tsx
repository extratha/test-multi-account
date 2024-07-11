import { validateEmail, validatePassword } from "@/utils/validation";

describe("validateEmail", () => {
  it('returns "validation.require" if value is empty', () => {
    expect(validateEmail("")).toBe("Common.validation.require");
  });

  it('returns "validation.invalidEmail" if value is not a valid email', () => {
    expect(validateEmail("test@example")).toBe("Common.validation.invalidEmail");
    expect(validateEmail("test@example.")).toBe("Common.validation.invalidEmail");
    expect(validateEmail("testexample.com")).toBe("Common.validation.invalidEmail");
  });

  it("returns null if value is a valid email", () => {
    expect(validateEmail("test@example.com")).toBeNull();
    expect(validateEmail("user123@test.co.uk")).toBeNull();
  });
});

describe("validatePassword", () => {
  it('returns "validation.require" if value is empty', () => {
    expect(validatePassword("")).toBe("Common.validation.require");
  });

  it('returns "validation.invalidPassword" if value length is less than 8', () => {
    expect(validatePassword("123")).toBe("Common.validation.invalidPassword");
    expect(validatePassword("abcd")).toBe("Common.validation.invalidPassword");
    expect(validatePassword("pass123")).toBe("Common.validation.invalidPassword");
  });

  it("returns null if value length is 8 or more", () => {
    expect(validatePassword("password")).toBeNull();
    expect(validatePassword("pass1234")).toBeNull();
    expect(validatePassword("veryStrongPassword123")).toBeNull();
  });
});
