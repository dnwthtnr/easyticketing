

export class User {
    UserId!: number
    UserEmail!: String
    UserName!: string

    CurrentPermissionLevel?: object
    CurrentPermissionLevelId!: number

    UserAuthoredTickets?: object
    UserAssignedTickets?: object

    UserSession?: object

    UserPassword?: null | string

    constructor(){
        this.UserPassword = null
    }

}

export class Session {
    sessionId!: number
    SessionToken!: String
    SessionedUserId!: number
    sessionedUser?: object

}

export class Ticket {
    ticketId!: number
    AuthorUser?: object
    AuthorUserId!: number
    CurrentAssignedUser?: object

    TicketStatus?: object
    CurrentTicketStatusId!: number

    TicketType!: object
    CurrentTicketTypeId!: number


    TicketTitle!: string
    TicketBody!: string
    TicketCreationTime!: string

}

export class Space {
    SpaceId!: number

    SpaceName!: string
    SpaceDescription!: string
    SpaceMembers?: User[]
    SpaceOrganizers?: User[]

    SpaceTickets?: Ticket[]
    PublicPermLevel?: object

    PublicPermLevelId!: number

}



