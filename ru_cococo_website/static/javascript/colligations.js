import {allFeatures, features} from './morphology.js'
import {parts, partsTranslated} from './translations.js'

const langChangeButton = $('#language-switch');

let searchForLemma1 = false;
let searchForLemma2 = false;
let searchForLemma3 = false;
let searchForLemma4 = false;

let amountOfFilters = 2;

let colligations = [[],[],[]]


let lemmaTokenSwitchLemmaEnabledForResultTable = false;


$(document).ready(function () {

    // $('#delete-on-launch').remove();

    addSpinnerOnLoading();

    const filter1 = $('#search-filter1');
    const filter2 = $('#search-filter2');
    const filter3 = $('#search-filter3');
    const filter4 = $('#search-filter4');

    filter3.hide();
    filter4.hide();

    const partSelect1 = $('#part-select1');
    const partSelect2 = $('#part-select2');
    const partSelect3 = $('#part-select3');
    const partSelect4 = $('#part-select4');

    const showFeatsButton1 = $('#show-feats1');
    const showFeatsButton2 = $('#show-feats2');
    const showFeatsButton3 = $('#show-feats3');
    const showFeatsButton4 = $('#show-feats4');

    showFeatsButton1.hide();
    showFeatsButton2.hide();
    showFeatsButton3.hide();
    showFeatsButton4.hide();

    let morphologyFeats1 = $('#filter1');
    let morphologyFeats2 = $('#filter2');
    let morphologyFeats3 = $('#filter3');
    let morphologyFeats4 = $('#filter4');

    const lemmaToggle1 = $('#lemma-toggle1');
    const lemmaToggle2 = $('#lemma-toggle2');
    const lemmaToggle3 = $('#lemma-toggle3');
    const lemmaToggle4 = $('#lemma-toggle4');

    const plusButton = $('#plus-button');
    const minusButton = $('#minus-button');
    const searchButton = $('#search-button');
    const resetButton = $('#reset-button');

    minusButton.hide();

    plusButton.click(function () {
        if (amountOfFilters === 2) {
            amountOfFilters = 3
            filter3.show()
            minusButton.show()
        } else if (amountOfFilters === 3) {
            amountOfFilters = 4
            filter4.show()
            minusButton.show()
            plusButton.hide()
        }
        $('#collocation-results').empty();
    });

    minusButton.click(function () {
        if (amountOfFilters === 4) {
            amountOfFilters = 3
            filter4.hide()
            plusButton.show()
        } else if (amountOfFilters === 3) {
            amountOfFilters = 2
            filter3.hide()
            plusButton.show()
            minusButton.hide()
        }
        $('#collocation-results').empty();
    });

    searchButton.click(search);

    //Search on Enter click
    $('.search-banner').keypress(function (e) {
        if (e.which === 13) {
            searchButton.trigger('click');
            return false;
        }
    });

    resetButton.click(function () {
        location.reload()
    });


    partSelect1.change(() => {
        morphologyFeats1.empty();
        const value = partSelect1.val();
        if (value === 'all') {
            showFeatsButton1.hide();
        }
        else {
            if (value in features) {
                showFeatsButton1.show();
            } else {
                showFeatsButton1.hide();
            }
        }
    });

    partSelect2.change(() => {
        morphologyFeats2.empty();
        const value = partSelect2.val();
        if (value === 'all') {
            showFeatsButton2.hide();
        }
        else {
            if (value in features) {
                showFeatsButton2.show();
            } else {
                showFeatsButton2.hide();
            }
        }
    });

    partSelect3.change(() => {
        morphologyFeats3.empty();
        const value = partSelect3.val();
        if (value === 'all') {
            showFeatsButton3.hide();
        }
        else {
            if (value in features) {
                showFeatsButton3.show();
            } else {
                showFeatsButton3.hide();
            }
        }
    });

    partSelect4.change(() => {
        morphologyFeats4.empty();
        const value = partSelect4.val();
        if (value === 'all') {
            showFeatsButton4.hide();
        }
        else {
            if (value in features) {
                showFeatsButton4.show();
            } else {
                showFeatsButton4.hide();
            }
        }
    });

    lemmaToggle1.click(function () {
        searchForLemma1 = !searchForLemma1;
        console.log(searchForLemma1);
    });

    lemmaToggle2.click(function () {
        searchForLemma2 = !searchForLemma2;
        console.log(searchForLemma2);
    });

    lemmaToggle3.click(function () {
        searchForLemma3 = !searchForLemma3;
        console.log(searchForLemma3);
    });

    lemmaToggle4.click(function () {
        searchForLemma4 = !searchForLemma4;
        console.log(searchForLemma4);
    });

    showFeatsButton1.click(function () {
        drawMorphFeatures(partSelect1, morphologyFeats1);
    });

    showFeatsButton2.click(function () {
        drawMorphFeatures(partSelect2, morphologyFeats2);
    });

    showFeatsButton3.click(function () {
        drawMorphFeatures(partSelect3, morphologyFeats3);
    });

    showFeatsButton4.click(function () {
        drawMorphFeatures(partSelect4, morphologyFeats4);
    });
});

