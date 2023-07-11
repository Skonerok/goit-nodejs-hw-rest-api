const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async (contactId) => {
    const allContacts = await listContacts();
    const contact = allContacts.find((item) => item.contactId === contactId);
    return contact || null;
};

const removeContact = async (contactId) => {
    const allContacts = await listContacts();
    const removedContact = allContacts.find((contact) => contact.contactId === contactId);
    if (!removedContact) {
      return null;
    }

    const updatedContacts = allContacts.filter((contact) => contact.contactId !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return removedContact;
};

const addContact = async (body) => {
    const allContacts = await listContacts();
    const newContact = { contactId: nanoid(), ...body };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    
    return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.contactId === contactId);
  if (index === -1) {
    return null;
  };

  allContacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
