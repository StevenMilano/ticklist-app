import { Response, Request, NextFunction  } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { User, Users, UserWithId } from './users.model';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import process from 'process';

export async function findAllUsers(req: Request, res: Response<UserWithId[]>, next: NextFunction) {
  try {
    const users = await Users.find().toArray();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request<{}, UserWithId, User>, res: Response<UserWithId>, next: NextFunction) {
  try {
    const foundUser = await Users.findOne({
      userName: req.body.userName,
    });
    
    if (!foundUser) {
      res.status(404);
      throw new Error(`User "${req.body.userName}" is not found.`);
    }
    const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    if (isMatch) {
      const secret:string = process.env.JWT_SECRET as string;
      const token = jwt.sign({
        _id: foundUser._id?.toString(),
        userName: foundUser.userName,
      }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.json({
        _id: foundUser._id,
        token: token,
        ...req.body,
      });
    } else {
      throw new Error('Password is not correct');
    }
  } catch (error) {
    next(error);
  }
}

export async function CreateUser(req: Request<{}, UserWithId, User>, res: Response<UserWithId>, next: NextFunction) {
  try {
    const saltRounds = 10;
    const insertResult = await Users.insertOne({
      firstName: req.body.firstName,
      userName: req.body.userName,
      password: bcrypt.hashSync(req.body.password, saltRounds), 
      climbEntry_id: req.body.climbEntry_id,
      sessionEntry_id: req.body.sessionEntry_id,
      ticklist_id: req.body.ticklist_id,
    });
    if (!insertResult.acknowledged) throw new Error('Error creating account');
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
      throw new Error(`User "${req.body.userName}" is not found.`);
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
      throw new Error(`User "${req.body.userName}" is not found.`);
    } 
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}