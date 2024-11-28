export type AuthorizeUserInputDTO = {
  email: string;
  password: string;
};

export type AuthorizeUserOutputDTO = {
  success: boolean;
  error?: string;
  user?: ClientUser;
};

export type ClientUser = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: string;
};
