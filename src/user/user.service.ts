import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ROLE_TYPE } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { hashPassword } from 'src/utils/password_harsh';
@Injectable()
export class UserService {

    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
     private readonly  roleService: RoleService,
   
  ) {}
  async create(dto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { email: dto.email },
      relations: {
        role: true,
      
      },
    });

    if (dto.role === ROLE_TYPE.ADMIN)
      throw new BadRequestException('Invalid role');
    const role = await this.roleService.findOneWithType(
      dto.role,
    );

    if (userExists) {
      if (userExists.email) {
        ///User has not verified mail
        userExists.role = role 
        userExists.password = await hashPassword(dto.password.trim());
     
        const saved = await this.userRepository.save(userExists);
        // ///Send OTP to user email
        // await this.sendRegOTP(userExists);

        // delete saved.otp;
        // delete saved.otp_created_at;
        // delete saved.password;
        // delete saved.role;
        return saved;
      }
      throw new BadRequestException('User already exists');
    }
    const user = new User();
    user.role = role;
    user.email = dto.email.trim().toLowerCase();
    user.mobile = dto.mobile_number.trim();

    user.first_name = dto.first_name.trim();
    user.last_name = dto.last_name.trim();

    user.password = await hashPassword(dto.password.trim());

    const saved = await this.userRepository.save(user);

    // ///Create a wallet for user
    // await this.walletService.create(saved);

    // ///Send OTP to user email
    // await this.sendRegOTP(user);

    return saved;
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
