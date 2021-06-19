import axios from "axios";

let api = axios.create({
    baseURL: `${process.env.API_URL}`,
    withCredentials: true
})

let qbEnvironment = process.env.ENV === "production" ? "api.intuit.com" : "sandbox.api.intuit.com";
let qbApi = axios.create({
    baseURL: `https://  /quickbooks/v4`
});

/*
*
    An opaque container that encapsulates a cardholder's credit card information or bank account information. Of note:
    - This is a one time token with 15 minute long life span.
    - A given token can only be used for one charges transaction. You must create a new token prior to each charges transaction.
    - For the app to avoid PCI compliance requirements, it needs to exchange card info to a token BEFORE the the card info reaches the 
    app server. For example, it can get the token by calling the token create endpoint from the JavaScript running in the browser, then 
    pass the token to the backend server for sequent calls to charges endpoints.
*
*/

const queryObjectToString = (queryObject) => {
    let queryString = '?options=true'

    for (let optionName in queryObject) {
        queryString = queryString + `&${optionName}=${queryObject[optionName]}`
    }

    return queryString
}

export const signIn = (info) => {
    return api.post("/auth/login", info, {withCredentials: true}).then(res => res.data)
}

export const register = (data) => {
    return api.post(`/auth/register`, data).then(res => res.data);
}

export const generateRegistrationLink = (role) => {
    return api.post(`/auth/generateRegistrationLink/${role}`).then(res => res.data);
}

export const verifyRegistrationKey = (id) => {
    return api.get(`/auth/verifyRegistrationKey/${id}`).then(res => res.data);
}

export const checkAuth = () => {
    return api.get("/auth/check", {withCredentials: true}).then(res => res.data)
}

export const deleteAuth = () => {
    return api.get("/auth/delete", {withCredentials: true}).then(res => res.data)
}

export const resetPassword = (data) => {
    return api.post(`/auth/reset-password`, data).then(res => res.data);
}

export const forgotPassword = (data) => {
    return api.post(`/auth/forgot-password`, data).then(res => res.data);
}

export const tokenizeCard = (card) => {
    return qbApi.post("/payments/tokens", card).then(res => res.data)
}

/**
 * Payment data including token value, course id, customer name, and email address, (more to come)
 * @param {*} paymentData 
 */
export const createCoursePayment = (paymentData) => {
    return api.post(`/finance/course-payment`, paymentData).then(res => res.data)
}

export const createSessionPayment = (paymentData) => {
    return api.post(`/finance/session-payment`, paymentData).then(res => res.data)
}

/*
    Query Object Structured as Follows:
    Can provide range (start - end) or just a start date
    {
        start: Date,
        end: Date
    }
*/
export const getGeneralEvents = (queries) => {
    return api.get(`/general-event${queries ? queryObjectToString(queries) : ''}`).then(res => res.data)
}

export const newGeneralEvent = (data) => {
    return api.post(`/general-event`, data).then(res => res.data)
}

export const deleteGeneralEvent = (id) => {
    return api.delete(`/general-event/${id}`).then(res => res.data)
}

/*
    Query Object Structured as Follows:
    Can provide range (start - end) or just a start date
    {
        start: Date,
        end: Date,
        studentName: String
    }
*/
export const getDiagnostics = (queries) => {
    return api.get(`/diagnostic${queries ? queryObjectToString(queries) : ''}`).then(res => res.data)
}

/*
    Query Object Structured as Follows:
    All queries are optional but they come in pairs, both options from a pair need to be present
    {
        sortField0: String, sortField1... sortFieldN
        sortOrder0: String (asc/desc), sortOrder1... sortOrderN,
        filterField: String,
        filterValue: String,
        paginationPage: Number,
        paginationLimit: Number
    }
*/
export const getDiagnostic = (id, queries) => {
    return api.get(`/diagnostic/${id}${queries ? queryObjectToString(queries) : ''}`).then(res => res.data)
}

