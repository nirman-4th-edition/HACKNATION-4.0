export default interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    error: string | null;
    message: string | null;   
}

export const response: ApiResponse<any> = {
    success: false,
    data: null,
    error: null,
    message: null
}