import { writable } from "svelte/store";
import { setPersistentCookie } from "./routes/cookie";
import { browser } from "$app/environment";

/// Keeps track of uer login state

const loginStatus = writable({})

loginStatus.subscribe((value) => {if (browser == true){setPersistentCookie('session', JSON.stringify(value));console.warn('Updating session cookie');}})

export default loginStatus


