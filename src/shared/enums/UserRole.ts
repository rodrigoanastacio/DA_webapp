export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer'
}

export const UserRoleLabel: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.EDITOR]: 'Editor',
  [UserRole.VIEWER]: 'Visualizador'
}
