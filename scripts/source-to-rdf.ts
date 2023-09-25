import { slugify } from "https://deno.land/x/slugify/mod.ts";

const source = [
    {
        "Category": "Bible Studies",
        "Description": "Study materials that focus on the Bible as a whole or certain books of the Bible. Can be used for groups or individually.",
        "Synonyms": "religious studies, teaching"
    },
    {
        "Category": "Bibles & Bible Stories",
        "Description": "The Holy Bible, portions of the Bible, and books that are made up of stories from the Bible.",
        "Synonyms": "religious text, Holy Scriptures, the Good Book"
    },
    {
        "Category": "Biographies & Memoirs",
        "Description": "Media sharing a real person's life experiences and story. Either written/told by the individual or by someone else.",
        "Synonyms": "life story, bio, autobiography, diary, account"
    },
    {
        "Category": "Children",
        "Description": "Media created for children. Infant to 13 years old.",
        "Synonyms": "kids, boy, girl, youth, child"
    },
    {
        "Category": "Christian Living",
        "Description": "Media about living out the Christian faith. Encouraging people in their walk with Jesus and helping guide them along the way.",
        "Synonyms": "devotion, divine living, godly living, faithful living"
    },
    {
        "Category": "Comics & Graphic Novels",
        "Description": "Stories that are told through comics art or illustrations in sequential panels to represent the scenes.",
        "Synonyms": "comic strip, animation, cartoon"
    },
    {
        "Category": "Devotionals",
        "Description": "Material that can be used for devotions or quiet time with God. Whether through Biblical passages, prayer, or other encouraging faith-based topics.",
        "Synonyms": "quiet time, religious worship, worship, observance, prayers"
    },
    {
        "Category": "Educational",
        "Description": "Material that teaches/tells you about a certain subject. E.g. religion, the Bible, history, languages, culture, etc.",
        "Synonyms": "informative, learning, teaching, enlightening"
    },
    {
        "Category": "Ethics & Social Issues",
        "Description": "Media that deals with social justice issues and morality in our world and culture from a Christian viewpoint.",
        "Synonyms": "morals, morality, rights and wrongs, ideology, values, equality, social justice"
    },
    {
        "Category": "Family & Relationships",
        "Description": "Material giving advice and/or insight into family dynamics, parenting, and dating/marriage relationships.",
        "Synonyms": "dating, marriage, relation, connection, parenting, household"
    },
    {
        "Category": "Ministry & Evangelism",
        "Description": "Material about sharing the gospel and doing ministry/missions.",
        "Synonyms": "missions, discipleship, sharing the gospel, spreading the word, making disciples"
    },
    {
        "Category": "Novels",
        "Description": "Fictitious stories, mostly for entertainment. This can include stories based on a true story where it dramatizes the events more than it would in a biography.",
        "Synonyms": "fiction, narrative, drama"
    },
    {
        "Category": "Sermons",
        "Description": "A talk or written text on a moral, Biblical, or religious subject shared during a church service or Christian event.",
        "Synonyms": "preaching, talks, speech, lesson, teaching, homily, oration"
    },
    {
        "Category": "Spiritual & Personal Growth",
        "Description": "Media that helps a person grow spiritually and/or personally. Drawing them closer to God through spiritual disciplines, encouragements, and teachings. Giving insight into different sins and temptations people will encounter and how a person can overcome them.",
        "Synonyms": "self-growth, personal development, spirituality, personal enrichment, spiritual development, improvement"
    },
    {
        "Category": "Study Materials",
        "Description": "Learning materials that help in the further study of something. Whether that is the Bible or another topic. E.g. Bible reference, workbook, dictionary, etc.",
        "Synonyms": "learning material, teaching aid, teaching material, learning resources"
    },
    {
        "Category": "Support & Counseling",
        "Description": "Material for people going through difficult times or struggling with something in their life. This media can help them overcome their issues and encourage them through the hard times. ",
        "Synonyms": "help, advising, encouragement, therapy, direction"
    },
    {
        "Category": "Teens & Young Adults",
        "Description": "Media created for teenagers and young adults.",
        "Synonyms": "teenagers, YA, adolescents, minors, youth, juvenile, boy, girl, "
    },
    {
        "Category": "Theology",
        "Description": "Media that helps a person gain a deeper understanding of God, faith, religion, and the message of the gospel according to the Bible.",
        "Synonyms": "belief, faith, doctrine, religion, philosophy, divinity"
    }
]

let englishFile = `@prefix gct: <http://taxonomy.mediaworks.global/>.
@prefix gctl: <http://taxonomy.mediaworks.global/language/>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.

`

let coreFile = `@prefix gct: <http://taxonomy.mediaworks.global/>.
@prefix schema: <https://schema.org/>.

`

for (const item of source) {
    const slug = slugify(item['Category'], { lower: true })
    const englishLabel = item['Category']
    const englishDescription = item['Description']
    const englishSynonyms = item['Synonyms'].split(',').map(item => item.trim()).filter(Boolean)

englishFile += `gct:${slug}
    rdfs:label """${englishLabel}"""@en ;
    rdfs:comment """${englishDescription}"""@en ;
    gct:searchWords ${englishSynonyms.map(englishSynonym => `"${englishSynonym}"@en`). join(', ')} .

`

coreFile += `gct:${slug} a gct:Category .
`
}

Deno.writeTextFileSync('../public/taxonomy/en.ttl', englishFile)
Deno.writeTextFileSync('../public/taxonomy/core.ttl', coreFile)