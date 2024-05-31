const createUrl = (path: string) => {
  return window.location.origin + path;
};

export const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: {
  url: string;
  method: string;
  body?: any;
  json?: boolean;
}) => {
  const res = await fetch(new Request(createUrl(url)), {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // handle your errors
    throw new Error("API error");
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

export const register = (user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  return fetcher({ url: "/api/register", method: "POST", body: user });
};

export const signin = (user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  return fetcher({ url: "/api/signin", method: "POST", body: user });
};

export const createNewProject = async (name: string) => {
  return fetcher({
    url: "/api/project",
    method: "POST",
    body: { name },
    json: true,
  });
};