function addSpinnerOnLoading() {
    $(document).on({
        ajaxStart: function () {
            $('body').addClass('loading');
        },
        ajaxStop:  function () {
            $('body').removeClass('loading');
        }
    });
}

function drawMorphFeatures(selectedPart, morphologyFeats) {
    const body = $('body');
    const morphology = $('<div></div>').addClass('morphology-settings-window');
    const morphologyContent = $('<div></div>').addClass('morphology-settings-content');
    const morphologyFilters = $('<div></div>').addClass('morphology-filters');
    const morphologyFooter = $('<div></div>').addClass('morphology-footer');
    const featTable = $('<div></div>').addClass('feat-table').attr('id', 'feat-table');
    morphologyFilters.append(featTable);
    morphologyContent.append(morphologyFilters, morphologyFooter);
    morphology.append(morphologyContent);
    body.append(morphology);

    const availableFeatures = features[selectedPart.val()];
    if (!availableFeatures) {
        console.log('No features available')
    }

    availableFeatures.forEach(feature => {
       const featureDiv = $('<div></div>').attr('style', 'padding: 15px');
       featTable.append(featureDiv);

       featureDiv.append($('<div></div>')
                .text(feature.title)
                .addClass('feature-label'));

       const inputsDiv = $('<div class="features-inputs">');
       featureDiv.append(inputsDiv);

       feature.values.forEach(featureValue => {
           const featureInputDiv = $('<div></div>').addClass('feature-input');
           const id = feature.name + '_' + featureValue.value;
           const input = $('<input>').attr('type', 'checkbox').attr('value', featureValue.value).attr('id', id).attr('name', feature.name);

           const inputLabel = $('<label>').attr('for', id);
           inputLabel.text(featureValue.title);
           featureInputDiv.append(input, inputLabel);

           inputsDiv.append(featureInputDiv)
       });
    });
    const morphologyButtons = $('<div></div>').addClass('morphology-buttons')
    const enterButton = $('<div></div>').addClass('co-button enter-button').attr('id', 'morphology-enter-button').text('Ок');
    const cancelButton = $('<div></div>').addClass('co-button cancel-button').attr('id', 'morphology-cancel-button').text('Отмена');
    morphologyButtons.append(enterButton, cancelButton);
    morphologyFooter.append(morphologyButtons);

    cancelButton.click(function () {
        $('#feat-table input:checkbox').prop('checked', false);
    });

    enterButton.click(function () {
        morphologyFeats.text(getFeats());
        morphology.remove();
    });
}

function getFeats() {
    let selectedFilters = [];
    $('#feat-table input:checkbox:checked').each(function () {
        let input = {
            name:  $(this).attr('name'),
            value: $(this).val()
        }
        selectedFilters.push(input);
    });
    console.log(selectedFilters);

    let result = selectedFilters.reduce(function (r, a) {
        r[a.name] = r[a.name] || [];
        r[a.name].push(a.value);
        return r;
    }, Object.create(null));

    let resultQuery = '';
    for (const item in result) {
        resultQuery = resultQuery + item + ':' + result[item].join(',') + ';'
    }

    return resultQuery;
}

