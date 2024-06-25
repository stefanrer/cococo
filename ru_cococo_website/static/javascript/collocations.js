import {allFeatures, features} from './morphology.js'
import {parts, partsTranslated} from './translations.js'

const langChangeButton = $('#language-switch');

let searchForLemma1 = false;
let searchForLemma2 = false;
let searchForLemma3 = false;
let searchForLemma4 = false;

let amountOfFilters = 2;

let resultUnigrams = [[],[],[]]

let lemmaTokenSwitchLemmaEnabledForResultTable = [false, false, false]

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

function search(e) {
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
        url:    '/public/api/collocations/search',
        type:   'GET',
        data:   {
            measureType: 'TSCORE',
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
            advanced: false,
        },
        timeout: 60 * 1000,
        success: function (result) {
            const collocationResultsDiv = $('#collocation-results');
            collocationResultsDiv.empty();  // clear prev results

            resultUnigrams = result;

            if (resultUnigrams.every(item => item.length === 0)) {
                console.log("Collocations not found");
                return;
            }

            let unigram_places = []
            if (word1 === '') {unigram_places.push(1)}
            if (amountOfFilters >= 2 && word2 === '') {unigram_places.push(2)}
            if (amountOfFilters >= 3 && word3 === '') {unigram_places.push(3)}
            if (amountOfFilters === 4 && word4 === '') {unigram_places.push(4)}

            drawResults(collocationResultsDiv, unigram_places.length, unigram_places)
        }
    }).fail(function (jqXHR, textStatus) {
        if (textStatus === 'timeout') {
            alert('Превышен лимит времени на выполнение запроса');
            //do something. Try again perhaps?
        }
    });
}

function drawResults(resultDiv, numTables, unigram_places) {
    for (let table_num = 0; table_num < numTables; table_num++) {
        // Create a new table
        const table = $('<table></table>').attr('id', 'resultTable' + table_num).addClass('resultTable')

        // Create a new tbody for lemma switch
        const tbody = $('<tbody></tbody>');

        // Append the tbody to the table
        table.append(tbody);

        adjustTable(unigram_places[table_num], table.get(0));

        window.addEventListener('resize', () => {
            adjustTable(unigram_places[table_num], table.get(0));
        });

        if (!($(`#tableLemmaToggle${table_num + 1}`).length)) {
            createResultTableHeader(tbody, table_num)
        }

        // Append the table to the div
        resultDiv.append(table).show();

        drawTableResults(table_num)
    }
}

function createResultTableHeader(tbody, table_num = 0) {
    let tokenTerm, lemmaTerm;

    if (langChangeButton.attr('data-lang') === 'ru') {
        tokenTerm = 'ТОКЕН';
        lemmaTerm = 'ЛЕММА';
    } else {
        tokenTerm = 'TOKEN';
        lemmaTerm = 'LEMMA';
    }

    const toggle_id = 'tableLemmaToggle' + `${table_num+1}`;

    const row = $('<tr>');
    const col = $('<td style="padding-left: 0.2em;padding-right: 0.2em;">');
    row.append(col);
    tbody.append(row);
    const toggleBox = $('<div></div>').addClass('toggle-box');
    const toggleWordForm = $('<a></a>').addClass('toggle-wordform').text(`${tokenTerm}`);
    toggleBox.append(toggleWordForm);
    const label = $('<label></label>').addClass('switch');
    toggleBox.append(label);
    const input = $('<input type="checkbox">');
    const slider = $('<span></span>').addClass('slider round').attr('id', `${toggle_id}`);

    // add click function to slider
    slider.click(function ()  {
        tokenLemmaSwitch(table_num);
    })

    label.append(input, slider);
    const toggleLemma = $('<a></a>').addClass('toggle-lemma').text(`${lemmaTerm}`);
    toggleBox.append(toggleLemma);

    col.append(toggleBox);
    lemmaTokenSwitchLemmaEnabledForResultTable[table_num] = false;
}

function tokenLemmaSwitch(table_num) {
    lemmaTokenSwitchLemmaEnabledForResultTable[table_num] = !lemmaTokenSwitchLemmaEnabledForResultTable[table_num];
    drawTableResults(table_num)
}

