import type { BlankNode, Literal, Quad, Variable, NamedNode, Term } from '@rdfjs/types'

export type GrapoiPointer = {
  in: (predicates?: Array<NamedNode>, objects?: Array<NamedNode>) => GrapoiPointer
  out: (predicates?: Array<NamedNode | null>, subjects?: Array<NamedNode>) => GrapoiPointer,
  hasOut: (predicates?: Array<NamedNode | null>, subjects?: Array<NamedNode>) => GrapoiPointer
  deleteOut: (predicates?: Array<any> | any, objects?: Array<any> | any) => GrapoiPointer,
  addOut: (predicates?: Array<any> | any, objects?: Array<any> | any) => GrapoiPointer,
  quads: () => Array<Quad>
  trim(): GrapoiPointer
  distinct(): GrapoiPointer
  values: Array<any>
  map: (callback: (item: GrapoiPointer) => any) => Array<any>,
  filter: (callback: (item: GrapoiPointer) => boolean) => Array<GrapoiPointer>,
  value: any
  isList: () => Boolean,
  list: () => Array<GrapoiPointer>
  ptrs: Array<any>
  clone: (data: any) => GrapoiPointer  
  node: (pointers?: Array<any>) => GrapoiPointer
  execute: (paths: Array<any>) => GrapoiPointer
  replace: (replacement: any) => GrapoiPointer
  term: Term
  terms: Array<Term>
  [Symbol.iterator]: () => Iterator<GrapoiPointer>
}