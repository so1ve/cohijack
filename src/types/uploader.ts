import type uploaders from "../uploaders";

export type SupportedUploaders = keyof typeof uploaders;

// export interface SelectOptions {
//   limit?: number
//   offset?: number
//   desc?: string
//   fields?: string[]
// }
// export interface Access {
//   read: boolean
//   write: boolean
// }
export interface UploadOptions {
  contentType?: string
}
export interface ListOptions {
  limit?: number
}
export interface ListReturn {
  names: string[]
}
export interface Config {

}
export interface ConfigMapping {
  leancloud: {
    appId: string
    appKey: string
    masterKey: string
  } & Config
  deta: {
    projectKey: string
  } & Config
}

export abstract class Uploader {
  constructor (_key: string, _config: ConfigMapping[keyof ConfigMapping]) {}
  abstract upload(name: string, data: string | Uint8Array | Buffer, options: UploadOptions): Promise<string>;
  abstract get(name: string): Promise<Blob | null>;
  abstract delete(name: string): Promise<string>;
  abstract list(options?: ListOptions): Promise<ListReturn>;
}
