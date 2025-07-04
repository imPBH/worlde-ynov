import { validatePassword } from "../src/passwordValidator";
import { knownPasswords } from "../utils";

describe('PasswordValidator', () => {
    const username = "TitouanDu12"

    it('should reject passwords shorter than 6 characters', () => {
        const password = 'short'

        const result: boolean = validatePassword(password, username);
        
        expect(result).toBe(false);
    });

    it('should reject passwords longer than 20 characters', () => {
        const password = 'thispasswordiswaytoolong'

        const result: boolean = validatePassword(password, username);

        expect(result).toBe(false);
    });

    it('should reject passwords with spaces', () => {
        const password = ' There 1s spaces@ '

        const result: boolean = validatePassword(password, username);

        expect(result).toBe(false);
    });

    it('should reject passwords with more than 3 consecutive identical characters', () => {
        const password = 'Noooot0kaaaay@'

        const result: boolean = validatePassword(password, username);

        expect(result).toBe(false);
    });

    it('should reject passwords containing the username', () => {
        const password = `Mdp@2${username}`

        const result: boolean = validatePassword(password, username);

        expect(result).toBe(false);
    });

    it('should reject passwords with less than 3 characters rules (1 lowercase, 1 uppercase, 1 number, 1 special char)', () => {
        const password = '@notgood'

        const result: boolean = validatePassword(password, username);

        expect(result).toBe(false);
    });

    it('should reject passwords containing known passwords', () => {
        const knownPassword = knownPasswords[0]
        const password = `Th1sC0nt@ins${knownPassword}`

        const result: boolean = validatePassword(password, username);

        expect(result).toBe(false);
    });

    it('should accept password with all these rules', () => {
        const password = 'Th1sSh0uldB3G00d@'

        const result: boolean = validatePassword(password, username);

        expect(result).toBe(true);
    });
});
