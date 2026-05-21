import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    register(email: string, password: string, role?: string): Promise<{
        message: string;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    validateToken(token: string): Promise<any>;
}
