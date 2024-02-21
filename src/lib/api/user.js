import {prisma} from "$lib/prisma.js"

export const users = await prisma.user.findMany()