export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "test" | "production";
      PORT: string;
      SECRET: string;
    }
  }
}
