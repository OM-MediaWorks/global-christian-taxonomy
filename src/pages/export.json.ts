import { getLanguages, getCategories } from "@/helpers/store"

export async function GET() {
    return new Response(
      JSON.stringify({
        categories: await getCategories(false),
        languages: await getLanguages(false)
      }, null, 2)
    )
  }