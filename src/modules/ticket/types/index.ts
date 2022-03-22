import {MessageButton} from "discord.js";

export const openTicket = new MessageButton({
    type: "BUTTON",
    label: "Open Ticket",
    customId: "ticket-open",
    style: "SUCCESS"
})
export const closeButton = new MessageButton({
    style: 'SECONDARY',
    emoji: '❌',
    customId: 'close-ticket'
})
export const addMember = new MessageButton({
    type: "BUTTON",
    label: "Add Member",
    customId: "ticket-add-member",
    style: "SUCCESS"
})

export const removeMember = new MessageButton({
    type: "BUTTON",
    label: "Remove Member",
    customId: "ticket-remove-member",
    style: "DANGER"
})