// @ts-nocheck
import localStorage from "$app/environment"


const persistentCookiesKey = "PersistentCookies"


/**
 * @param {string} key
 */
export function getPersistentCookie(key){
    const cookie = localStorage.getItem(key)

    if (cookie == null){
        console.warn("Cookie for item:'" + key + "' is undefined")
        return cookie
    }


}


/**
 * @param {string} key
 * @param {string} value
 */
export function setPersistentCookie(key, value){
    const cookie = localStorage.setItem(key, value)

    var persistentCookieNames = peristentCookieNames()
    peristentCookieNames.push(key)
    localStorage.setItem(persistentCookiesKey, JSON.stringify(peristentCookieNames))

}

/**
 * @param {string} key
 */
export function deletePersistentCookie(key){
    localStorage.removeItem(key)

    var persistentCookieNames = peristentCookieNames()
    peristentCookieNames.pop(key)
    localStorage.setItem(persistentCookiesKey, JSON.stringify(peristentCookieNames))
}


export function peristentCookieNames(){
    const cookie = getPersistentCookie(persistentCookiesKey) || "[]" // empty list if null in case values have not yet been previously set

    const cookieAsList = JSON.parse(cookie)
    return cookieAsList
}




//
export async function hasSavedUserSession(){

    if (browser == null){
        return null
    }


    var userSessionCookie = getPersistentCookie('session')
    if (userSessionCookie === null){return null}

    let storedUserSession = JSON.parse(userSessionCookie)

    if (typeof storedUserSession != 'object'){return null}

    const _res = await this.fetch(
        '/auth/login', 
        {
            method: 'POST',
            body: JSON.stringify({UserEmail: storedUserSession.UserEmail, UserPassword: storedUserSession.UserPassword}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )

    const resultData = await _res.json()
    
    if (resultData.ok == false){
        // user no longer exists
        return null
    }

    // Update data stored in cookie to reflect any changes 
    let userDict = resultData.user;
    cookies.set(
        'session', 
        JSON.stringify(userDict), 
        {
            path: "/",
            httpOnly: true,
            sameSite: true
        }
        )


    userSessionCookie = userDict
    loginStatus.set(userDict)

    console.log('session cookie',userDict)
    return userDict

    
    
}





