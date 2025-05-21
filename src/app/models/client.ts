export interface Client {
    _id: string;
    company_name: string;
    name: string;
    email_address: string;
    phone_number: string;
    contact_physical_address: string;
    business_overview: string;
    industry_category: string;
    business_entity: string;
    website: string;
    country: string;
    recruitment_details: {
        vacancy_categories: [];
        vacancy_details: [];
        qualifications: [];
        job_types: [];
        experience: [];
        age_preference: [];
        starting_date: any;
    };
    notes: string;
    created_by: string;
    created_date: {};
}