/*
    Query Object Structured as Follows:
    All queries are optional but they come in pairs, both options from a pair need to be present
    {
        sortField0: String, sortField1... sortFieldN
        sortOrder0: String (asc/desc), sortOrder1... sortOrderN,
        filterField: String,
        filterValue: String,
        paginationPage: Number,
        paginationLimit: Number
    }
*/
export const generateDiagnosticReport = (queries) => {
    return api.get(`/diagnostic/generateReports/all${queries ? queryObjectToString(queries) : ''}`).then(res => res.data)
}

export const updateDiagnostic = (id, data) => {
    return api.put(`/diagnostic/${id}`, data).then(res => res.data)
}

// Data object should consist of an array of mongoIDs (student IDs)
export const approveDiagnosticRequest = (id, data) => {
    return api.put(`/diagnostic/${id}/approve`, data).then(res => res.data)
}

// Data object should consist of an array of mongoIDs (student IDs). All ID's passed will have attendance set to true (defaults to false)
export const setDiagnosticAttendance = (id, data) => {
    return api.put(`/diagnostic/${id}/setAttended`, data).then(res => res.data)
}

/*
    Data should be structured as follows:
    requests: [
        {
            studentId: String,
            value: Boolean
        }
    ]
*/
export const setDiagnosticConfirmation = (id, data) => {
    return api.put(`/diagnostic/${id}/setConfirmed`, data).then(res => res.data)
}

export const newDiagnostic = (data) => {
    return api.post(`/diagnostic`, data).then(res => res.data)
}

export const deleteDiagnostic = (id) => {
    return api.delete(`/diagnostic/${id}`).then(res => res.data)
}

/*
* @param {String}		body.actId
* @param {String}		body.satId
* @param {String}       body.studentName
* @param {String}       body.studentPhone
* @param {String}       body.gradeLevel
* @param {String}		body.school
* @param {String}		body.mathClass
* @param {String}		body.extendedTime
* @param {String}		body.parentName
* @param {String}		body.parentPhone
* @param {String}		body.parentEmail
*/
export const doubleDiagnosticRequest = (data) => {
    return api.post(`/diagnostic/doubleRequest`, data).then(res => res.data)
}

export const newCurrentDiagnosticRequest = (id, data) => {
    return api.post(`/diagnostic/${id}/requests/current`, data).then(res => res.data)
}

export const transferStudent = (oldDiagnosticId, requestId, newDiagnosticId) => {
    return api.post(`/diagnostic/${oldDiagnosticId}/${requestId}/${newDiagnosticId}`).then(res => res.data)
}

export const hideDiagnosticRequest = (id, studentId) => {
    return api.put(`/diagnostic/${id}/hide/${studentId}`).then(res => res.data)
}

// Opposite of hideDiagnosticRequest
export const showDiagnosticRequest = (id, studentId) => {
    return api.put(`/diagnostic/${id}/show/${studentId}`).then(res => res.data)
}

// All properties are optional for data object, only pass what needs to be changed
export const editDiagnosticRequest = (diagnosticId, studentId, data) => {
    return api.put(`/diagnostic/${diagnosticId}/edit/${studentId}`, data).then(res => res.data)
}

export const deleteDiagnosticRequest = (diagnosticId, studentId) => {
    return api.delete(`/diagnostic/${diagnosticId}/${studentId}`).then(res => res.data)
}

export const newSession = (data) => {
    return api.post(`/session`, data).then(res => res.data)
}

export const newSessionType = (data) => {
    return api.post(`/advising-types`, data).then(res => res.data)
}

export const createCourse = (data) => {
    return api.post(`/course`, data).then(res => res.data)
}

export const updateCourse = (id, data) => {
    return api.put(`/course/${id}`, data).then(res => res.data)
}

export const deleteCourse = (id) => {
    return api.delete(`/course/${id}`).then(res => res.data)
}

/*
    Query Object Structured as Follows:
    Can provide range (start - end) or just a start date
    {
        start: Date,
        end: Date,
        studentName: String
    }
*/
export const getCourses = (queries) => {
    return api.get(`/course${queries ? queryObjectToString(queries) : ''}`).then(res => res.data)
}

/*
    Query Object Structured as Follows:
    All queries are optional but they come in pairs, both options from a pair need to be present (except for combined)
    {
        sortField: String,
        sortOrder: String (asc/desc),
        filterField: String,
        filterValue: String,
        paginationPage: Number,
        paginationLimit: Number,
        combined: Boolean (if true, returns a list containing requests and enrolled students together)
    }
*/
export const getCourse = (id, queries) => {
    return api.get(`/course/${id}${queries ? queryObjectToString(queries) : ''}`).then(res => res.data)
}

