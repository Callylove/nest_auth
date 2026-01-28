import {  InternalServerErrorException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { generateOtp } from './generate_random_code';
dotenv.config();

export async function hashPassword(password: string) {
  try {
    const n = generateOtp({
      length: 15,
      upper_case: true,
      lower_case: true,
      random_num: true,
    });

    const s = await bcrypt.genSalt(parseInt(process.env.SALT ?? '10'));

    // const h = await bcrypt.hash(n, s);
    const result = await bcrypt.hash(password.trim(), s);

    return result;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new InternalServerErrorException(error.message);
  }
}
