require("dotenv/config");
import { v4 } from "uuid";
import { adminCollection } from "../models/admin";
import encryption from "../utils/encryption";

/**
 * INFO
 * You can run this file with ts-node or bun
 * @example
 * bun seeders/admin.ts up / bun run seed:bun:up
 * ts-node seeders/admin.ts up / ts-node run seed:ts-node:up
 *
 * Or
 *
 * you can compile first
 * @example
 * tsc && node build/seeders/admin.js up / node build/seeders/admin.js up
 */

const email = "test@example.com";
const password = "@Test1234";

(async () => {
  switch (process.argv[2]) {
    case "up": {
      if (
        await adminCollection
          .where("email", "==", email)
          .get()
          .then((docs) => docs.empty)
      )
        await adminCollection.add({
          email,
          password: encryption.hashData(password),
          id: v4(),
        });
      break;
    }
    case "down": {
      await adminCollection
        .where("email", "==", email)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            doc.ref.delete();
          });
        });
      break;
    }
  }
})();
