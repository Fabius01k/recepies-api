import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {UpdateUserDto} from "../dto/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { id } });

        if (!existingUser) {
            throw new NotFoundException('Пользователь не найден');
        }

        const updatedUser = { ...existingUser, ...updateUserDto };

        return await this.userRepository.save(updatedUser);
    }
}