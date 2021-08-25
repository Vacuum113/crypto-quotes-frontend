import api, { Response, Sign } from "../../dataProvider/api";
import { makeAutoObservable } from "mobx";

export default class AccountService {
  constructor () {
    makeAutoObservable(this);
  }

  tokenName = "cqf-token";

  getToken = () => localStorage.getItem(this.tokenName);
  setToken = (value: string) => localStorage.setItem(this.tokenName, value);
  deleteToken = () => localStorage.removeItem(this.tokenName);

  currentToken: string | null = this.getToken();

  signIn = async (email: string, password: string): Promise<string | null> => {
    return this.sendUserCredits(email, password, api.signin);
  };

  signUp = async (email: string, password: string): Promise<string | null> => {
    return this.sendUserCredits(email, password, api.signup);
  };

  sendUserCredits = async (
    email: string,
    password: string,
    request: (email: string, password: string) => Promise<Response<Sign> | null>
  ) => {
    const response = await request(email!, password!);
    if (!response?.succeeded) {
      return response?.errorMessage ?? null;
    }

    const token = response.data?.token;

    if (token === undefined)
      return "Error";
    
    this.setToken(token);
    this.setCurrentToken(token);

    return null;
  };

  isTokenExist = () => {
    return this.currentToken !== null;
  };

  logout = () => {
    this.deleteToken();
    this.deleteCurrentToken();
  };

  deleteCurrentToken = () => (this.currentToken = null);
  setCurrentToken = (token: string) => (this.currentToken = token);
}
