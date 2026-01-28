import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, ROLE_TYPE } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    this.seedRoles();
  }
  async seedRoles() {
    try {
      const existingRoles = await this.roleRepository.find();
      const existingTypes = existingRoles.map((r) => r.name);

      const allRoleTypes = Object.values(ROLE_TYPE);

      // Find which roles are missing
      const rolesToSeed = allRoleTypes.filter(
        (name) => !existingTypes.includes(name),
      );

      if (rolesToSeed.length > 0) {
        const newRoles = rolesToSeed.map((name) => {
          const role = new Role();
          role.name = name as ROLE_TYPE;
          return role;
        });

        await this.roleRepository.save(newRoles);
        console.log(`✅ Seeded roles: ${rolesToSeed.join(', ')}`);
      } else {
        console.log('✅ All roles already exist.');
      }
    } catch (e) {
      console.log('SEED ROLES ERROR:::', e);
    }
  }

  async findOneWithType(name: ROLE_TYPE) {
    const role = await this.roleRepository.findOne({
      where: {
        name,
      },
    });
    if (!role) throw new BadRequestException('Role not found');
    return role;
  }


}
