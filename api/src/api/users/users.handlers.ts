import { Response, Request, NextFunction  } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { User, Users, UserWithId } from './users.model';



export async function findAllUsers(req: Request, res: Response<UserWithId[]>, next: NextFunction) {
  try {
    const users = await Users.find().toArray();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function findOneUser(req: Request<ParamsWithId, UserWithId>, res: Response<UserWithId>, next: NextFunction) {
  try {
    const result = await Users.findOne({
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

export async function CreateUser(req: Request<{}, UserWithId, User>, res: Response<UserWithId>, next: NextFunction) {
  try {
    const insertResult = await Users.insertOne(req.body);
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

export async function UpdateUser(req: Request<ParamsWithId, UserWithId, User>, res: Response<UserWithId>, next: NextFunction) {
  try {
    const updateResult = await Users.findOneAndUpdate({
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

export async function DeleteUser(req: Request<ParamsWithId, UserWithId>, res: Response<UserWithId>, next: NextFunction) {
  try {
    const deletedResult = await Users.findOneAndDelete({
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