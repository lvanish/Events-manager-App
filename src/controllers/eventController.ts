import { Request, Response } from "express";
import Event, { IEvent } from "../models/Event";

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events: IEvent[] = await Event.find();
    res.status(200).json({ events });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const event: IEvent | null = await Event.findById(id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json({ event });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const event: IEvent = new Event({
      ...req.body,
      createdBy: userId,
    });
    const savedEvent: IEvent = await event.save();
    res.status(200).json({ savedEvent });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const event: IEvent | null = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    if (event.createdBy.toString() !== userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ updatedEvent });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const event: IEvent | null = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    if (event.createdBy.toString() !== userId) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
