import * as schema from "~/server/db/schema";
import { pgGenerate } from "drizzle-dbml-generator";

const out = "./schema.dbml";
const relational = true;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
pgGenerate({ schema, out, relational });
console.log("✅ Created the schema.dbml file");
console.log("⏳ Creating the erd.svg file");
