// API Constants
export const MAP_API_URL                    = process.env.REACT_APP_MAP_API_URL;

// Routes
export const TRACK_SHIPMENT_URL             = '/track-shipment';
export const VESSEL_SCHEDULE_URL            = '/vessel-schedule';
export const VESSEL_SCHEDULE_BASE_URL       = '/vessel-schedule/results';
export const VESSEL_SCHEDULE_RESULTS_URL    = `${VESSEL_SCHEDULE_BASE_URL}/:type/:origin/:destination/:dates`;
export const ACTIVE_SHIPMENTS_URL           = '/active-shipments';
export const ACTIVE_SHIPMENT_DETAILS_URL    = '/active-shipments/:shipmentId';
export const ISSUES_URL                     = '/active-shipments/:shipmentId/issues';
export const ISSUE_DETAILS_URL              = '/active-shipments/:shipmentId/issues/:issueId';
export const DOCUMENTS_URL                  = '/active-shipments/:shipmentId/documents';
export const FTA_URL                        = '/active-shipments/:shipmentId/fta';
export const SHIPMENT_INFO_URL              = '/active-shipments/:shipmentId/shipment-info';
export const SHIPMENT_LOG_URL               = '/active-shipments/:shipmentId/shipment-log';
export const ARCHIVE_URL                    = '/archive';
export const ARCHIVE_DETAILS_URL            = '/archive/:shipmentId';
export const BOOKING_REQUEST_URL            = '/booking-request';
export const ALL_ISSUES_URL                 = '/all-issues';
export const ALL_TEAMS_URL                  = '/teams';
export const TASKS_URL                      = '/tasks';
export const ADD_NEW_REQUEST_URL            = '/booking-request/add-new-request';
export const VIEW_DOCUMENTS_URL             = '/view-documents';
export const EDIT_REQUEST_URL               = '/booking-request/:brId';
export const SHIPMENT_DETAILS               = '/shipping-details';
export const SHIPMENT_DETAILS_TEMPLATE      = '/shipping-details/:type';
export const NOT_FOUND_URL                  = '/not-found';

export const PERSONAL_SETTINGS_URL         = '/personal-settings';

export const ORGANIZATIONS_URL              = '/organizations';
export const ORGANIZATIONS_LIST_URL         = '/organizations/list';
export const ORGANIZATIONS_DETAILS_URL      = '/organizations/list/:orgId';
export const ORGANIZATIONS_INFO_URL         = '/organizations/info/:orgId';
export const TEAMS_URL                      = '/teams';
export const TEAM_DETAILS_URL               = '/teams/:teamId';
export const TEMPLATES_URL                  = '/organizations/templates';
export const TEMPLATE_DETAILS_URL           = '/organizations/templates/:templateId';
export const OTHER_TEMPLATES_URL            = '/organizations/other-templates';
export const OTHER_TEMPLATE_DETAILS_URL     = '/organizations/other-templates/:templateId';

export const AUTHENTICATION_URL             = '/authentication';
export const LOGIN_URL                      = '/authentication/login';
export const SIGNUP_URL                     = '/authentication/signup';
export const CHANGE_PASSWORD_URL            = '/authentication/change-password';
export const FORGET_PASSWORD_URL            = '/authentication/forget-password';
export const RESET_PASSWORD_URL             = '/authentication/reset-password';
export const NOTIFICATION_URL               = '/authentication/notification';

// API Endpoints
const API_BASE_URL                          = `/api`;

export const ORGANIZATIONS                  = `${API_BASE_URL}/organizations`;
export const GET_ORGANIZATION               = `${API_BASE_URL}/organizations/:orgId`;
export const JOIN_ORGANIZATION              = `${API_BASE_URL}/organizations/:orgId/join`;
export const JOIN_REQUEST_ORGANIZATION      = `${API_BASE_URL}/organizations/:orgId/join-requests/:memberId`;

