import type { PageServerLoad } from '../$types.js';

export const load = (async ({locals}) => {
    const user = await locals.user
    const urlPath = await locals.url.path
    console.log('locals', locals)
    return {'user': user, currentPath: urlPath}
}) satisfies PageServerLoad;