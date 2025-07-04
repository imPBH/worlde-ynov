import { knownPasswords } from "../utils";

 export function validatePassword(password: string, username: string) {
    const checks = [
        verifyPasswordMinimalLength,
        verifyPasswordMaximalLength,
        verifyPasswordHasNoSpaces,
        verifyPasswordHasNoCharacterConsecutiveRepetition,
        verifyPasswordHasAtLeast3Of4CharacterTypes,
        verifyPasswordDoesntContainKnownPasswords
    ];

    return checks.every(check => check(password)) && verifyPasswordDoesntContainUsername(password, username);
}

 function verifyPasswordMinimalLength(password: string) {
    return password.length >= 6
}

 function verifyPasswordMaximalLength(password: string) {
    return password.length <= 20
}

 function verifyPasswordHasAtLeastOneUppercase(password: string) {
    const regex = /[A-Z]/;
    return regex.test(password)
}

 function verifyPasswordHasAtLeastOneLowercase(password: string) {
    const regex = /[a-z]/;
    return regex.test(password)
}

 function verifyPasswordHasAtLeastOneNumber(password: string) {
    const regex = /[0-9]/;
    return regex.test(password)
}

 function verifyPasswordHasAtLeastOneSpecialCharacter(password: string) {
    const regex = /[(@#$%^&+=)]/;
    return regex.test(password)
}

 function verifyPasswordHasNoSpaces(password: string) {
    const regex = /^\S*$/;
    return regex.test(password)
}

 function verifyPasswordHasNoCharacterConsecutiveRepetition(password: string) {
    const regex = /(.)\1\1\1/;
    return !regex.test(password)
}

function verifyPasswordDoesntContainUsername(password: string, username: string) {
    return !password.includes(username)
}

function verifyPasswordHasAtLeast3Of4CharacterTypes(password: string): boolean {
    const checks = [
        verifyPasswordHasAtLeastOneUppercase(password),
        verifyPasswordHasAtLeastOneLowercase(password),
        verifyPasswordHasAtLeastOneNumber(password),
        verifyPasswordHasAtLeastOneSpecialCharacter(password)
    ];

    const passed = checks.filter(Boolean).length;
    return passed >= 3;
}

function verifyPasswordDoesntContainKnownPasswords(password: string) {
    return knownPasswords.every(knownPassword => !password.includes(knownPassword))
}