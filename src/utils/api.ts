export enum EndpointEnum {
  Signup = "/signup",
  Login = "/login",
  Admin = "/admin",
}

async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  const response = await fetch(url, config);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const result = await response.json();

  return result;
}

export const api = {
  get: <TResponse>(url: string) => request<TResponse>(url),
  post: <TBody extends object, TResponse>(
    endpoint: EndpointEnum,
    body: TBody
  ) =>
    request<TResponse>(`${import.meta.env.PUBLIC_API_URL}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }),
};
