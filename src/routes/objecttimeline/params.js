import { types } from "$lib/ticket.js"
import { timeline } from "$lib/timeline.js"

export var widgetparams = {
    "ObjectTypes": Object.keys(types.$types),
    "TimelineSections": Object.values(timeline.$sections)
}