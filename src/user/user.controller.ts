import { Controller, Get, Put, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../entities/user.entity';
import { User } from '../auth/user.decorator';
import { UserService } from './user.service';
import { UpdateUserDTO } from 'src/models/user.model';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard())
    findCurrentUser(@User() { username }: UserEntity) {
        return this.userService.findByUsername(username)
    }

    @Put()
    @UseGuards(AuthGuard())
    update(@User() { username }: UserEntity, @Body(new ValidationPipe({transform: true, whitelist: true})) data: UpdateUserDTO) {
        return this.userService.updateByUsername(username, data)
    }
}
