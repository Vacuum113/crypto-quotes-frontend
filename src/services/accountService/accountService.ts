import api, { FailureData, Sign } from "../../dataProvider/api";
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
    request: (email: string, password: string) => Promise<FailureData | Sign>
  ) => {
    const data = await request(email!, password!);
    if ((data as FailureData).error !== undefined) {
      return (data as FailureData).error;
    }

    const token = (data as Sign).token;

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
