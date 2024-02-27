import {prisma} from "$lib/prisma.js"


export const users = (async() => {
    const users = await prisma.user.findMany({where: {email: 'dunworthtanner@gmail.com'}})
    return await {body: users}
})

