import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {}

    async findByUsername(username: string): Promise<UserEntity> {
        const user = await this.userRepo.findOne({where: {username}})
        if(!user)
            throw new NotFoundException(`There is no user with the username: ${username}`)
        return user
    }

    async updateByUsername(username: string, data: UpdateUserDTO) {
        await this.userRepo.update({username}, data)
        return await this.findByUsername(username)
    }
}
