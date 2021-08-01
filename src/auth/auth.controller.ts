import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post()
    register(@Body(ValidationPipe) credentials: RegisterDTO) {
        return this.authService.register(credentials)
    }

    @Post('/login')
    login(@Body(ValidationPipe) credentials: LoginDTO) {
        return this.authService.login(credentials)
    }
}
