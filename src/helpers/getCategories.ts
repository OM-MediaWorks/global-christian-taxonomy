import grapoi from "grapoi"
import { gct, gctl, rdf, rdfs, schema } from "./namespaces"
import { Literal, Parser, Store } from 'n3'
import type { GrapoiPointer } from '../../public/types'
import fs from 'fs/promises'

type Category = { 
    uri: string, 
    slug: string, 
    labels: {
        [key: string]: string
    }
    image: string
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

export const getTranslationPercentage = async (langCode:string) => {
    const store = await getStore()
    const pointers = grapoi({ dataset: store, term: gct('Category') })
        .in([rdf('type')]) as GrapoiPointer
    const totalLength = pointers.values.length
    const categories = await getCategories()
    let languageAvailibility = 0
    let i = 0

    while(i <= totalLength-1){
        if (categories[i].labels[langCode] !== undefined) {
            languageAvailibility ++
        }
        i++
    }
    return languageAvailibility = Math.round((languageAvailibility/totalLength) * 100)

}

export const percentageHandler = async (langCode:string, percentage:number) => {
    if (langCode != "en") {
        return ` (${percentage}%)`
    }
    else {
        return ""
    }
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
                .map(term => ( [(term as Literal).language, term.value ]))),
            image: categoryPointer.out([schema('image')]).value ?? 'https://images.unsplash.com/photo-1627444025414-c2d18d30dbd2'
        }
    })
}

export const getCategory = async (slug: string | undefined) => {
    const categories = await getCategories()
    return categories.find(category => category.slug === slug)
}