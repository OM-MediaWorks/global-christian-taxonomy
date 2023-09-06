import grapoi from "grapoi"
import { gct, gctl, rdf, rdfs, schema } from "./namespaces"
import { Literal, Parser, Store } from 'n3'
import type { GrapoiPointer } from '../../types'
import fs from 'fs/promises'
import dedent from "dedent";

const backgroundFallback = 'https://images.unsplash.com/photo-1627444025414-c2d18d30dbd2'

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
    const pointers = grapoi({ dataset: store, term: gctl('Language') }).in([rdf('type')]) as GrapoiPointer
    const categories = await getCategories()

    return Object.fromEntries(pointers.map(pointer => {
        const langCode = pointer.term.value.split('/').pop()!
        const translatedCount = categories.reduce((accumulator, category) => accumulator += (category.labels[langCode] ? 1 : 0), 0)
        const percentage = Math.round(translatedCount / categories.length * 100)
        const label = pointer.out([rdfs('label')]).value
        return [langCode, { label, percentage }]
    }))
}

export const getCategories = async (): Promise<Array<Category>> => {
    const store = await getStore()
    const pointer = grapoi({ dataset: store, term: gct('Category') }).in([rdf('type')]) as GrapoiPointer

    return pointer.map(categoryPointer => {
        return {
            uri: categoryPointer.term.value,
            slug: categoryPointer.term.value.split('/').pop(),
            labels: Object.fromEntries(categoryPointer.out([rdfs('label')]).terms.map(term => ( [(term as Literal).language, term.value ]))),
            image: categoryPointer.out([schema('image')]).value ?? backgroundFallback
        }
    })
}

export const getCategory = async (slug: string | undefined) => {
    const categories = await getCategories()
    return categories.find(category => category.slug === slug)
}

export const getSiteDescriptions = async () => {
    const store = await getStore()
    const pointers = grapoi({ dataset: store, term: gctl('Language') }).in([rdf('type')]) as GrapoiPointer

    return pointers.map(pointer => ({
        description: dedent`${pointer.out([gctl("siteDescription")]).value}`,
        bcp47: pointer.out([gctl("bcp47")]).value,
    }))
}