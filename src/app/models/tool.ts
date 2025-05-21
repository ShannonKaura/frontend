
export interface Tool {
    _id: string;
    tool_name: string;
    original_tool_record: object;
    modified_tool_records: [];
    created_by: string;
    created_date: {};
    delete: object;
}