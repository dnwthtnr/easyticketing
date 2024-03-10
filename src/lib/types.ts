

export class User {
    name: String
    email: String
    permissionLevel: number

    constructor(attributeObject: {

        email: String,
        permissionLevel: number,
        name: String

    }) {
        this.name = attributeObject.name,
        this.email = attributeObject.email,
        this.permissionLevel = attributeObject.permissionLevel
    }

}

export class Session {
    sessionId: number
    sessionToken: String

    constructor(attributeObject: { sessionId: number, sessionToken: String }) {
        this.sessionId = attributeObject.sessionId,
        this.sessionToken = attributeObject.sessionToken
    }

}


