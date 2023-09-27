import { getLanguages, getCategories } from "@/helpers/store"

export async function GET() {
    return new Response(
      JSON.stringify({
        categories: await getCategories(),
        languages: await getLanguages()
      }, null, 2)
    )
  }