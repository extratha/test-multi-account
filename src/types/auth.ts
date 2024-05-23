

export type UserProfile = {
  "id": string,
  "email": string,
  "prefix": string,
  "firstName": string,
  "lastName": string,
  "isActive": boolean,
  "userId":string,
  "passwordChanged": boolean | null,
  "createdAt": string,
  "updatedAt": string;
};
