
export interface UserConfirm {
    confirm_password: string;
}

export interface MainUserInfo {
    first_name: string;
    middle_name: string;
    last_name: string;
}

export interface ContactInfo {
    email_address: string;
}

export interface User {
    _id: string;
    main_user_info: MainUserInfo;
    contact_info: ContactInfo;
    access_level: any;
    password: string;
    email: string;
    status: string;
    created_by: string;
    created_date: {};
    delete: object;
}