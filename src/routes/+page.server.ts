import type { Actions, PageServerLoad } from "./$types";
import {prisma} from "$lib/prisma.js"

export const load: PageServerLoad = async () => {
    return {
        users: await prisma.user.findMany()
    }
};

