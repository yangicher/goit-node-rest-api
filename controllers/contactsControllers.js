import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const result = await contactsService.listContacts(owner, page, limit);
    
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, owner } = req.body;
    const result = await contactsService.addContact(name, email, phone, owner);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  try {
    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.updateStatusContact(
      id,
      req.body.favorite,
    );
    if (!result) throw HttpError(404);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};