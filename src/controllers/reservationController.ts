import { Request, Response, NextFunction } from "express";
import * as reservationService from "../services/reservationService";

export const getAllReservations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const reservations = await reservationService.getReservations();
    res.json(reservations);
  } catch (err) { next(err); }
};

export const getReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation = await reservationService.getReservationById(Number(req.params.id));
    res.json(reservation);
  } catch (err) { next(err); }
};

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation = await reservationService.createReservation(req.body);
    res.status(201).json(reservation);
  } catch (err) { next(err); }
};

export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation = await reservationService.updateReservation(Number(req.params.id), req.body);
    res.json(reservation);
  } catch (err) { next(err); }
};

export const deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await reservationService.deleteReservation(Number(req.params.id));
    res.json({ message: "Reservation deleted" });
  } catch (err) { next(err); }
};