export const validateCourseRequest = (tutorName) => {
    return api.get(`/course/validateRequest/${tutorName}`).then(res => res.data)
}

export const submitCourseApprovals = (id, data) => {
    return api.put(`/course/${id}/enrollStudents`, data).then(res => res.data)
}

export const hideCourseRequest = (courseId, id) => {
    return api.put(`/course/${courseId}/hide/${id}`).then(res => res.data)
}

export const showCourseRequest = (courseId, id) => {
    return api.put(`/course/${courseId}/show/${id}`).then(res => res.data)
}

// All properties are optional for data object, only pass what needs to be changed
export const editCourseEnrolledStudent = (courseId, studentId, data) => {
    return api.put(`/course/${courseId}/editEnrolled/${studentId}`, data).then(res => res.data)
}

export const generateCourseCode = (id) => {
    return api.put(`/course/generateCode/${id}`).then(res => res.data)
}

export const newBootcampRequest = (id, data) => {
    return api.put(`/course/${id}/createRequest`, data).then(res => res.data)
}

export const deleteCourseCode = (courseId, courseCode) => {
    return api.delete(`/course/deleteCode/${courseId}/${courseCode}`).then(res => res.data)
}

export const validateCode = (id) => {
    return api.get(`/course/validateCode/${id}`).then(res => res.data)
}

export const getAdvisingTypes = () => {
    return api.get(`/advising-types`).then(res => res.data)
}

export const getSessions = () => {
    return api.get(`/session`).then(res => res.data)
}

export const getSession = (id) => {
    return api.get(`/session/${id}`).then(res => res.data)
}

export const sendContactUsEmail = (data) => {
    return api.post(`/contact`, data).then(res => res.data)
}

export const uploadFiles = (data) => {
    return api.post(`/file`, data).then(res => res.data)
}

export const getAdvisingType = (id) => {
    return api.get(`/advising-types/${id}`).then(res => res.data)
}

/**
 * Saving session files
 * @param {*} fileData multipart form data
*/
export const saveSessionFiles = (sessionId, purchasedId, fileData) => {
    return api.put(`/session/${sessionId}/purchased/${purchasedId}`, fileData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}

export const getAdvisingFiles = (sessionId, purchasedId) => {
    return api.get(`/session/${sessionId}/purchased/${purchasedId}`).then(res => res.data)
}

export const connectToQuickbooks = () => {
    return api.get(`/finance/authUri`).then(res => res.data);
}

export const getQBToken = () => {
    return api.get(`/finance/returnToken`).then(res => res.data);
}

export const getAllUsers = () => {
    return api.get(`/auth/users`).then(res => res.data);
}

export const updateUser = (userId, data) => {
    return api.put(`/auth/users/${userId}`, data).then(res => res.data);
}

export const generateNewUserLink = (data) => {
    return api.post(`/auth/generateRegistrationLink`, data).then(res => res.data);
}

export const getSchools = () => {
    return api.get(`/school/`).then(res => res.data);
}

// Request Body: { name: 'New School Name' }
export const createSchool = (data) => {
    return api.post(`/school/`, data).then(res => res.data);
}

export const deleteSchool = (schoolId) => {
    return api.delete(`/school/${schoolId}`).then(res => res.data);
}

export const createReportEntry = (data) => {
    return api.post(`/report-entry/`, data).then(res => res.data);
}

export const editReportEntry = (id, data) => {
    return api.put(`/report-entry/${id}`, data).then(res => res.data);
}

export const deleteReportEntry = (id) => {
    return api.delete(`/report-entry/${id}`).then(res => res.data);
}

// Google API functionality
export const authorizeGoogleUser = (eventID) => {
    return api.post(`/auth/authorizeGoogleUser/${eventID}`).then(res => res.data);
}

export const addEventToGoogleCalendar = (eventID, data) => {
    return api.post(`/diagnostic/createCalendarEvent/${eventID}`, data).then(res => res.data);
}