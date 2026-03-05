import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body(ValidationPipe) body: LoginDto) {
        return this.authService.login(body.email, body.password);
    }

    @Post('register')
    async register(@Body(ValidationPipe) body: RegisterDto) {
        return this.authService.register(body);
    }
}
