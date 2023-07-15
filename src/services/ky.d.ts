import type { ZodFirstPartySchemaTypes } from 'zod';

declare module 'ky' {
  export interface Options {
    validationSchema?: ZodFirstPartySchemaTypes;
  }

  export interface NormalizedOptions {
    validationSchema?: ZodFirstPartySchemaTypes;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface HTTPError<T = any> {
    responseData?: T;
  }
}
