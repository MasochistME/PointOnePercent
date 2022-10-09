import { Request, Response } from 'express';
import { Race } from '@masochistme/sdk/dist/v2/types';

import { log } from 'helpers/log';
import { connectToDb } from 'helpers/db';

export const createRace = async (
  req: Request<any, Race>,
  res: Response,
): Promise<void> => {
  try {
    const { client, db } = await connectToDb();
    const collection = db.collection<Race>('races');
    const race = req.body; // TODO add validation

    const response = await collection.insertOne(race);

    client.close();

    if (!response.acknowledged) {
      res.status(400).send({ error: 'Could not create the race.' });
    } else {
      res.status(201).send(response);
    }
  } catch (err) {
    log.WARN(err);
    res.status(500).send({ error: err.message ?? 'Internal server error' });
  }
};
