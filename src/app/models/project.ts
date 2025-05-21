export interface Project {
    _id: string;
    client_info: any;
    project_name: string;
    industry: string;
    interested_candidates: any;
    candidates_on_project: any;
    description: string;
    requirements: string;
    documents: any;
    expected_duration: any;
    start_date: any;
    end_date: any;
    project_link: string;
    technologies_used: any;
    status: string;
    original_project_record: object;
    modified_project_records: [];
    created_by: string;
    created_date: any;
    delete: object;
}