import Joi from "joi";

export const listingSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().positive().required(),
  location: Joi.string().min(2).max(100).required(),
});

export const reservationSchema = Joi.object({
  listingId: Joi.number().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
  guests: Joi.number().min(1).max(20).required(),
});

export const reviewSchema = Joi.object({
  listingId: Joi.number().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(3).max(500).required(),
});
