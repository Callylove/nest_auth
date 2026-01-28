import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,

  IsEnum,

  IsNotEmpty,
 
  IsOptional,
 
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ROLE_TYPE } from 'src/role/entities/role.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    type: String,
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User mobile with intl code e.g +234....',
    type: String,
    required: true,
  })
  @IsPhoneNumber(undefined, {
    message: 'Invalid phone number',
  })
  mobile_number: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    required: true,
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'User first name',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'User last name',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'User Role',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsEnum(ROLE_TYPE)
  role: ROLE_TYPE;


}
