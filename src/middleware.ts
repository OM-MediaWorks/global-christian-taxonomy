import type { MiddlewareResponseHandler } from 'astro';
import { getLanguages } from './helpers/store';

const languages = await getLanguages()

export const onRequest: MiddlewareResponseHandler = ({ params, locals, url }, next) => {
    let language = params.language

    if (!language) {
        const pathParts = url.pathname.split('/').filter(Boolean)

        if (pathParts[0] in languages) {
            language = pathParts[0]
        }    
    }

    if (!language) language = 'en'

    ;(locals as any).language = language

    return next()
}