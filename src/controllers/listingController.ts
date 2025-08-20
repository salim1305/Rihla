import { Request, Response, NextFunction } from "express";
import * as listingService from "../services/listingService";

export const getListings = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const listings = await listingService.getAllListings();
    res.json(listings);
  } catch (err) { next(err); }
};

export const getListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listing = await listingService.getListingById(Number(req.params.id));
    res.json(listing);
  } catch (err) { next(err); }
};

export const createListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listing = await listingService.createListing(req.body);
    res.status(201).json(listing);
  } catch (err) { next(err); }
};

export const updateListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listing = await listingService.updateListing(Number(req.params.id), req.body);
    res.json(listing);
  } catch (err) { next(err); }
};

export const deleteListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await listingService.deleteListing(Number(req.params.id));
    res.json({ message: "Listing deleted" });
  } catch (err) { next(err); }
};
