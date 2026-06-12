import { client, makeApiCall } from "./axios.config";

export const register = async (name: string, email: string, phone: string) => {
  phone = phone.includes("+") ? phone.substring(1) : phone;
  const body = { name, email, phone: "96566917955", password: "123342424" };
  const response = await client.post("/api/mobile/client/v1/register", body);
  return response.data;
};

export const login = async (phone: number) => {
  const body = { phone };
  // const response = await client.post("auth/api/mobile/client/v1/login", body);
  const response = await makeApiCall({ url: "auth/login", data: body, method: "post" })

  return response;
};


export const sendCode = async (phone: string) => {
  const body = { phone };
  // const response = await client.post("auth/sendCode", body);
  const response = await makeApiCall({ url: "auth/sendCode", data: body, method: "post" })

  return response;
};

export const emailLogin = async ({ email, password }: { email: string, password: string }) => {
  const body = { email, password };
  // const response = await client.post("auth/login", body);
  const response = await makeApiCall({ url: "auth/login", data: body, method: "post" })

  return response;
};


export const checkCode = async (phone: string, code: string) => {
  const body = { phone, code };
  // const response = await client.post("auth/checkCode", body);
  const response = await makeApiCall({ url: "auth/checkCode", data: body, method: "post" })

  return response;
};

export const emailVerify = async (email: string, code: string) => {
  const body = { email, code };
  // const response = await client.post("auth/verify-email", body);
  const response = await makeApiCall({ url: "auth/verify-email", data: body, method: "post" })
  return response;
};
export const checkResetPassword = async (email: string, code: string) => {
  const body = { email, code };
  // const response = await client.post("auth/check-reset-password", body);
  const response = await makeApiCall({ url: "auth/check-reset-password", data: body, method: "post" })

  return response;
};

export const sendResetPassword = async (email: string) => {
  const body = { email };
  // const response = await client.post("auth/send-reset-password", body);
  const response = await makeApiCall({ url: "auth/send-reset-password", data: body, method: "post" })

  return response;
};
export const resetPassword = async (email: string, password: string) => {
  const body = { email, password };
  // const response = await client.post("auth/reset-password", body);
  const response = await makeApiCall({ url: "auth/reset-password", data: body, method: "post" })

  return response;
};

export const registerUser = async ({ phone, email, password, callingCode, name }: { phone: string, email: string, password: string, callingCode: string, name: string }) => {
  const body = { phone: callingCode + phone, email, password, name };
  // const response = await client.post("auth/signup", body);
  const response = await makeApiCall({ url: "auth/signup", data: body, method: "post" })

  return response;
};

export const registerUserWithSocial = async ({ googleAccessToken, facebookAccessToken, appleAccessToken, appleInfo }: { googleAccessToken?: string | undefined, facebookAccessToken?: string | undefined, appleAccessToken: string | undefined, appleInfo?: any }) => {
  const body = {
    googleAccessToken: googleAccessToken ? googleAccessToken : ""
    , facebookAccessToken: facebookAccessToken ? facebookAccessToken : "",
    appleAccessToken: appleAccessToken ? appleAccessToken : "",
    appleInfo

  };
  const response = await makeApiCall({ url: "auth/signup-social", data: body, method: "post" })
  return response;
};

export const loginUserWithSocial = async ({ googleAccessToken, facebookAccessToken, appleAccessToken }: { googleAccessToken?: string | undefined, facebookAccessToken?: string | undefined, appleAccessToken: string | undefined }) => {
  const body = {
    googleAccessToken: googleAccessToken ? googleAccessToken : ""
    , facebookAccessToken: facebookAccessToken ? facebookAccessToken : "",
    appleAccessToken: appleAccessToken ? appleAccessToken : "",

  };
  const response = await makeApiCall({ url: "auth/login-social", data: body, method: "post" })

  return response;
};


