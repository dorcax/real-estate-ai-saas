export declare class CreateAuthDto {
    fullName: string;
    password: string;
    email: string;
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    email: string;
    code: string;
    password: string;
}
export declare class ResendOtpDto {
    email: string;
}
