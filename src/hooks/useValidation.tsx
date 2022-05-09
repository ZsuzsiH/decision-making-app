export default function useValidation() {

    function validateName(name: string): string|undefined {
        if (name.trim() === "") return 'Name is required';
        if (/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\-\s]*$/.test(name)) return;

        return 'Invalid name';
    }

    function validateNumber(number: number): string|undefined {
        if (/^[1-9.]+$/.test(number.toString())) return;
        if (isNaN(number)) return 'Not a number';

        return 'Invalid number';
    }

    return {
        validateName,
        validateNumber
    }
}