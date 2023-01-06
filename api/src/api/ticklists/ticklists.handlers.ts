import { Response, Request, NextFunction  } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { Ticklist, Ticklists, TicklistWithId } from './ticklists.model';



export async function findAllTicks(req: Request, res: Response<TicklistWithId[]>, next: NextFunction) {
  try {
    const ticks = await Ticklists.find().toArray();
    res.json(ticks);
  } catch (error) {
    next(error);
  }
}

export async function findOneTick(req: Request<ParamsWithId, TicklistWithId>, res: Response<TicklistWithId>, next: NextFunction) {
  try {
    const result = await Ticklists.findOne({
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

export async function CreateTick(req: Request<{}, TicklistWithId, Ticklist>, res: Response<TicklistWithId>, next: NextFunction) {
  try {
    const insertResult = await Ticklists.insertOne(req.body);
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

export async function UpdateTick(req: Request<ParamsWithId, TicklistWithId, Ticklist>, res: Response<TicklistWithId>, next: NextFunction) {
  try {
    const updateResult = await Ticklists.findOneAndUpdate({
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

export async function DeleteTick(req: Request<ParamsWithId, TicklistWithId>, res: Response<TicklistWithId>, next: NextFunction) {
  try {
    const deletedResult = await Ticklists.findOneAndDelete({
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