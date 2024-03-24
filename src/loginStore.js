import { writable } from "svelte/store";
import { setPersistentCookie } from "./routes/cookie";
import { browser } from "$app/environment";

/// Keeps track of uer login state

const loginStatus = writable({})

export default loginStatus


