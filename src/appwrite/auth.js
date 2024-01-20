import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class Authservices {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.projectID);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, username }) {
    try {
      const accountDetails = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );
      if (accountDetails) {
        return this.login({ email, password });
      } else {
        return accountDetails;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite services error", error);
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Could not sign out");
    }
  }
}

const authServices = new Authservices();

export default authServices;
