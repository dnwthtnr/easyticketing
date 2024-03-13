import type { PageServerLoad } from '../$types.js';

export const load = (async ({locals}) => {
    const user = await locals.user
    console.log('locals', locals)
    return {'user': user}
}) satisfies PageServerLoad;