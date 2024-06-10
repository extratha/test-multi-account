import { getFormatCurrency } from "@/utils/format";

describe("getFormatCurrency", () => {
  it("formats numbers correctly without specified digits", () => {
    // Test cases for numbers without specified digits
    expect(getFormatCurrency(123)).toBe("123");
    expect(getFormatCurrency(-456, 2)).toBe("-456.00");
    expect(getFormatCurrency(789.12345)).toBe("789.12");
    expect(getFormatCurrency(-101.5678, 3)).toBe("-101.568");
    expect(getFormatCurrency(0)).toBe("0");
  });

  it("formats numbers correctly with specified digits", () => {
    // Test cases for numbers with specified digits
    expect(getFormatCurrency(123.456, 1)).toBe("123.5");
    expect(getFormatCurrency(-789.123, 3)).toBe("-789.123");
  });

  it("handles string inputs correctly", () => {
    // Test cases for string inputs
    expect(getFormatCurrency("123")).toBe("123");
    expect(getFormatCurrency("-456.789")).toBe("-456.79");
    expect(getFormatCurrency("invalid")).toBe("invalid");
    expect(getFormatCurrency("")).toBe("0");
    expect(getFormatCurrency("true")).toBe("true");
  });

  it("handles boolean inputs correctly", () => {
    // Test cases for boolean inputs
    expect(getFormatCurrency(true)).toBe("0");
    expect(getFormatCurrency(false)).toBe("0");
  });

  it("handles other cases correctly", () => {
    // Test cases for null, undefined, and other cases
    expect(getFormatCurrency(null)).toBe("0");
    expect(getFormatCurrency(undefined)).toBe("0");
  });
});
