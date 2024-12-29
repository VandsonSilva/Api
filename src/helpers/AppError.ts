class AppError extends Error {    
    readonly statusCode: number;

    constructor(message: string, statusCode?:number) {
        super(message)        
        this.statusCode = 500;
    }
}

export default AppError;
