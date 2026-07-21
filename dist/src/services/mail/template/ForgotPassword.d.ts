interface ForgotPasswordEmailProps {
    name: string;
    code: string;
    expiresAt: number;
    year: number;
}
export declare const ForgotPasswordEmail: ({ name, code, expiresAt, year, }: ForgotPasswordEmailProps) => any;
export {};