function drawTableResults(table_num, measureType = 'TSCORE') {
    const table = $('#resultTable' + table_num)
    $('#resultTable' + table_num + ' tbody:not(:first)').remove();
    const maxRate = calculateMaxRate(resultUnigrams[table_num], measureType);
    resultUnigrams[table_num].forEach(item => {
        const partTbody = $('<tbody></tbody>');
        addHeaderRaw(partTbody, item.part, true);
        if (!lemmaTokenSwitchLemmaEnabledForResultTable[table_num]) {
            addWordsToResultTableHeader(partTbody, item.unigrams, maxRate, table_num, measureType)
        } else {
            console.log('Lemmas')
            let unique_lemmas = createUniqueLemmas(item.unigrams, measureType)
            addWordsToResultTableHeader(partTbody, unique_lemmas, maxRate, table_num, measureType)
        }
        table.append(partTbody);
    })
}


function addHeaderRaw(tbody, text, isUpperCase) {
    if (langChangeButton.attr('data-lang') === 'ru') {
        console.log("translate part to ru")
        text = parts[text]
    } else {
        console.log("translate part to en")
        text = partsTranslated[text]
    }
    let clusterHeader = $('<tr>');
    if (isUpperCase) {
        clusterHeader.attr('style', 'text-transform: uppercase;')
    }
    clusterHeader
            .addClass('part-header')
            .append($('<td style="padding-left: 0.1em;">')
                    .append('<b>')
                    .append('<span>')
                    .text(text));
    tbody.append(clusterHeader);
}

function createUniqueLemmas(values, measureType = 'TSCORE') {
    let lemmaDict = {};
        values.forEach(unigram => {
            let lemma = unigram.lemma;
            if (!(lemma in lemmaDict) || unigram.rateMap[measureType] > lemmaDict[lemma].rateMap[measureType]) { //
                lemmaDict[lemma] = unigram;
            }
        })
    // Convert the dictionary values to a list
    return Object.values(lemmaDict)
}

function addWordsToResultTableHeader(tbody, words_to_add, maxRate, table_num, measureType = 'TSCORE') {
    let startIndex = 0;
    const wordsLimit = 15;

    let moreTerm;

    if (langChangeButton.attr('data-lang') === 'ru') {
        moreTerm = 'Больше'
    } else {
        moreTerm = 'More'
    }

    function addWords(startIndex) {
        const endIndex = Math.min(startIndex + wordsLimit, words_to_add.length);
        for (let i = startIndex; i < endIndex; i++) {
          const word = words_to_add[i];
          const wordToDisplay = lemmaTokenSwitchLemmaEnabledForResultTable[table_num] ? word.lemma : word.word;
          const opacity = getOpacity(maxRate, word.rateMap[measureType]);
          tbody.append($('<tr>')
            .attr('unigramId', word.unigramId)
            .attr('style', 'background-color: rgb(77, 181, 183, ' + opacity + '); padding: 9px')
            .addClass('part-body')
            .append($('<td style="padding-left: 0.2em;">')
              .addClass('word-part')
              .append('<span>')
              .text(wordToDisplay))
          );
        }

        if (endIndex < words_to_add.length) {
          // Add "More" button
          tbody.append($('<tr>')
            .append($('<td>')
              .addClass('words-more-button')
              .text(moreTerm)
              .click(function() {
                $(this).parent().remove(); // Remove the "More" button row
                addWords(endIndex); // Add the next set of words
              })
            )
          );
        }
    }

  addWords(startIndex); // Initial call to add the first set of words
}

function getOpacity(maxValue, currentValue) {
    const percents = (currentValue / maxValue);
    return percents ;
}

function calculateMaxRate(list, measureType) {
    const uppercaseValue = measureType.toUpperCase()
    let maxRate = 0
    list.forEach(item => {
        item.unigrams.forEach(word => {
            if (word.rateMap[uppercaseValue] > maxRate) {
                maxRate = word.rateMap[uppercaseValue]
            }
        })
    })
    return maxRate
}

function adjustTable(unigram_place, table) {
    const filter1 = document.getElementById('search-filter1');
    const filter2 = document.getElementById('search-filter2');
    const filter3 = document.getElementById('search-filter3');
    const filter4 = document.getElementById('search-filter4');

    let leftEdge;
    let rightEdge;

    function setEdges(filter) {
        leftEdge = filter.getBoundingClientRect().left + window.scrollX;
        rightEdge = filter.getBoundingClientRect().right + window.scrollX;
    }

    if (unigram_place === 1) {
        setEdges(filter1);
    } else if (unigram_place === 2) {
        setEdges(filter2);
    } else if (unigram_place === 3){
        setEdges(filter3);
    } else {
        setEdges(filter4);
    }

    table.style.position = 'sticky';
    table.style.left = `${leftEdge}px`;
    table.style.width = `${rightEdge - leftEdge}px`;
}