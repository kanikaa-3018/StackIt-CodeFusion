// let accessToken: string | null = localStorage.getItem("accessToken");

// export function getAccessToken() {
//   return accessToken;
// }

// export function setAccessToken(token: string) {
//   accessToken = token;
//   localStorage.setItem("accessToken", token);
// }

// export function clearAccessToken() {
//   accessToken = null;
//   localStorage.removeItem("accessToken");
// }


const ACCESS_TOKEN_KEY = "accessToken";

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY); // Always read fresh
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
