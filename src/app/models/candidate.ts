
export interface CandidateConfirm {
    confirm_password: string;
}

export interface Experience {
    title: string;
    employment_type: string;
    company: string;
    location: {
        country: string;
        city: string;
    };
    currently_working: any;
    start_date: any;
    end_date: any;
    description: string;
    media: string;
}

export interface Education {
    academic_level: string;
    school: string;
    degree: string;
    field_of_study: string;
    start_date: any;
    end_date: any;
    grade: string;
    activities: string;
    description: string;
    media: string;
}

export interface Skills {
    skill_name: string;
}

export interface Candidate {
    _id: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    headline: string,
    profile_image: string,
    available: boolean,
    job_title: string,
    experience: any,
    tools: [],
    projects: [],
    education: any,
    featured: [],
    date_of_birth: {},
    summary: string,
    skills: any,
    country: string,
    country_code: string,
    city: string,
    industry_category: string,
    email: string,
    phone: string,
    access_level: string,
    password: string,
    account_type: string,
    interview: [],
    original_candidate_record: object,
    modified_candidate_records: [],
    created_by: string,
    created_date: any,
    profile_completion: number,
    audio_id: any,
    documents: any,
    dob: any,
    candidate_type: string,
    technical_skills: [],
    staff: boolean,
    employment_status: string,
    job_role: {
        job_name: any,
        id: any
    },
}

