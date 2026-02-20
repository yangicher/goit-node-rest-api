import Contact from "../db/models/Contact.js";

export const listContacts = (owner) => Contact.findAll({ where: { owner } });

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