function search() {
    const word1 = $('#word1').val().trim();
    const word2 = $('#word2').val().trim();
    const word3 = $('#word3').val().trim();
    const word4 = $('#word4').val().trim();

    // console.log(word1, word2, word3, word4);

    const part1 = $('select[name=part1]').val();
    const part2 = $('select[name=part2]').val();
    const part3 = $('select[name=part3]').val();
    const part4 = $('select[name=part4]').val();

    // console.log(part1, part2, part3, part4);

    const filter1 = $('#filter1').text();
    const filter2 = $('#filter2').text();
    const filter3 = $('#filter3').text();
    const filter4 = $('#filter4').text();

    // console.log(filter1, filter2, filter3, filter4);

    $.ajax({
        url:    '/public/api/colligations/search',
        type:   'GET',
        data:   {
            word1:  word1,
            part1:  part1,
            filter1:   filter1,
            isLemma1: searchForLemma1,
            word2:  word2,
            part2:  part2,
            filter2:   filter2,
            isLemma2: searchForLemma2,
            word3:  word3,
            part3:  part3,
            filter3:   filter3,
            isLemma3: searchForLemma3,
            word4: word4,
            part4: part4,
            filter4: filter4,
            isLemma4: searchForLemma4,
            nGrams: amountOfFilters,
            advanced: true,
        },
        timeout: 60 * 1000,
        success: function (result) {
            const collocationResultsDiv = $('#colligation-results');
            // collocationResultsDiv.empty();  // clear prev results

            colligations = result;

            if (colligations.every(item => item.length === 0)) {
                console.log("Collocations not found");
                return;
            }

            drawPartsTable();
            drawBigramTable();

            // let unigram_places = []
            // if (word1 === '') {unigram_places.push(1)}
            // if (amountOfFilters >= 2 && word2 === '') {unigram_places.push(2)}
            // if (amountOfFilters >= 3 && word3 === '') {unigram_places.push(3)}
            // if (amountOfFilters === 4 && word4 === '') {unigram_places.push(4)}
            //
            // drawResults(collocationResultsDiv, unigram_places.length, unigram_places)


        }
    }).fail(function (jqXHR, textStatus) {
        if (textStatus === 'timeout') {
            alert('Превышен лимит времени на выполнение запроса');
            //do something. Try again perhaps?
        }
    });
}

function drawPartsTable() {
    const items = colligations[0];
    const partDiv = $('#part-colligation');
    partDiv.empty();

    // Starting opacity (e.g., 1.0 for 100% opacity)
    const startingOpacity = 1.0;

    for (let item = 0; item < items.length; item++) {
        const tbody = $('<tbody></tbody>').attr('id', 'Part' + item);
        tbody.attr('collapsed', true);
        partDiv.append(tbody);
        let part = items[item];

        // Calculate the new opacity, decreasing by ~5% each iteration
        let opacity = startingOpacity - (item * 0.05);

        let parameterRow = $('<tr>').attr('style', 'background-color: rgba(77, 181, 183, ' + opacity + '); border-bottom: 0.2px solid black; border-top: 0.2px solid black;').addClass('colligation-feature');
        parameterRow.append($('<td style="width: 20%"></td>')
                    .append($('<div>')
                    .text(part[1][0]['part'])));

        const kld = part[1][0]['kld'];
        const jsd = part[1][0]['jsd'];



        parameterRow.append($('<td style="width: 20%">').text('KLD = ' + kld));
        parameterRow.append($('<td style="width: 20%">').text('JSD = ' + jsd));
        parameterRow.append($('<td style="width: 20%">'));

        tbody.append(parameterRow);

        tbody.click(function () {
            if (tbody.attr('collapsed') === "true") {
                drawKldResultTable(item);
                tbody.attr('collapsed', false);
            } else {
                $(`#Part${item} > tr:not(:first)`).remove();
                tbody.attr('collapsed', true);
            }
        })
        $(`#part-colligation > tbody:first-child`).trigger('click');
    }



}

function drawKldResultTable(item) {
    const tbody = $(`#Part${item}`);
    $(`#Part${item} > tr:not(:first)`).remove();

    let colligationData = colligations[0][item][1][0];


    colligationData.colligations.forEach(feature => {

        // Add Feature Header
        let featuresHeaderRaw = $('<tr>');
        featuresHeaderRaw.addClass('featureHeaderRaw');

        featuresHeaderRaw.append($('<td>'));
        featuresHeaderRaw.append($('<td>').text('Частота в корпусе'));
        featuresHeaderRaw.append($('<td>').text('Частота слова'));
        featuresHeaderRaw.append($('<td>').text('Отношение частот'));
        tbody.append(featuresHeaderRaw);


        feature.feature_values.forEach(param => {
            let global = param.globalCount ? param.globalCount : 0;
            let actual = param.actualCount ? param.actualCount : 0;
            let divide = actual === 0 ? 0 : actual / global;
            let newRow = $('<tr>');
            newRow.append($('<td>')
                    .addClass('featureValue')
                    .text(param.feature_value));

            newRow.append($('<td class="padding-left: 3px;">')
                    .append('<span>')
                    .text(global));

            newRow.append($('<td>')
                    .text(actual));

            newRow.append($('<td>')
                    .text((divide).toFixed(7)));

            tbody.append(newRow);
        })


        // Add Parameter Row
        let parameterRow = $('<tr>');
        parameterRow.addClass('featureRow')

        parameterRow.append($('<td>')
                .append('<span>')
                .text(feature.feature));

        parameterRow.append($('<td>')
                .append('<span>')
                .text('(KLD = ' + feature.kld + ')'));

        parameterRow.append($('<td>')
                .append('<span>')
                .text('(JSD = ' + feature.jsd + ')'));

        tbody.append(parameterRow);

    });
}

