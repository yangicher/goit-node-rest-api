import Contact from "../db/models/Contact.js";

export const listContacts = async (owner, page, limit) => {
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const offset = (pageNumber - 1) * limitNumber;
  return Contact.findAll({
    where: { owner },
    limit: limitNumber,
    offset: offset,
  });
};

export const getContactById = (contactId) => Contact.findByPk(contactId);

export async function removeContact(contactId) {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.destroy();
  return contact;
}

export async function addContact(name, email, phone, owner) {
  const newContact = await Contact.create({ name, email, phone, owner });
  return newContact;
}

export const updateContact = async (contactId, data) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.update(data);
  return contact;
};

export const updateStatusContact = async (contactId, favorite) => {
  return updateContact(contactId, { favorite });
};
