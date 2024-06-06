
export const API = {
  PATH: {
    login: 'auth/login',
    setNewPassword: 'auth/reset-password',
    changePassword: 'auth/change-password',
    forgotPassword: 'auth/forgot-password',
    exampleDataList: 'lab/examples',
  },
  HTTP_METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
  },
  ERROR: {
    UNAUTHENTICATION: {
      MESSAGE: 'unauthenticated',
      CODE: 401,
    },
    login: {
      INVALID_CREDENTIAL: {
        MESSAGE: 'invalid email or password',
        CODE: 400,
      },
    }
  },
};
