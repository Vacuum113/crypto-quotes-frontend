const baseUrl = "/api/v1";
const signIn = baseUrl + "/account/signin";
const signUp = baseUrl + "/account/signup";
const logoutUrl = baseUrl + "/account/signout";

export const config = {
  baseUrl: baseUrl,
  signIn: signIn,
  signUp: signUp,
  logoutUrl: logoutUrl,
};

export enum Routes {
  home = "/",
  signIn = "/signin",
  signUp = "/signup",
}
