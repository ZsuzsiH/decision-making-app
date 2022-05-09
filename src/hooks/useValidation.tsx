export default function useValidation() {

    function validateName(name: string): string|undefined {
        if (name.trim() === "") return 'Name is required';
        if (name.length > 20) return 'Name is too long';
        if (/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\-\s]*$/.test(name)) return;

        return 'Invalid name';
    }

    function validateNumber(number: number): string|undefined {
        if (/^(?![0.]+$)\d+(\.\d{1,2})?$/.test(number.toString())) return;
        if (isNaN(number)) return 'Not a number';

        return 'Invalid number';
    }

    return {
        validateName,
        validateNumber
    }
}