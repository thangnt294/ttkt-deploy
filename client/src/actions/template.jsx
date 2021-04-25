import axios from 'axios';
import { authHeaders } from './auth';
import { SECTION, TEMPLATES,TEMPLATES_DETAILS, TEMPLATE_COLLABORATORS, TEMPLATE_CREATE_TASK, TEMPLATE_SECTION, TEMPLATE_TASK, TEMPLATE_ASSIGNEES, TEMPLATES_DETAILS_CLONE } from './constants';

/** Get Templates
* @param {
*       tab : string
*       page: string
*       name: string
*       limit: string
* } params
*/
export const getTemplates = (params, token) => {
    return axios.get(TEMPLATES, params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};

/** Get a Template
* @param {
    *      _id: string
    * } payload 
    */;

export const getTemplate = (id, token) => {
    if (!id) return;
    return axios.get(TEMPLATES_DETAILS.replace(':templateId', id), authHeaders(token));
};

/** Edit a Template (name , description)
* @param {
*       name: string,
*       desc: string,
* } payload 
*/;

export const editTemplate = (templateId, payload, token) => {
    if (!templateId) return;
    return axios.put(TEMPLATES_DETAILS.replace(':templateId', templateId), payload, authHeaders(token));
};

/** Delete template
* @param {
*      templateId: string
* } params 
*/;

export const deleteTemplate = (templateId, token) => {
    if (!templateId) return;
    return axios.delete(TEMPLATES_DETAILS.replace(':templateId', templateId), authHeaders(token));
};

/** Clone template
* @param {
*      templateId: string
* } params 
*/;
    
export const cloneTemplate = (templateId, token) => {
    if (!templateId) return;
    return axios.post(TEMPLATES_DETAILS_CLONE.replace(':templateId', templateId), {}, authHeaders(token));
};

/** Add new section
* @param {
*      templateId: string
*      name: string
*      order: string
* } payload 
*/;

export const addNewSection = (templateId,payload, token) => {
    if (!payload) return;
    return axios.post(SECTION.replace(':templateId',templateId), payload ,authHeaders(token));
};
/** Update section
* @param {
*      name: string
*      order: string
* } payload 
*/;
export const editSection = (sectionId, payload, token) => {
    if (!sectionId) return;
    return axios.put(TEMPLATE_SECTION.replace(':sectionId', sectionId), payload, authHeaders(token));
};

/** Delete section
* @param {
*    sectionId: string
*}
*/
export const deleteSection = (sectionId, token) => {
    if (!sectionId) return;
    return axios.delete(TEMPLATE_SECTION.replace(':sectionId', sectionId), authHeaders(token));
};

/** create a task to section
 * @param {
*      name: string
*      type: string("DOCUMENT, EVENT")
*      dueDate: {
*          specificDate: string
*          eventBasedDate: {
*              typeOfEvent: string
*              dateOfEvent: string
*              adjustDays: string
*          }
*      }
*      roles: [CONSIGNEE, PARTNER, IMPORT_CUSTOMS, EXPORT_CUSTOMS, SHIPPER, IMPORT_LOGISTICS, EXPORT_LOGISTICS]
* } payload
*/

export const addNewTask = (sectionId, payload, token) => {
    if (!payload) return;
    return axios.post(TEMPLATE_CREATE_TASK.replace(':sectionId', sectionId), payload, authHeaders(token));
};
/** Update a task in section
 * @param {
 *      sectionId: string
 *      name: string
 *      type: string("DOCUMENT, EVENT")
 *      dueDate: {
 *          specificDate: string
 *          eventBasedDate: {
 *              typeOfEvent: string
 *              dateOfEvent: string
 *              adjustDays: string
 *          }
 *      }
 *      roles: [CONSIGNEE, PARTNER, IMPORT_CUSTOMS, EXPORT_CUSTOMS, SHIPPER, IMPORT_LOGISTICS, EXPORT_LOGISTICS]
 * } payload
 */
export const updateTask = (taskId, payload, token) => {
    if (!payload) return;
    return axios.put(TEMPLATE_TASK.replace(':taskId', taskId), payload, authHeaders(token));
};

/** Delete a task
* @param {
*       taskId: string
*} params
*/
export const deleteTask = (taskId, token) => {
    if (!taskId) return;
    return axios.delete(TEMPLATE_TASK.replace(':taskId', taskId), authHeaders(token));
}

/** Get collaborators of template
* @param {
*       type: string
*       role: string
*       page: int
*       limit: int
*} params
*/
export const getCollaboratorsTemplate = (templateId, params, token) => {
    if (!templateId) return;
    return axios.get(TEMPLATE_COLLABORATORS.replace(':templateId', templateId), params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
}

/** Create collaborators
* @param {
*   [
*       {
*           roleType: string,
*           partners: [
*               {
*                   partnerId: string,
*                   type: string
*               }
*           ]  
*       }
*   ]  
*} payload
*/
export const addCollabratorsTemplate = (templateId, payload, token) => {
if (!payload) return;
return axios.put(TEMPLATE_COLLABORATORS.replace(':templateId', templateId), payload, authHeaders(token));
};

/** Delete collaborator from template
* @param {
*       collaboratorId: string
*} payload
*/
export const removeCollaboratorTemplate = (templateId, payload, token) => {
    if (!templateId) return;
    return axios.delete(TEMPLATE_COLLABORATORS.replace(':templateId', templateId),{
        data: payload,
        ...authHeaders(token)
    });
}

/** add assignees to task 
* @param {
*    [
*        {
*           id: string  
*           type: string
*        }
*    ]
*} params
*/
export const assignPartnerTemplate = (taskId, payload, token) => {
    if (!taskId) return;
    return axios.put(TEMPLATE_ASSIGNEES.replace(':taskId', taskId), payload, authHeaders(token));
}

/** Delete collaborator from template
* @param {
*       id: string
*} payload
*/
export const removePartnerTemplate = (taskId, payload, token) => {
    if (!taskId) return;
    return axios.delete(TEMPLATE_ASSIGNEES.replace(':taskId', taskId),{
        data: payload,
        ...authHeaders(token)
    });
}
