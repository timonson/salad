const digits = "0123456789";

export function isDigit(c: string): c is string {
  return digits.includes(c);
}

const lowercaseEnglishLetters = "abcdefghijklmnopqrstuvwxyz";

export function isLowercaseEnglishLetter(c: string): c is string {
  return lowercaseEnglishLetters.includes(c);
}

const uppercaseEnglishLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function isUppercaseEnglishLetter(c: string): c is string {
  return uppercaseEnglishLetters.includes(c);
}
