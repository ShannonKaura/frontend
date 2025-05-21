
export interface Lead {
    _id: string;
    basicDetails: {
        client_name: '',
        phone: '',
        email: '',
        website: ''
    };
    talent: any;
    companyDetails: {
        name_of_business: '',
        contact_person: '',
        business_overview: '',
        hiringNeeds: '',
        seedOrVentureCapitalFunded: '',
        publiclyListedOrPostIPOCompany: '',
        currentEmployees: '',
    };
    qualifications: [];
    years_of_experience: [];
    job_type: [];
    age_preference: [];
    expected_start_date: '';
    notes: '';
    created_date: {};

}