export const TEAMS                          = `${API_BASE_URL}/teams`;
export const GET_ORG_TEAMS                  = `${API_BASE_URL}/organizations/:orgId/teams`;
export const GET_TEAM                       = `${API_BASE_URL}/teams/:teamId`;
export const ADD_MEMBERS                    = `${API_BASE_URL}/teams/:teamId/add-members`;
export const REMOVE_MEMBERS                 = `${API_BASE_URL}/teams/:teamId/remove-members`;
export const UPDATE_MEMBERS                 = `${API_BASE_URL}/teams/:teamId/update-members`;

export const TASKS                          = `${API_BASE_URL}/tasks`;
export const TASK_DETAILS                   = `${API_BASE_URL}/tasks/:taskId`;

export const GET_TEAM_MEMBERS               = `${API_BASE_URL}/teams/:teamId/members`;
export const GET_ORG_MEMBERS                = `${API_BASE_URL}/organizations/:orgId/members`;
export const GET_MEMBER                     = `${API_BASE_URL}/members/:memberId`;
export const MEMBERS                        = `${API_BASE_URL}/members`;
export const DELETE_ME                      = `${API_BASE_URL}/members/delete-me`;

export const GET_LOCODE                     = `${API_BASE_URL}/locode`;
export const GET_VESSEL_SCHEDULE            = `${API_BASE_URL}/vessel-schedule`;

const AUTH                                  = `${API_BASE_URL}/auth`;
export const AUTH_LOGIN                     = `${AUTH}/login`;
export const AUTH_REGISTER                  = `${AUTH}/register`;
export const AUTH_CHANGE_PASSWORD           = `${AUTH}/changepassword`;
export const AUTH_GET_USER_INFO             = `${AUTH}/getuserinfo`;
export const AUTH_GENERATE_TOKEN            = `${AUTH}/generateToken`;
export const AUTH_FORGOT_PASSWORD           = `${AUTH}/forgotpassword`;
export const AUTH_CONFIRM_FORGOT_PASSWORD   = `${AUTH}/confirmforgotpassword`;

export const PERSONAL_UPDATE                = `${API_BASE_URL}/personal/update`;
export const PERSONAL_LEAVE                 = `${API_BASE_URL}/personal/leaveTeam`;

export const GET_CARRIERS                   = `${API_BASE_URL}/carrier`;
export const GET_LOCODES                    = `${API_BASE_URL}/locode`;
export const GET_TRACKERS                   = `${API_BASE_URL}/tracker`;
export const GET_ROUTES                     = `${API_BASE_URL}/route`;
export const TRACKER_MARK_ACTIVE_SHIPMENT   = `${API_BASE_URL}/tracker/mark-active-shipment`;

export const BOOKINGS                       = `${API_BASE_URL}/bookings`;
export const BOOKING                        = `${API_BASE_URL}/bookings/:bookingId`;
export const ACTIVITY_LOGS                  = `${API_BASE_URL}/bookings/:bookingId/logs`;
export const BOOKING_DRAFT                  = `${API_BASE_URL}/bookings/draft`;
export const BOOKING_STATUS                 = `${API_BASE_URL}/bookings/:bookingId/status`;
export const BOOKING_COLLABORATORS          = `${API_BASE_URL}/bookings/:bookingId/add-collaborators`;
export const BOOKING_COMMENTS               = `${API_BASE_URL}/bookings/:bookingId/comment`;

export const TEMPLATES_DETAILS              = `${API_BASE_URL}/templates/:templateId`;
export const TEMPLATES_DETAILS_CLONE        = `${API_BASE_URL}/templates/:templateId/clone`;
export const TEMPLATES                      = `${API_BASE_URL}/templates`;
export const SECTION                        = `${API_BASE_URL}/templates/:templateId/section`;
export const TEMPLATE_CREATE_TASK           = `${API_BASE_URL}/templates/section/:sectionId/task`;
export const TEMPLATE_TASK                  = `${API_BASE_URL}/templates/task/:taskId`;
export const TEMPLATE_COLLABORATORS         = `${API_BASE_URL}/templates/:templateId/collaborators`;
export const TEMPLATE_SECTION               = `${API_BASE_URL}/templates/section/:sectionId`;
export const TEMPLATE_ASSIGNEES             = `${API_BASE_URL}/templates/task/:taskId/assignees`;

