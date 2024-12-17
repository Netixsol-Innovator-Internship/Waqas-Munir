import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./entity/contact.entities";
import { Repository } from "typeorm";

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  async getAllContacts() {
    const contacts = await this.contactRepository.find();
    return contacts;
  }

  async createContact(contact: string) {
    const newContact = this.contactRepository.create({
      contact,
      id: Math.floor(Math.random() * 100000),
    });
    await this.contactRepository.save(newContact);
    return newContact;
  }

  async getContact(id: number) {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) throw new NotFoundException("Contact Not Found");
    return contact;
  }

  async updateContact(id: number, contact: string) {
    const updatedContact = await this.contactRepository.findOne({
      where: { id },
    });
    if (!updatedContact) throw new NotFoundException("Contact Not Found");
    updatedContact.contact = contact;
    await this.contactRepository.save(updatedContact);
    return updatedContact;
  }

  async deleteContact(id: number) {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) throw new NotFoundException("Contact Not Found");
    await this.contactRepository.remove(contact);
    return contact;
  }
}
