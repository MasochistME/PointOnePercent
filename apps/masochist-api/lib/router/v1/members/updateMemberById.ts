import { Request, Response } from 'express';
import { log } from '@masochistme/utils';
import { Member } from '@masochistme/sdk/dist/v1/types';

import { mongoInstance } from 'api';

/**
 * Updates a member with given member ID. All of the updatable fields are optional.
 * @param req Request
 * @param res Response
 * @return void
 */
export const updateMemberById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { db } = mongoInstance.getDb();
    const collection = db.collection<Member>('members');
    const { memberId } = req.params;
    const { description, discordId } = req.body; // TODO Add Request<Member> body validation

    const response = await collection.updateOne(
      { $or: [{ discordId: memberId }, { steamId: memberId }] },
      {
        $set: {
          ...(description && { description }),
          ...(discordId && { discordId }),
        },
      },
    );

    if (!response.acknowledged) {
      res.status(400).send({ error: 'Could not update this member.' });
    } else {
      res.status(200).send(response);
    }
  } catch (err: any) {
    log.WARN(err);
    res.status(500).send({ error: err.message ?? 'Internal server error' });
  }
};
