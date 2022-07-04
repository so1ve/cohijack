import type { UploadersConstructed } from "./uploaders";
import uploaders from "./uploaders";
import type { ConfigMapping, SupportedUploaders } from "./types";

type GetModel<T extends SupportedUploaders> = (
  tableName: string,
  config: ConfigMapping[T],
) => UploadersConstructed[T];
function cohijack<T extends SupportedUploaders> (_type: T): GetModel<T> {
  if (!_type) {
    throw new Error("type is required!");
  }

  const type = _type.toLowerCase() as SupportedUploaders;
  const Uploader = uploaders[type];

  if (!Uploader) {
    throw new Error(`${type} service not supports yet!`);
  }

  const getModel = (tableName: string, config: ConfigMapping[T]) => {
    return new Uploader(tableName, config);
  };
  return getModel as GetModel<T>;
}

export default cohijack;
export { cohijack as dittorm };
export * from "./types";
