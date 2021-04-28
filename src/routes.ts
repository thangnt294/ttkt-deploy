import { Router } from 'express';

import * as MemberController from './controllers/member';
import * as TeamController from './controllers/team';
import * as AuthController from './controllers/auth';
import * as TaskController from './controllers/task';

import RequestMiddleware from './middleware/request-middleware';
import RemoveMemberValidationMiddleware from './middleware/remove-member-validation-middleware';
import AddMemberValidationMiddleware from './middleware/add-member-validation-middleware';
import UpdateMemberRolesValidationMiddleware from './middleware/update-member-roles-validation-middleware';
import UpdateDeleteTeamValidationMiddleware from './middleware/update-delete-team-validation-middleware';
import AuthMiddleware from './middleware/auth-middleware';
import DeleteMemberCheckMiddleware from './middleware/delete-member-check-middleware';

const router = Router();
const authorizeRouter = Router();

router.get('/health/basic', (_, res) => {
  res.json({ result: 'success' });
});

// Auth routes
router.post('/auth/register',
  RequestMiddleware.validateBody({ validation: { body: AuthController.registerSchema } }),
  AuthMiddleware.throwIfEmailExists,
  RequestMiddleware.validateReqBody(AuthController.register));

router.post('/auth/login',
  RequestMiddleware.validateBody({ validation: { body: AuthController.loginSchema } }),
  AuthMiddleware.throwIfMismatchPassword,
  AuthController.login);

authorizeRouter.use(AuthMiddleware.validateToken);

authorizeRouter.put('/auth/change-password',
  RequestMiddleware.validateBody({ validation: { body: AuthController.changePasswordSchema } }),
  AuthMiddleware.throwIfMismatchPassword,
  AuthController.changePassword);

authorizeRouter.get('/auth/getUserInfo', AuthController.getUserInfo);

// Member routes
authorizeRouter.get(
  '/members',
  RequestMiddleware.pagingReqQuery(MemberController.find)
);

authorizeRouter.get('/members/:id', MemberController.findDetail);

authorizeRouter.delete(
  '/members',
  DeleteMemberCheckMiddleware.throwIfInvalidRequest,
  MemberController.deleteAccount
);

authorizeRouter.put(
  '/personal/update',
  RequestMiddleware.validateBody({
    validation: { body: MemberController.createMemberSchema }
  }),
  MemberController.update
);

authorizeRouter.delete(
  '/personal/leaveTeam',
  MemberController.leaveTeam
);

// Team routes
authorizeRouter.post(
  '/teams',
  RequestMiddleware.validateBody({ validation: { body: TeamController.createTeamSchema } }),
  TeamController.create
);

authorizeRouter.get(
  '/teams',
  RequestMiddleware.pagingReqQuery(TeamController.find)
);

authorizeRouter.put(
  '/teams/:id',
  RequestMiddleware.validateBody({
    validation: { body: TeamController.updateTeamSchema }
  }),
  UpdateDeleteTeamValidationMiddleware.throwIfCannotEditTeam,
  TeamController.update
);

authorizeRouter.delete(
  '/teams/:id',
  UpdateDeleteTeamValidationMiddleware.throwIfCannotDeleteTeam,
  TeamController.deleteTeam
);

authorizeRouter.get('/teams/:id', TeamController.findDetail);

authorizeRouter.get(
  '/teams/:id/members',
  RequestMiddleware.pagingReqQuery(TeamController.findMembers)
);

authorizeRouter.put(
  '/teams/:id/add-members',
  RequestMiddleware.validateBody({ validation: { body: TeamController.addMembersSchema } }),
  AddMemberValidationMiddleware.throwIfInvalidRequest,
  TeamController.addMembers
);

authorizeRouter.put(
  '/teams/:id/remove-members',
  RequestMiddleware.validateBody({ validation: { body: TeamController.removeMembersSchema } }),
  RemoveMemberValidationMiddleware.throwIfInvalidRequest,
  TeamController.removeMembers
);

authorizeRouter.put(
  '/teams/:id/update-members',
  RequestMiddleware.validateBody({ validation: { body: TeamController.updateMemberRoleSchema } }),
  UpdateMemberRolesValidationMiddleware.throwIfInvalidRequest,
  TeamController.updateMemberRole
);

// Task routes
authorizeRouter.get(
  '/tasks-mine',
  TaskController.findMyTasks
);

authorizeRouter.get(
  '/tasks-team',
  TaskController.findTeamTasks
);

authorizeRouter.post(
  '/tasks',
  RequestMiddleware.validateBody({ validation: { body: TaskController.createTaskSchema } }),
  TaskController.create
);

authorizeRouter.put(
  '/tasks/:id',
  RequestMiddleware.validateBody({ validation: { body: TaskController.updateTaskSchema } }),
  TaskController.update
);

authorizeRouter.delete(
  '/tasks/:id',
  TaskController.deleteTask
);

router.use(authorizeRouter);

export default router;
