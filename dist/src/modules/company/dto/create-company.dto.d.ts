export declare class CreateCompanyDto {
    name: string;
    email: string;
    phoneNumber: string;
    description: string;
    address: string;
    logoId: string;
}
export declare class CreateCompanyInvitation {
    email: string;
}
export declare class AcceptCompanyInvitationDto {
    token: string;
}