export const TASK_MINE                      = `${API_BASE_URL}/tasks-mine`;
export const TASK_TEAM                      = `${API_BASE_URL}/tasks-team`;
export const TASK                           = `${API_BASE_URL}/tasks`;

/**
 * Upload files.
 */
export const DEFAULT_MAX_SIZE_UPLOAD        = 5242880;
export const IMAGE_FILE_EXTENSION           = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
export const WORD_FILE_EXTENSION            = ['doc', 'docx'];
export const EXCEL_FILE_EXTENSION           = ['xls', 'xlsx'];
export const PDF_FILE_EXTENSION             = ['pdf'];
export const FILE_TYPE_USER_FILES           = 'UserFiles';
export const FILE_SUBTYPE_USER_AVATAR       = 'UserAvatar';
export const FILE_TYPE_ORG_FILES            = 'OrgFiles';
export const FILE_SUBTYPE_ORG_LOGO          = 'OrgLogo';
export const FILE_TYPE_ISSUE_CMT_DOCS       = 'IssueCommentDocs';
export const FILE_TYPE_BR_CMT_DOCS          = 'BrCommentDocs';
export const MAX_FILE_CMT_DOCS              = 9;
export const MAX_SIZE_CMT_DOC               = 26214400;
export const FILE_TYPE_SHIPMENT_DETAIL_DOCS = 'shipmentDetailsDocs';
export const FILE_SUB_TYPE_SHIPMENT_DETAIL_DOCS = 'booking-confirmation';
export const MAX_FILE_SHIPMENT_DETAIL_DOCS  = 1;
export const MAX_SIZE_SHIPMENT_DETAIL_DOC   = 5242880;
export const MAX_FILE_FTA_ADVISOR_DOCS      = 3;
export const GET_UPLOAD_URL_SIGNED_FILE     = `${API_BASE_URL}/storage/uploadSignedURL`;
export const GET_UPLOADED_SIGNED_FILE_URL   = `${API_BASE_URL}/storage/signedURL`;
export const GET_FILE                       = `${API_BASE_URL}/storage/file?fileName=`;

