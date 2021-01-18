// to do: bundle a minified version of this file in a public route

const checkDomain = new Promise((resolve) => {
  console.log(window.location.hostname);
  // todo: http request sending all available client info (ip, domain, etc.)
  // if response status is 200, then
  resolve();
  // else throw/stop
});

async function askIframe(...args) {
  // using some postMessage plugin
  // ask message and return the answers from iframe (probably, home component methods)
  console.log(...args);

  // await ...
  return true;
}

export async function isAuthenticated() {
  await checkDomain;
  const ans = await askIframe('isAuthenticated');
  return ans;
}

export async function hasAccessTo(x) {
  await checkDomain;
  const ans = await askIframe('hasAccessTo', x);
  return ans;
}

export async function login() {
  await checkDomain;
  window.location.href = `${process.env.VUE_APP_FRONTEND_ACCOUNTS_URL}/login?target=${window.location.href}`;
}

export function isAccessError(error) {
  return error.status === 401 || error.status === 403;
}

export async function logout() {
  await checkDomain;
  await askIframe('invalidateSession');
  // login()
}

export default {
  isAuthenticated,
  hasAccessTo,
  login,
  isAccessError,
  logout,
};
