export const applyVisualLanguageFiltering = () => {
    [...document.querySelectorAll('[data-lang-hidable]')]
    .forEach((element) => element.style.display = element.dataset.langHidable !== localStorage.langCode ? 'none' : 'block');
    
    const availableLanguages = [...new Set([...document.querySelectorAll('[data-lang-hidable]')]
        .map(element => element.dataset.langHidable))];

    [...document.querySelectorAll('[data-lang-not_available]')]
    .forEach((element) => element.style.display = !availableLanguages.includes(element.dataset.langNot_available) ? 'none' : 'block')


    const cards = [...document.querySelectorAll('.card:not(.empty)')]

    cards.forEach(card => card.removeAttribute('style'))

    const filteredCards = cards.filter(card => {
        const hidables = [...card.querySelectorAll('[data-lang-hidable]')]
        const hasVisibleHidables = hidables.filter(hidable => hidable.style.display !== 'none').length
        return !hasVisibleHidables
    })

    filteredCards.forEach(card => card.style.display = 'none')
}

if (!localStorage.langCode) {
    localStorage.langCode = "en"
}

applyVisualLanguageFiltering()

window.refresh = applyVisualLanguageFiltering

