import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/user.service';
import { RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(email: string, pass: string) {
        const user = await this.usersService.findOneByEmail(email);

        if (user && await bcrypt.compare(pass, user.password_hash)) {
            const payload = { email: user.email, sub: user.id };
            return {
                access_token: this.jwtService.sign(payload),
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email
                }
            };
        }
        throw new UnauthorizedException('Credenciales inválidas');
    }
    async register(userData: RegisterDto) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = await this.usersService.create({
            ...userData,
            password_hash: hashedPassword,
        });

        // 4. Retornar el token de acceso 
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, full_name: user.full_name, email: user.email }
        };
    }
}