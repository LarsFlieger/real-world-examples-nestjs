import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('profiles')
export class ProfileController {
    constructor(private readonly userService: UserService) {}

    @Get('/:username')
    findProfile(@Param('username') username: string) {
        return this.userService.findByUsername(username)
    }
}
