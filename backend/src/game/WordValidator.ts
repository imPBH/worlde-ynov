export class WordValidator {
  static validate(word: string): boolean {
    return /^[a-zA-Z]{5}$/.test(word);
  }
}
