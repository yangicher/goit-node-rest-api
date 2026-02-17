import contactsService from "../services/contactsServices.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";


export const getAllContacts = async(req, res) => {
    const result = await contactsService.listContacts();
    res.json(result);
};

export const getOneContact = async(req, res) => {
    const {id} = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
};

export const deleteContact = async(req, res) => {
    const {id} = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
};

export const createContact = async(req, res) => {
    const {error} = createContactSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }

    const {name, email, phone} = req.body;
    const result = await contactsService.addContact(name, email, phone);
    res.status(201).json(result);
};

export const updateContact = async(req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw HttpError(400, "Body must have at least one field");
    }
    
    const {error} = updateContactSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }

    const {id} = req.params;
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
        throw HttpError(404, `Not found`);
    }

    res.json(result);
};
