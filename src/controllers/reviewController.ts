import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";

export const getAllReviews = async (_req: Request, res: Response, next: NextFunction) => {
  try { res.json(await reviewService.getReviews()); } catch (err) { next(err); }
};

export const getReview = async (req: Request, res: Response, next: NextFunction) => {
  try { res.json(await reviewService.getReviewById(Number(req.params.id))); } catch (err) { next(err); }
};

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(201).json(await reviewService.createReview(req.body)); } catch (err) { next(err); }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try { res.json(await reviewService.updateReview(Number(req.params.id), req.body)); } catch (err) { next(err); }
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try { await reviewService.deleteReview(Number(req.params.id)); res.json({ message: "Review deleted" }); } catch (err) { next(err); }
};