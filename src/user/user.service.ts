import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {}

    async findByUsername(username: string): Promise<UserEntity> {
        return await this.userRepo.findOne({where: {username}})
    }

    async updateByUsername(username: string, data: UpdateUserDTO) {
        await this.userRepo.update({username}, data)
        return await this.findByUsername(username)
    }
}
