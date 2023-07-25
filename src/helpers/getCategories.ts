import grapoi from "grapoi"
import { gct, gctl, rdf, rdfs } from "./namespaces"
import { Literal, Parser, Store } from 'n3'
import type { GrapoiPointer } from '../../public/types'
import fs from 'fs/promises'

type Category = { 
    uri: string, 
    slug: string, 
    labels: {
        [key: string]: string
    }
}

const getStore = async () => {
    const parser = new Parser()
    const data = await fs.readFile('taxonomy.ttl', { encoding: 'utf8' })
    const quads = await parser.parse(data)

    const store = new Store()
    store.addQuads(quads)
    return store
}

export const getLanguages = async () => {
    const store = await getStore()
    const pointers = grapoi({ dataset: store, term: gctl('Language') })
    .in([rdf('type')]) as GrapoiPointer

    return Object.fromEntries(pointers.map(pointer => {
        const langCode = pointer.term.value.split('/').pop()
        const label = pointer.out([rdfs('label')]).value
        return [langCode, label]
    }))
}

export const getCategories = async (): Promise<Array<Category>> => {
    const store = await getStore()

    const pointer = grapoi({ dataset: store, term: gct('Category') })
        .in([rdf('type')]) as GrapoiPointer

    return pointer.map(categoryPointer => {
        return {
            uri: categoryPointer.term.value,
            slug: categoryPointer.term.value.split('/').pop(),
            labels: Object.fromEntries(categoryPointer.out([rdfs('label')]).terms
                .map(term => ( [(term as Literal).language, term.value ])))
        }
    })
}

export const getCategory = async (slug: string | undefined) => {
    const categories = await getCategories()
    return categories.find(category => category.slug === slug)
}