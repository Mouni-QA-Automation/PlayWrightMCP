import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly telephoneInput: Locator;
    readonly passwordConfirmInput: Locator;
    readonly privacyPolicyCheckbox: Locator;
    readonly submitBtn: Locator;
    readonly msgConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('input[name="firstname"]');
        this.lastNameInput = page.locator('input[name="lastname"]');
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.telephoneInput = page.locator('input[name="telephone"]');
        this.passwordConfirmInput = page.locator('input[name="confirm"]');
        this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
        this.submitBtn = page.locator('input[type="submit"]');
        this.msgConfirmation = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
    }
    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillTelephone(telephone: string) {
        await this.telephoneInput.fill(telephone);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async fillPasswordConfirm(passwordConfirm: string) {
        await this.passwordConfirmInput.fill(passwordConfirm);
    }

    async setPrivacyPolicy() {
        const checked = await this.privacyPolicyCheckbox.isChecked().catch(() => false);
        if (!checked) {
            await this.privacyPolicyCheckbox.check();
        }
    }

    async submit() {
        await this.submitBtn.click();
        if (await this.msgConfirmation.isVisible()) {
            return true;
        }
        return false;
    }

    async fillAllFields(firstName: string, lastName: string, email: string, telephone?: string, password?: string, passwordConfirm?: string) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        if (telephone) await this.fillTelephone(telephone);
        if (password) await this.fillPassword(password);
        if (passwordConfirm) await this.fillPasswordConfirm(passwordConfirm);
        await this.submitBtn.click();
        if (await this.msgConfirmation.isVisible()) {
            return true;
        }
        return false;

    }

}
