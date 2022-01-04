import * as bcrypt from 'bcrypt';

export async function createPasswordHash(password: string): Promise<string> {
  return await bcrypt.hash(password, await bcrypt.genSalt());
}
