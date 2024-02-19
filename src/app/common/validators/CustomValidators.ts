import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidator {
    static canNotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).includes(" ")) {
            return { canNotContainSpace: true }
        }
        return null;
    }

    static isUsernameExist(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // call the BE and check if control.value  exists in db
                if (control.value === 'admin') {
                    resolve({ isUsernameExist: true });
                }
                else {
                    resolve(null);
                }
            }, 2000);
        })
    }

}