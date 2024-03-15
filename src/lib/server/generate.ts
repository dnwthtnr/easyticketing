
export function generateResponse(
    success: boolean, 
    message?: string | null, 
    error?: string | null, 
    data?: Object | null
    ){
    
    var response_dict = {
        "success": success,
        "message": message,
        "error": error,
        "data": data
    }
    
    return response_dict;
}
