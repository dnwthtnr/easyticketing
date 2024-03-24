import { killUserSession, getUserSession } from '$lib/server/database/user_actions.js'


export async function load({locals, cookies}){
// implement checking for signout

    const user = locals.user
    const userSession = await getUserSession(user.UserId)

    await killUserSession(userSession.sessionId)
     
    console.log("Logging user out. Deleting session cookie.")
    killUserSession
}