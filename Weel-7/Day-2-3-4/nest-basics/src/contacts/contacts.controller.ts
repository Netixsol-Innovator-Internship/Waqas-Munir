import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { ContactDto } from "./dto/contact.dto";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags("Contacts")
@Controller("api/contacts")
export class ContactsController {
  constructor(public contactService: ContactsService) {}

  @Get()
  getAllContact() {
    return this.contactService.getAllContacts();
  }

  @Post()
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        contact: {
          type: "string",
          example: "Waqas",
          description: "This is the name of the contact",
        },
      },
    },
  })
  createContact(@Body() contact: ContactDto) {
    return this.contactService.createContact(contact.contact);
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the contact to retrieve",
    example: 1,
  })
  getContact(@Param("id") id: number) {
    return this.contactService.getContact(id);
  }

  @Patch(":id")
  updateContact(@Body() contact: ContactDto, @Param("id") id: number) {
    return this.contactService.updateContact(id, contact.contact);
  }

  @Delete(":id")
  deleteContact(@Param("id") id: number) {
    return this.contactService.deleteContact(id);
  }
}
