import { writable } from "svelte/store";

/// Keeps track of uer login state

const loginStatus = writable({})

export default loginStatus
