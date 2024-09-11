import dotenv from "dotenv";
import path from "path";
// importing path from nodejs, a built in module

// joining the .env file in current directory ,and setting in path using nodejs path module
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  database_url: process.env.DB_URL,
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_token_secret_key: process.env.JWT_ACCESS_SECRET_KEY,
  jwt_refresh_token_secret_key: process.env.JWT_REFRESH_SECRET_KEY,
  jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
};
