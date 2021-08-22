import { config } from "../configuration";

const customFetch = async (
  relativeUrl: string,
  body: any,
  method: string,
  isFile = false
) => {
  const response = await fetch(config.baseUrl + relativeUrl, {
    method,
    headers: getHeaders(isFile),
    body: body == null ? null : isFile ? body : JSON.stringify(body),
  });
  
  if (response.status === 401) {
    // @ts-ignore
    window.accountService.logout();
    document.location.reload();
  }

  return response;
};

const getHeaders = (isFile: boolean) => {
  const headers: Headers = {};
  // @ts-ignore
  const token = window.accountService.currentToken;
  if (token != null) headers["Authorization"] = `Bearer ${token}`;

  if (!isFile) headers["Content-Type"] = "application/json";

  return headers;
};

const fetchPost = async (relativeUrl: string, body?: object, isFile: boolean = false) => await customFetch(relativeUrl, body, "POST", isFile);

const fetchPut = async (relativeUrl: string, body: object) => await customFetch(relativeUrl, body, "PUT");

const fetchGet = async (relativeUrl: string) => await customFetch(relativeUrl, null, "GET");

const sendGetRequest = async (path: string) => {
  return executeRequest(async () => await fetchGet(path));
};

const sendPutRequest = async (path: string, payload?: any) => {
  return executeRequest(async () => await fetchPut(path, payload));
};

const sendPostRequest = async <T extends Data>(path: string, payload?: any): Promise<T | FailureData> => {
  return executeRequest(async () => await fetchPost(path, payload));
};

const executeRequest = async (request: () => Promise<Response>) => {
  try {
    const response = await request();
    return response.json();
  } catch {
    return null;
  }
};

const signin = async (login: string, password: string) => {
  return await sendPostRequest<Sign>("/account/signin", { login, password });
};

const signup = async (login: string, password: string) => {
  return await sendPostRequest<Sign>("/account/signup", { login, password });
};

export default {
  signin,
  signup,
};

interface Headers {
  [key: string]: string;
}

type Data = {
  status: number;
};

export type FailureData = Data & {
  message: string;
};

export type Sign = Data & {
  token: string;
};