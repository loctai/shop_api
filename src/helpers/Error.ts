export class CustomError extends Error {
    public status: number;
    public name: string;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = 'CustomError';
    }
}
