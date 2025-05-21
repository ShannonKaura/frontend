
export interface Vacancy {
    _id: string;
    name: string;
    category: string;
    created_by: string;
    created_date: any;
    modified_date: any;
    expiry_date: any;
    salary_range: { from: any, to: any };
    summary: string;
    responsibilities: string;
    skills: string;
    qualifications: string;
    vacancy_type: string;
    city: string;
    country: string;
    apply_process: string;
    interested_candidates: [];
    intraining_candidates: [];
    shortlisted_candidates: [];
    rejected_candidates: [];
    under_review_candidates: [];
    accepted_candidates_after_interview: [];
    rejected_candidates_after_interview: [];
    under_review_candidates_after_interview: [];
}