import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../config/config";

export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.projectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      console.log(userId);
      return await this.databases.createDocument(
        config.databaseID,
        config.collectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.databaseID,
        config.collectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.databaseID,
        config.collectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.databaseID,
        config.collectionID,
        slug
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.databaseID,
        config.collectionID,
        queries
      );
    } catch (error) {
      console.log("Error in collecting all the posts");
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(config.bucketID, ID.unique(), file);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.bucketID, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  getPreview(fileId) {
    return this.bucket.getFilePreview(config.bucketID, fileId);
  }
}

const services = new Services();

export default services;
