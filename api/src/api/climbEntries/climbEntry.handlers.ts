import { Response, Request, NextFunction  } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { ClimbEntries, ClimbEntry, ClimbEntryWithId } from './climbEntry.model';


export async function findAllClimbEntries(req: Request, res: Response<ClimbEntryWithId[]>, next: NextFunction) {
  try {
    const climbEntries = await ClimbEntries.find().toArray();
    res.json(climbEntries);
  } catch (error) {
    next(error);
  }
}

export async function CreateClimbEntry(req: Request<{}, ClimbEntryWithId, ClimbEntry>, res: Response<ClimbEntryWithId>, next: NextFunction) {
  try {
    const insertResult = await ClimbEntries.insertOne(req.body);
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

export async function findOneClimbEntry(req: Request<ParamsWithId, ClimbEntryWithId, {}>, res: Response<ClimbEntryWithId>, next: NextFunction) {
  try {
    const result = await ClimbEntries.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`Todo with id "${req.params.id}" not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function UpdateClimbEntry(req: Request<ParamsWithId, ClimbEntryWithId, ClimbEntry>, res: Response<ClimbEntryWithId>, next: NextFunction) {
  try {
    const updateResult = await ClimbEntries.findOneAndUpdate({
      _id: new ObjectId(req.params.id),
    }, {
      $set: req.body,
    }, {
      returnDocument: 'after',
    });
    if (!updateResult.value) {
      res.status(404);
      throw new Error(`Todo with id "${req.params.id}" not found.`);
    } 
    res.status(201);
    res.json(updateResult.value);
  } catch (error) {
    next(error);
  }
}

export async function DeleteClimbEntry(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
  try {
    const deletedResult = await ClimbEntries.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!deletedResult.value) {
      res.status(404);
      throw new Error(`Todo with id "${req.params.id}" not found.`);
    } 
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
