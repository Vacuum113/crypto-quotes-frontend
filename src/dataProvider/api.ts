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

  // @ts-ignore
  if (response.status === 401 && window.accountService.currentToken) {
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

const fetchGet = async (relativeUrl: string) => await customFetch(relativeUrl, null, "GET");

const sendGetRequest = async <T>(path: string): Promise<T | null> => {
  return await executeRequest(async () => await fetchGet(path)) as T;
};

const sendPostRequest = async <T>(path: string, payload?: any): Promise<Response<T> | null> => {
  return await executeRequest(async () => await fetchPost(path, payload));
};

const executeRequest = async (request: () => Promise<globalThis.Response>) => {
  try {
    const response = await request();
    return (await response.json());
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

const loadQuotes = async (start: number, end: number, order: string | undefined, orderBy: number | undefined) => {
  if (!order)
    return await sendGetRequest<GridResult>(`/cryptocurrency?start=${start}&end=${end}"`,);

  return await sendGetRequest<GridResult>(`/cryptocurrency?start=${start}&end=${end}&order=${order}&orderBy=${orderBy}`,);
};

export default {
  signin,
  signup,
  loadQuotes
};

interface Headers {
  [key: string]: string;
}

export type Response<TInternalData> = {
  succeeded: boolean;
  errorMessage?: string;
  errorCode?: ErrorCode;
  data?: TInternalData;
};


export type Sign = {
  token: string;
};

export type GridResult = {
  count: number,
  entities: Array<any>
};

enum ErrorCode {
  GenericError,
  Unauthorized,
  Forbidden,
}
