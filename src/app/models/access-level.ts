
export interface AccessLevel {
    _id: string;
    role_name: string;
    original_access_level_record: object;
    modified_access_level_records: [];
    created_by: string;
    created_date: {};
    delete: object;
}