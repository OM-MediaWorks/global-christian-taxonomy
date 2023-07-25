import type { Term } from "@rdfjs/types"

export const lastPart = (term: Term) => {
    return term.value.split('/').pop()
}