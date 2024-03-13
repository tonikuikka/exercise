import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { hedgehogSchema, Hedgehog } from "@shared/hedgehog";
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

export async function getHedgehog(id: number) {
  try {
    const hedgehog = await getPool().any(
      sql.type(hedgehogSchema)`SELECT name, age, gender, lat, lon FROM hedgehog WHERE id = ${id} LIMIT 1`
    );
    return hedgehog[0];
  } catch (error) {
    logger.error(error);
  }
}

export async function insertHedgehog(hedgehog: Hedgehog) {
  try {
    const id = await getPool().any(
      sql.type(z.number())`INSERT INTO hedgehog (name, age, gender, lat, lon) VALUES
      (${hedgehog?.name ?? null}, ${hedgehog?.age ?? null}, ${hedgehog?.gender ?? null}, ${hedgehog?.lat ?? null}, ${hedgehog?.lon ?? null})
      RETURNING id`
    );
    return id[0];
  } catch (error) {
    logger.error(error);
  }
}
