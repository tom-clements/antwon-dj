export interface ApiCallError {
    status: number;
    data: {
        Code: string;
        Message: string;
    };
}
