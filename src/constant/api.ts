
export const API = {
  PATH: {
    login: 'auth/login'
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
