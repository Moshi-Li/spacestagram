import * as Realm from "realm-web";

const REALM_APP_ID = "application-0-kopsx";
const DB_KEY = import.meta.env.VITE_APP_DB_KEY as string; // e.g. myapp-abcde

const app = new Realm.App({ id: REALM_APP_ID });

export const getAccessToken = async () => {
  if (!app.currentUser) {
    const credentials = Realm.Credentials.apiKey(DB_KEY);
    await app.logIn(credentials);
  } else {
    await app.currentUser.refreshAccessToken();
  }

  return app.currentUser!.accessToken;
};
