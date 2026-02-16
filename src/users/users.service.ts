import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(dto: CreateUserDto) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(dto.password, saltRounds);
        const user = this.usersRepository.create({
            ...dto,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }

    async findAll() {
        return this.usersRepository.find();
    }

    async findOne(id: string) {
        return this.usersRepository.findOneBy({ id });
    }
}