export const ACTIVE_SHIPMENTS               = `${API_BASE_URL}/active-shipments`;
export const ACTIVE_SHIPMENT_ISSUES         = `${API_BASE_URL}/active-shipment/:shipmentId/issues`;
export const ACTIVE_SHIPMENT_ISSUE          = `${API_BASE_URL}/active-shipment/:shipmentId/issues/:issueId`;
export const TASKS_ISSUE                    = `${API_BASE_URL}/active-shipment/:shipmentId/tasksIssue`;
export const ACTIVE_SHIPMENT_ISSUE_STATUS   = `${API_BASE_URL}/active-shipment/:shipmentId/issues/:issueId/status`;
export const ACTIVE_SHIPMENT_ISSUE_PARTNERS = `${API_BASE_URL}/active-shipment/:shipmentId/issues/:issueId/partners`;
export const ACTIVE_SHIPMENT_ISSUE_COMMENTS = `${API_BASE_URL}/active-shipment/:shipmentId/issues/:issueId/comments`;
export const ACTIVE_SHIPMENT_COLLABORATORS  = `${API_BASE_URL}/active-shipment/:shipmentId/collaborators`;
export const ACTIVE_SHIPMENT_ADD_SECTION    = `${API_BASE_URL}/active-shipment/:shipmentId/section`;
export const ACTIVE_SHIPMENT_EDIT_SECTION   = `${API_BASE_URL}/active-shipment/section/:sectionId`;
export const ACTIVE_SHIPMENT_TASKS          = `${API_BASE_URL}/active-shipment/:shipmentId/tasks`;
export const ACTIVE_SHIPMENT_TASK_PARTNERS  = `${API_BASE_URL}/active-shipment/task/:taskId/partners`;
export const ACTIVE_SHIPMENT_TASK_STATUS    = `${API_BASE_URL}/active-shipment/section/task/:taskId/status`;
export const ACTIVE_SHIPMENT_SAVE_TEMPLATE  = `${API_BASE_URL}/active-shipment/:taskId/save-template`;
export const ACTIVE_SHIPMENT_ADD_TASK       = `${ACTIVE_SHIPMENT_EDIT_SECTION}/task`;
export const ACTIVE_SHIPMENT_UPDATE_TASK    = `${API_BASE_URL}/active-shipment/section/task/:taskId`;
export const ACTIVE_SHIPMENT_STATUS         = `${API_BASE_URL}/active-shipment/:shipmentId/status`;
export const ACTIVE_SHIPMENT_INFO           = `${API_BASE_URL}/active-shipment/:shipmentId/info`;
export const ACTIVE_SHIPMENT_NOTE           = `${API_BASE_URL}/active-shipment/:shipmentId/note`;
export const ACTIVE_SHIPMENT_AS_TEMPLATE    = `${API_BASE_URL}/templates/:shipmentId`;
export const ACTIVE_SHIPMENT_HSCODE         = `${API_BASE_URL}/active-shipment/:shipmentId/fta/hscodes`;
export const ACTIVE_SHIPMENT_FTA_DETAILS    = `${API_BASE_URL}/active-shipment/:shipmentId/fta/fta-result`;
export const ACTIVE_SHIPMENT_ADD_TASK_FTA   = `${API_BASE_URL}/active-shipment/:shipmentId/fta/task`;

// OCR APIS
export const OCR                            = `${API_BASE_URL}/ocr/:docId`;

// Others
export const SITE_NAME                      = 'Trames';

export const TAB_CONTAINER                  = 'Container';
export const TAB_BL_NUMBER                  = 'BL number';
export const TAB_BOOKING_NO                 = 'Booking number';

export const COMMENTS                       = 'Comments';
export const ACTIVITIES_LOG                 = 'Activities Log';

export const LOGIN                          = 'Log In';
export const SIGNUP                         = 'Sign Up';

export const DATE_FORMAT                    = 'DD MMM YYYY';
export const EXPIRED_DATE_FORMAT            = 'MM/YYYY';

export const OPERATION_FAILED_MESSAGE       = 'Operation failed. Please check again!';

export const ORGANIZATION_PAGE_SIZE         = 6;
export const LOCODE_PAGE_SIZE               = 20;
export const TEAM_PAGE_SIZE                 = 6;
export const MEMBER_PAGE_SIZE               = 6;
export const CARRIER_PAGE_SIZE              = 6;
export const BOOKING_REQUESTS_PAGE_SIZE     = 6;
export const TEMPLATE_PAGE_SIZE             = 6;
export const ISSUE_PAGE_SIZE                = 6;
export const BR_COMMENTS_PAGE_SIZE          = 6;
export const SERVICE_PROVIDERS_PAGE_SIZE    = 6;
export const COMMENT_PAGE_SIZE              = 6;
export const COLLABORATORS_PAGE_SIZE        = 6;
export const TASK_PAGE_SIZE                 = 6;
export const ACTIVE_SHIPMENT_PAGE_SIZE      = 6;
export const DEBOUNCE_TIME                  = 500;

export const ACCESS_TOKEN                   = 'ACCESS_TOKEN';
export const REFRESH_TOKEN                  = 'REFRESH_TOKEN';
export const ACCESS_TOKEN_EXPIRY            = 'ACCESS_TOKEN_EXPIRY';
export const REFRESH_TOKEN_EXPIRY           = 'REFRESH_TOKEN_EXPIRY';

