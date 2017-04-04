//check if the page has right title
let assert = require("assert");
suite('Global Test', () => {
    test('У данной страницы допустимый заголовок', () => {
        assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'TODO');
    });
});
