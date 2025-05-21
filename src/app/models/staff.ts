export interface Staff {
    _id: string;
    personal_details: {
        staff_name: string,
        gender: string,
        national_identity_number: string,
        passport_number: string,
        date_of_birth: Date | null,
        email: string,
        phone: string,
        audio_id: string,
        documents: [],
    };
    job_details: {
        job_title: string,
        department: string,
        industry_category: string,
        start_date: Date,
        end_date: Date,
        employement_status: string
    };

    next_of_kin_details: {
        next_of_kin_name: string,
        next_of_kin_phone_number: string,
        next_of_kin_relationship: string,
    };

    address_details: {
        country: string,
        country_code: string,
        city: string,
        home_address: string,

    };

    education_details: {
        qualification: string;
        school: string;
    }

    created_by: string;
    created_date: Date;
}