import { Deta } from "deta";
import type { Drive } from "deta";

import type { ConfigMapping, ListOptions, ListReturn, UploadOptions, Uploader } from "../types";

type CD = ConfigMapping["deta"];
type DetaDrive = ReturnType<typeof Drive>;

export default class DetaUploader implements Uploader {
  #instance: DetaDrive;

  private static connect ({ projectKey }: CD) {
    return Deta(projectKey);
  }

  constructor (key: string, config: CD) {
    const deta = DetaUploader.connect(config);
    this.#instance = deta.Drive(key);
  }

  async upload (name: string, data: string | Buffer, options?: UploadOptions): Promise<string> {
    const url = await this.#instance.put(name, {
      data,
      contentType: options?.contentType,
    });
    return url;
  }

  async get (name: string): Promise<Blob | null> {
    const buf = await this.#instance.get(name);
    return buf;
  }

  async delete (name: string): Promise<string> {
    const deletedFile = await this.#instance.delete(name);
    return deletedFile;
  }

  async list (options?: ListOptions | undefined): Promise<ListReturn> {
    const result = await this.#instance.list(options);
    return {
      names: result.names,
    };
  }
}
