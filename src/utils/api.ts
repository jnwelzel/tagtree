export enum EndpointEnum {
  Signup = "/signup",
  Login = "/auth/login",
  Admin = "/admin",
  Tags = "/tags",
  MyTags = `${Tags}/my-tags`,
  Users = "/users",
  UserInfo = `${Users}/me`,
  UserProfile = `${Users}/profile`,
}

async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  let response;

  try {
    response = await fetch(url, config);
  } catch {
    throw new Error("API connection failed.");
  }

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const result = await response.json();

  return result;
}

const BASE_HEADERS = {
  Accept: "application/json",
};

export const api = {
  get: <TResponse>(endpoint: EndpointEnum | string, accessToken?: string) =>
    request<TResponse>(`${import.meta.env.PUBLIC_API_URL}${endpoint}`, {
      method: "GET",
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}`, ...BASE_HEADERS }
        : BASE_HEADERS,
    }),
  post: <TBody extends object, TResponse>(
    endpoint: EndpointEnum | string,
    body: TBody,
    accessToken?: string
  ) =>
    request<TResponse>(`${import.meta.env.PUBLIC_API_URL}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            ...BASE_HEADERS,
          }
        : {
            "Content-Type": "application/json",
            ...BASE_HEADERS,
          },
    }),
  delete: <TResponse>(endpoint: EndpointEnum | string, accessToken?: string) =>
    request<TResponse>(`${import.meta.env.PUBLIC_API_URL}${endpoint}`, {
      method: "DELETE",
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}`, ...BASE_HEADERS }
        : BASE_HEADERS,
    }),
  put: <TBody extends object, TResponse>(
    endpoint: EndpointEnum | string,
    body: TBody,
    accessToken?: string
  ) =>
    request<TResponse>(`${import.meta.env.PUBLIC_API_URL}${endpoint}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            ...BASE_HEADERS,
          }
        : {
            "Content-Type": "application/json",
            ...BASE_HEADERS,
          },
    }),
};