const checkboxStates = ['TSCORE', 'DICE', 'MI']

// Set checkbox marks based on stored states
function setCheckboxMarks(measureType) {
    for (let measure in checkboxStates) {
        console.log(checkboxStates[measure])
        console.log(measureType)
        $('input[name="sortByRank"][id="' + checkboxStates[measure] + '"]').prop('checked', checkboxStates[measure] === measureType);
    }
}


// Bigrams table
function drawBigramTable(measureType = 'TSCORE',isLemmas = false) {
    const items = isLemmas ? groupWordsByLemma() :colligations[0];
    const bigramDiv = $('#colligation-words');
    bigramDiv.empty();

    const table = $('<table></table>').attr('id', 'bigramTable').addClass('bigramTable');

    const tbodyHeader = $('<tbody></tbody>').attr('id', 'bigramTableHeader');

    createBigramResultTableHeader(tbodyHeader);
    // sortResponseWords(measureType, words);

    table.append(tbodyHeader);

    sortResponseWords(measureType, items);

    items.forEach(item => {
        const tbody = $('<tbody></tbody>').attr('id', 'part_' + item[0]);
        let visibleColumns = 7;
        let partHeader = $('<tr class="bigram-part-header"></tr>');
        partHeader.append($('<td>').append('<b>').append('<span>').text(item[0]));
        tbody.attr('collapsed', true);
        for (let i = 0; i < visibleColumns; i++) {
            partHeader.append($('<td>').append('<b>').append('<span>'));
        }

        tbody.append(partHeader);
        const bigramData = item[1][1]
        table.append(tbody);

        partHeader.click(function () {
            if (tbody.attr('collapsed') === "true") {
                drawBigrams(tbody, bigramData);
                tbody.attr('collapsed', false);
            } else {
                $(`#part_${item[0]} > tr:not(:first)`).remove();
                tbody.attr('collapsed', true);
            }
        })
    });

    bigramDiv.append(table);
    addLemmaTokenTableSwitch(measureType);
    setCheckboxMarks(measureType);
    $(`#bigramTable > tbody:nth-child(2) > tr:first-child`).trigger('click');
}

function groupWordsByLemma() {
    function createLemmaFromToken(token) {
        let lemma = JSON.parse(JSON.stringify(token));
        lemma.word = token.lemma;
        return lemma;
}
    const groupedByLemma = [];
    colligations[0].forEach(colligation => {
        const part = colligation[0]
        const features = colligation[1][0]
        const words = colligation[1][1]

        let lemmas = []

        words.forEach(word => {
            let existingLemma = lemmas.find(o => o.word === word.lemma)
            if (!existingLemma) {
                lemmas.push(createLemmaFromToken(word))
            } else {
                existingLemma.cvalue += word.cvalue;
                existingLemma.ngramFreq += word.ngramFreq;
                existingLemma.wordFreq += word.wordFreq;
            }
        })
        groupedByLemma.push([part, [features, lemmas]])
    })
    return groupedByLemma
}

function addLemmaTokenTableSwitch(measureType) {
    $('.tokenLemmaSwitch').click(function () {
        tokenLemmaSwitch(measureType);
    })
}

function tokenLemmaSwitch(measureType) {
    lemmaTokenSwitchLemmaEnabledForResultTable = !lemmaTokenSwitchLemmaEnabledForResultTable
    drawBigramTable(measureType, lemmaTokenSwitchLemmaEnabledForResultTable);
}

