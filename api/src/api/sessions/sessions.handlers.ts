import { Response, Request, NextFunction  } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { Session, Sessions, SessionWithId } from './sessions.model';



export async function findAllSessions(req: Request, res: Response<SessionWithId[]>, next: NextFunction) {
  try {
    const sessions = await Sessions.find().toArray();
    res.json(sessions);
  } catch (error) {
    next(error);
  }
}

export async function findOneSession(req: Request<ParamsWithId, SessionWithId>, res: Response<SessionWithId>, next: NextFunction) {
  try {
    const result = await Sessions.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`Session with id "${req.params.id}" not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function CreateSession(req: Request<{}, SessionWithId, Session>, res: Response<SessionWithId>, next: NextFunction) {
  try {
    const insertResult = await Sessions.insertOne(req.body);
    if (!insertResult.acknowledged) throw new Error('Error inserting climb');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);
  }
}

export async function UpdateSession(req: Request<ParamsWithId, SessionWithId, Session>, res: Response<SessionWithId>, next: NextFunction) {
  try {
    const updateResult = await Sessions.findOneAndUpdate({
      _id: new ObjectId(req.params.id),
    }, {
      $set: req.body,
    }, {
      returnDocument: 'after',
    });
    if (!updateResult.value) {
      res.status(404);
      throw new Error(`Session with id "${req.params.id}" not found.`);
    }
    res.status(201);
    res.json(updateResult.value);
  } catch (error) {
    next(error);
  }
}

export async function DeleteSession(req: Request<ParamsWithId, SessionWithId>, res: Response<SessionWithId>, next: NextFunction) {
  try {
    const deletedResult = await Sessions.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!deletedResult.value) {
      res.status(404);
      throw new Error(`Session with id "${req.params.id}" not found.`);
    } 
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}