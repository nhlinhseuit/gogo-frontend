import User from "./User";

interface AuthenResult {
  token: string;
  message: string;
  user: User;
}

export default AuthenResult;
