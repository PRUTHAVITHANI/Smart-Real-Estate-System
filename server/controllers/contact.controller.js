// controllers/contact.controller.js

import Contact from "../models/contact.model.js";

export const createContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });

    const savedContact = await newContact.save();

    res.status(201).json({ message: "Contact created successfully", contact: savedContact });
  } catch (error) {
    next(error)
  }
};