function drawBigrams(tbody, bigramData) {
    let startIndex = 0;
    const wordsLimit = 15;

    let moreTerm;

    if (langChangeButton.attr('data-lang') === 'ru') {
        moreTerm = 'Больше'
    } else {
        moreTerm = 'More'
    }

    function addBigrams(startIndex) {
        const endIndex = Math.min(startIndex + wordsLimit, bigramData.length);
        for (let i = startIndex; i < endIndex; i++) {
            const bigram = bigramData[i]
            const wordToDisplay = lemmaTokenSwitchLemmaEnabledForResultTable ? bigram.lemma : bigram.word;
            let tr = $('<tr>').attr('unigramId', bigram.unigramId).attr('style', 'padding: 9px');
            tr.append($('<td>').append('<span>').addClass('wordPart').text(wordToDisplay));
            tr.append($('<td>').append('<span>').text(bigram.wordFreq));
            tr.append($('<td>').append('<span>').text(bigram.ngramFreq));
            tr.append($('<td>').append('<span>').text(bigram.rateMap['TSCORE']));
            tr.append($('<td>').append('<span>').text(bigram.rateMap['DICE']));
            tr.append($('<td>').append('<span>').text(bigram.rateMap['MI']));
            tr.append($('<td>').append('<span>').text(bigram.rateMap['RANK'] ? word.rateMap['RANK'] : ''));
            tr.append($('<td>').append('<span>').text(bigram.cvalue === 0 ? '' : bigram.cvalue));
            tbody.append(tr);
        }
        if (endIndex < bigramData.length) {
              // Add "More" button
              tbody.append($('<tr>')
                .append($('<td>')
                  .addClass('words-more-button')
                  .text(moreTerm)
                  .click(function() {
                    $(this).parent().remove(); // Remove the "More" button row
                    addBigrams(endIndex); // Add the next set of words
                  })
                )
              );
        }
    }

    addBigrams(startIndex);
}

function createBigramResultTableHeader(tbody) {
    let tokenTerm, lemmaTerm;

    if (langChangeButton.attr('data-lang') === 'ru') {
        tokenTerm = 'ТОКЕН';
        lemmaTerm = 'ЛЕММА';
    } else {
        tokenTerm = 'TOKEN';
        lemmaTerm = 'LEMMA';
    }

    const row = $('<tr>');

    const tokenLemmaSwitch = $('<td></td>');
    tokenLemmaSwitch.addClass('clickableTD').addClass('tokenLemmaSwitch');

    if (lemmaTokenSwitchLemmaEnabledForResultTable) {
        const tokenLemmaElement = $(`<span class="inactive">${tokenTerm}</span>/<span class="active">${lemmaTerm}</span>`);
        tokenLemmaSwitch.append(tokenLemmaElement);
    } else {
        const tokenLemmaElement = $(`<span class="active">${tokenTerm}</span>/<span class="inactive">${lemmaTerm}</span>`);
        tokenLemmaSwitch.append(tokenLemmaElement);
    }

    row.append(tokenLemmaSwitch);
    row.append($('<td>').append($('<span>').text('Униграма')));
    row.append($('<td>').append($('<span>').text('n-грама')));
    appendMeasureRadioOption(row, 'TSCORE');
    appendMeasureRadioOption(row, 'DICE');
    appendMeasureRadioOption(row, 'MI');
    row.append($('<td>').append($('<span>').addClass('sortByRank').text('Ранг')));
    row.append($('<td>').append($('<span>').text('c-value')));

    // addSortByRankListener();

    tbody.append(row);
}

function appendMeasureRadioOption(row, name) {
    let checked = checkboxStates[name];
    let td = $('<td>')
        .append($('<input>')
                .attr('type', 'checkbox')
                .attr('name', 'sortByRank')
                .attr('id', name)
                .prop('checked', checked))
                .click(function () {
                    drawBigramTable(name, lemmaTokenSwitchLemmaEnabledForResultTable)
                })
        .append($('<label>')
                .attr('style', 'cursor: pointer;')
                .attr('for', name)
                .text(name));
    row.append(td);
}


function sortResponseWords(measureType, wordsToSort) {
    const uppercaseValue = measureType.toUpperCase()
    wordsToSort.forEach(item => {
        const bigramData = item[1][1]
        if (measureType === 'RANK') {
            sortWordsAsc(uppercaseValue, bigramData);
        } else {
            sortWordsDesc(uppercaseValue, bigramData);
        }
    })
}

function sortWordsDesc(measureType, wordsToSort) {
    wordsToSort.sort((a, b) => b.rateMap[measureType] - a.rateMap[measureType])
}

function sortWordsAsc(measureType, wordsToSort) {
    wordsToSort.sort((a, b) => a.rateMap[measureType] - b.rateMap[measureType])
}