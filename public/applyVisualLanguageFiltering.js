export const applyVisualLanguageFiltering = () => {
    [...document.querySelectorAll('[data-lang-hidable]')]
    .forEach((element) => element.style.display = element.dataset.langHidable !== localStorage.langCode ? 'none' : 'block');
    
    const availableLanguages = [...new Set([...document.querySelectorAll('[data-lang-hidable]')]
        .map(element => element.dataset.langHidable))];

    [...document.querySelectorAll('[data-lang-not_available]')]
    .forEach((element) => element.style.display = !availableLanguages.includes(element.dataset.langNot_available) ? 'none' : 'block')

}

applyVisualLanguageFiltering()

window.refresh = applyVisualLanguageFiltering