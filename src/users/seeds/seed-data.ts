import { UserRole } from '../entities/role.entity'
import { User, UserStatus } from '../entities/user.entity';

export const RolesData = [
  { role: UserRole.SUPER_ADMIN },
  { role: UserRole.ADMIN },
  { role: UserRole.USER },
];

export const UsersData = [
  { name: 'Super Admin', email: 'super@kwanso.com', password: 'admin@123', status: UserStatus.ACTIVE, roleId: '27fbae65-28a1-480c-8d5f-3dd092cbf12f' },
  { name: 'Admin', email: 'admin@kwanso.com', password: 'admin@123', status: UserStatus.ACTIVE, roleId: '8c7b51c2-2d83-4899-85ec-12a97226a0d9' },
  { name: 'User', email: 'user@kwanso.com', password: 'admin@123', status: UserStatus.ACTIVE, roleId: '727542c7-8020-4051-9558-6110f3609fe7' },
]
