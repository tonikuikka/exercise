import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { hedgehogSchema } from "@shared/hedgehog";
import { sql } from "slonik";
import { z } from "zod";

export async function getAllHedgehogs() {
  try {
    const hedgehogs = await getPool().any(
      sql.type(hedgehogSchema)`SELECT id FROM hedgehog`
    );

    return hedgehogs;
  } catch (error) {
    logger.error(error);
  }
}

// TODO: Yksittäisen siilin hakeminen tietokannasta ID:llä

export async function insertHedgehog(hedgehog: any) {
  try {
    const id = await getPool().any(
      sql.type(z.number())`INSERT INTO hedgehog (name, age, gender, lat, lon) VALUES
      (${hedgehog?.name || null}, ${hedgehog?.age || null}, ${hedgehog?.sex || null}, ${hedgehog?.lat || null}, ${hedgehog?.lon || null})
      RETURNING id`
    );
    return id[0];
  } catch (error) {
    logger.error(error);
  }
}
