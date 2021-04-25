export enum ReturnMessage {
  PASSWORD_MISMATCH = 'Incorrect email or password',
  UNAUTHORIZED = 'Unauthorized',
  EMAIL_EXISTS = 'There is already an account associated with this email.',
  DELETED_ACCOUNT = 'This account has been deleted.',
  CANNOT_DELETE_OWNER = 'This account cannot be deleted because they are still the owner of a team.',
  CANNOT_ADD_OWNER = 'You cannot add owner to a team',
  CANNOT_CHANGE_ROLE_OWNER = 'You cannot change role of owner',
  CANNOT_MAKE_ANOTHER_MEMBER_OWNER = 'You do not have permission to make another member owner',
  NO_PERMISSION = 'You do not have permission to perform this action.',
  CANNOT_REMOVE_OWNER = 'You cannot remove the owner of this team.',
  CANNOT_DELETE_TEAM = 'You do not have permission to delete this team. Only the owner of this team can delete it.'
}
