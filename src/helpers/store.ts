import grapoi from "grapoi"
import { gct, gctl, rdf, rdfs, schema } from "./namespaces"
import { Literal, Parser, Store } from 'n3'
import type { GrapoiPointer } from '../../types'
import fs from 'fs/promises'
import dedent from "dedent";
import uniqolor from 'uniqolor';

type Category = { 
    uri: string, 
    slug: string, 
    color: string,
    pointer?: GrapoiPointer,
    searchWords: {
        [key: string]: Array<string>
    },
    labels: {
        [key: string]: string
    }
    descriptions: {
        [key: string]: string
    }
    image: string
}

type Language = {
    label: string,
    percentage: number,
    description: string,
    pointer?: GrapoiPointer,
    bcp47: string,
    translations: {
        [key: string]: string
    },
    background: string,
    welcome: string,
    title: string,
}

const getStore = async () => {
    const parser = new Parser()

    const files = await fs.readdir('./public/taxonomy')

    const store = new Store()
    for (const file of files) {
        const data = await fs.readFile(`./public/taxonomy/${file}`, { encoding: 'utf8' })
        const quads = await parser.parse(data)    
        store.addQuads(quads)
    }

    return store
}

const translationPrefix = gctl().value + 'translation-'

export const getLanguages = async (includePointers = true): Promise<{ [key: string]: Language }> => {
    const store = await getStore()
    const pointers = grapoi({ dataset: store, term: gctl('Language') }).in([rdf('type')]) as GrapoiPointer
    const categories = await getCategories()

    const languages = Object.fromEntries(pointers.map(pointer => {
        const langCode = pointer.term.value.split('/').pop()!
        const translatedCount = categories.reduce((accumulator, category) => accumulator += (category.labels[langCode] ? 1 : 0), 0)
        const percentage = Math.round(translatedCount / categories.length * 100)
        const label = pointer.out([rdfs('label')]).value
        const description = pointer.out([gctl("description")]).value
        const welcome = pointer.out([gctl("welcome")]).value
        const title = pointer.out([gctl("title")]).value
        
        const translations: { [key: string]: string } = {}

        for (const quad of [...pointer.out().quads()]) {
            if (quad.predicate.value.startsWith(translationPrefix)) {
                const translationKey = quad.predicate.value.replace(translationPrefix, '')
                translations[translationKey] = quad.object.value
            }
        }

        const language = [langCode, { 
            label, 
            percentage,
            translations,
            description: description ? dedent`${description}` : '',
            welcome: welcome ? dedent`${welcome}` : '',
            title: title ? dedent`${title}` : '',
            background: pointer.out([gctl('background')]).value,
            bcp47: pointer.out([gctl("bcp47")]).value,
        }]

        if (includePointers) language.pointer = pointer

        return language
    }))

    for (const language of Object.values(languages)) {
        const fallbackProperties = ['background', 'title', 'welcome', 'description']
        for (const fallbackProperty of fallbackProperties) {
            if (!language[fallbackProperty]) language[fallbackProperty] = languages['en'][fallbackProperty]
        }
    }

    return languages
}

export const getCategories = async (includePointers = true): Promise<Array<Category>> => {
    const store = await getStore()
    const pointer = grapoi({ dataset: store, term: gct('Category') }).in([rdf('type')]) as GrapoiPointer

    return pointer.map(categoryPointer => {
        const searchWords: { [key: string]: Array<string> } = {}

        for (const term of categoryPointer.out([gct('searchWords')]).terms) {
            if (!searchWords[(term as Literal).language]) {
                searchWords[(term as Literal).language] = []
            }

            searchWords[(term as Literal).language].push(term.value)
        }
        
        const slug = categoryPointer.term.value.split('/').pop()!

        const category = {
            uri: categoryPointer.term.value,
            color: uniqolor(slug, { lightness: [10, 40] }).color,
            slug,
            searchWords,
            labels: Object.fromEntries(categoryPointer.out([rdfs('label')]).terms.map(term => ( [(term as Literal).language, term.value ]))),
            descriptions: Object.fromEntries(categoryPointer.out([rdfs('comment')]).terms.map(term => ( [(term as Literal).language, term.value ]))),
            image: categoryPointer.out([schema('image')]).value // ?? backgroundFallback
        }

        if (includePointers) category.pointer = categoryPointer

        return category
    })
}

export const getCategory = async (slug: string | undefined) => {
    const categories = await getCategories()
    return categories.find(category => category.slug === slug)
}
