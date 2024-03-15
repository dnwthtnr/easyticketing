import { browser } from "$app/environment";
import loginStatus from "../loginStore";


export const persistentCookiesKey = "PersistentCookies"


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

    var persistentCookies = peristentCookieNames()
    persistentCookies.push(key)
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
export async function getSavedUserSession(){

    if (browser != true){
        return 
    }

    console.log('browser', browser)


    var userSessionCookie = getPersistentCookie('session')
    if (typeof userSessionCookie === 'undefined'){return null}

    console.log(userSessionCookie, 'cookie', peristentCookieNames)

    let storedUserSession = JSON.parse(userSessionCookie)

    if (typeof storedUserSession != 'object'){return null}

    const _res = await fetch(
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
    // setPersistentCookie('session', JSON.stringify(userDict))


    userSessionCookie = userDict
    loginStatus.set(userDict)

    console.log('session cookie',userDict)
    return userDict

    
    
}





