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
    const result = await api.signin(email, password);
    return this.handleResult(result);
  };

  signUp = async (email: string, password: string, repeatedPassword: string): Promise<string | null> => {
    const result = await api.signup(email, password, repeatedPassword);
    return await this.handleResult(result);
  };

  handleResult = async (result: Response<Sign> | null
    )=> {
    if (!result?.succeeded) {
      return result?.errorMessage ?? null;
    }

    const token = result.data?.token;

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
