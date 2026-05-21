import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        role?: string;
    }): Promise<{
        message: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    validate(body: {
        token: string;
    }): Promise<any>;
}