export const OWNER                          = 'OWNER';
export const ADMIN                          = 'ADMIN';
export const MEMBER                         = 'MEMBER';

export const TEAM                           = 'TEAM';
export const ORGANIZATION                   = 'ORGANIZATION';

export const TRACKER_BOOKING_BC             = 'BC';
export const TRACKER_BOOKING_BK             = 'BK';
export const TRACKER_BOOKING_BL             = 'BL';

export const SHIPPER                        = 'SHIPPER'
export const CONSIGNEE                      = 'CONSIGNEE';
export const EXPORT_CUSTOMS                 = 'EXPORT_CUSTOMS';
export const FREIGHT                        = 'FREIGHT';
export const EXPORT_LOGISTICS               = 'EXPORT_LOGISTICS';
export const IMPORT_LOGISTICS               = 'IMPORT_LOGISTICS';
export const IMPORT_CUSTOMS                 = 'IMPORT_CUSTOMS';

export const ORIGIN                         = 'origin';
export const DESTINATION                    = 'destination';
export const ERROR                          = 'error';
export const SUCCESS                        = 'success';
export const DEPARTURE                      = 'departure';
export const ARRIVAL                        = 'arrival';
export const EMPTY                          = 'empty';
export const DONE                           = 'done';

export const CREATED                        = 'CREATED';
export const RECEIVED                       = 'RECEIVED';

export const MINE                           = 'mine';
export const OTHERS                         = 'others';

export const ACTIVE                         = 'ACTIVE';
export const CREATOR                        = 'CREATOR';
export const FREIGHT_PARTNER                = 'FREIGHT_PARTNER';
export const COLLABORATOR                   = 'COLLABORATOR';

export const SUBMITTED                      = 'SUBMITTED';
export const DRAFT                          = 'DRAFT';
export const CONFIRMED                      = 'CONFIRMED';
export const CANCELLED                      = 'CANCELLED';
export const REJECTED                       = 'REJECTED';
export const DELETED                        = 'DELETED';
export const MARK_AS_ACTIVE_SHIPMENT        = 'MARK_AS_ACTIVE_SHIPMENT';
export const MARKED                         = 'MARKED';

export const FAILED                         = 'FAILED';

export const ALL                            = 'ALL';
export const OPEN                           = 'OPEN';
export const CLOSED                         = 'CLOSED';
export const CANCELED                       = 'CANCELED';
export const COMPLETE                       = 'COMPLETE';

export const MARK_NEW                       = 'MARK_NEW';
export const MARK_TRACK_SHIPMENT            = 'MARK_TRACK_SHIPMENT';
export const MARK_BOOKING_REQUEST           = 'MARK_BOOKING_REQUEST';
export const CARD                           = 'CARD';

export const ISSUES                         = 'Issues';
export const TASK_MANAGEMENT                = 'TaskManagement';
export const DOCUMENTS                      = 'Documents';
export const FTA                            = 'Fta-advisor';
export const SHIPMENT_INFO                  = 'Shipment-info';
export const SHIPMENT_LOG                   = 'Shipment-log';

export const SHIPPING_BOOKING_REQUEST       = 'br';
export const SHIPPING_TRACKER               = 'ts';
export const EVENT                          = 'EVENT';
export const DOCUMENT                       = 'DOCUMENT';

export const PENDING                        = 'PENDING';

export const SHIPMENT_STATUS = {
  IN_PROGRESS: 'INPROGRESS',
  PENDING: 'PENDING',
  STUCK: 'STUCK',
  DONE: 'DONE',
};

export const VAD                             = 'VAD';
export const VDL                             = 'VDL';

export const ACTIVE_SHIPMENT_TABS = {
	ALL: 'ALL',
	MY_TASK: 'MY_TASK',
	COMPLETED: 'COMPLETED',
	CANCELLED: 'CANCELLED'
};

export const MYTASK                         = 'MYTASK';

export const DEFAULT_AVATAR                 = 'assets/images/default-avatar.png';
