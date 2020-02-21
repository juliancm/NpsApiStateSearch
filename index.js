let usStates = [
{ name: 'ALABAMA', abbreviation: 'AL'},
{ name: 'ALASKA', abbreviation: 'AK'},
{ name: 'AMERICAN SAMOA', abbreviation: 'AS'},
{ name: 'ARIZONA', abbreviation: 'AZ'},
{ name: 'ARKANSAS', abbreviation: 'AR'},
{ name: 'CALIFORNIA', abbreviation: 'CA'},
{ name: 'COLORADO', abbreviation: 'CO'},
{ name: 'CONNECTICUT', abbreviation: 'CT'},
{ name: 'DELAWARE', abbreviation: 'DE'},
{ name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
{ name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
{ name: 'FLORIDA', abbreviation: 'FL'},
{ name: 'GEORGIA', abbreviation: 'GA'},
{ name: 'GUAM', abbreviation: 'GU'},
{ name: 'HAWAII', abbreviation: 'HI'},
{ name: 'IDAHO', abbreviation: 'ID'},
{ name: 'ILLINOIS', abbreviation: 'IL'},
{ name: 'INDIANA', abbreviation: 'IN'},
{ name: 'IOWA', abbreviation: 'IA'},
{ name: 'KANSAS', abbreviation: 'KS'},
{ name: 'KENTUCKY', abbreviation: 'KY'},
{ name: 'LOUISIANA', abbreviation: 'LA'},
{ name: 'MAINE', abbreviation: 'ME'},
{ name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
{ name: 'MARYLAND', abbreviation: 'MD'},
{ name: 'MASSACHUSETTS', abbreviation: 'MA'},
{ name: 'MICHIGAN', abbreviation: 'MI'},
{ name: 'MINNESOTA', abbreviation: 'MN'},
{ name: 'MISSISSIPPI', abbreviation: 'MS'},
{ name: 'MISSOURI', abbreviation: 'MO'},
{ name: 'MONTANA', abbreviation: 'MT'},
{ name: 'NEBRASKA', abbreviation: 'NE'},
{ name: 'NEVADA', abbreviation: 'NV'},
{ name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
{ name: 'NEW JERSEY', abbreviation: 'NJ'},
{ name: 'NEW MEXICO', abbreviation: 'NM'},
{ name: 'NEW YORK', abbreviation: 'NY'},
{ name: 'NORTH CAROLINA', abbreviation: 'NC'},
{ name: 'NORTH DAKOTA', abbreviation: 'ND'},
{ name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
{ name: 'OHIO', abbreviation: 'OH'},
{ name: 'OKLAHOMA', abbreviation: 'OK'},
{ name: 'OREGON', abbreviation: 'OR'},
{ name: 'PALAU', abbreviation: 'PW'},
{ name: 'PENNSYLVANIA', abbreviation: 'PA'},
{ name: 'PUERTO RICO', abbreviation: 'PR'},
{ name: 'RHODE ISLAND', abbreviation: 'RI'},
{ name: 'SOUTH CAROLINA', abbreviation: 'SC'},
{ name: 'SOUTH DAKOTA', abbreviation: 'SD'},
{ name: 'TENNESSEE', abbreviation: 'TN'},
{ name: 'TEXAS', abbreviation: 'TX'},
{ name: 'UTAH', abbreviation: 'UT'},
{ name: 'VERMONT', abbreviation: 'VT'},
{ name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
{ name: 'VIRGINIA', abbreviation: 'VA'},
{ name: 'WASHINGTON', abbreviation: 'WA'},
{ name: 'WEST VIRGINIA', abbreviation: 'WV'},
{ name: 'WISCONSIN', abbreviation: 'WI'},
{ name: 'WYOMING', abbreviation: 'WY' }
];

function constStateSearch () {
  let inputString ="";

  inputString += `
      <form>
        <fieldset>
          <label for="stateDropdown">Which State?</label>
            <select id="stateDropdown">
    `

    for (let i=0;i<usStates.length;i++) {
      inputString += `<option value="${usStates[i].abbreviation}">${usStates[i].name}</option>`
    };

    inputString += `
            </select>
            <label for="numResults">NumberofResults?</label>
              <select id="numResults">
    `
    for (let i=1;i<10;i++) {
      inputString += `<option value="${i}">${i}</option>`
    };

    inputString += `<option value="10" selected>10</option>`

    for (let i=11;i<31;i++) {
      inputString += `<option value="${i}">${i}</option>`
    };

    inputString += `
            </select>
          <button type="submit" class="stateSearch">Search</button>
        </fieldset>
      </form>
      <div class='displaySearchResultsArea'></div>
    `


  $('.container').html(inputString);

}

apiKey = 'kDkPfS91teEOvc0laDYv2erETG7K3DX8MxDxagyn'

/* https://developer.nps.gov/api/v1/parks?stateCode=FL%2C%20GA&limit=10

https://developer.nps.gov/api/v1/parks?stateCode=FL%2C%20GA&limit=10&api_key=kDkPfS91teEOvc0laDYv2erETG7K3DX8MxDxagyn */




function displayHandleClick () {

    $('.stateSearch').on('click', function(event) {
        event.preventDefault();
          let stateInput = $('#stateDropdown').val();
          let numResultsInput = $('#numResults').val();
            getJson(stateInput, numResultsInput);
    });
}

function getJson (stateInput, numResultsInput) {

  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${stateInput}&limit=${numResultsInput}&api_key=${apiKey}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson =>
      displayJson(responseJson))
    .catch(error => {
        $('.displaySearchResultsArea').html(`<p>${error.message}</p>`);
    });
}



function displayJson (responseJson) {

  $('.displaySearchResultsArea').empty();

  let resultString = ""

  for (i=0; i<responseJson.data.length; i++) {
    resultString += `<p>${responseJson.data[i].fullName}</p>`
  }

  $('.displaySearchResultsArea').append(resultString);

}


constStateSearch();
displayHandleClick ();

/* 'use strict'

function constHandleInput () {

  let inputString ="";

  inputString += `
    <form>
      <fieldset>
      <label for="handleInput">Git Hub Handle:</label>
        <input type="text" id="handledInput">
        <button type="submit" class="searchSubmit">Display</button>
      </fieldset>
    </form>
    <div class='handleDisplayArea'></div>
  `

  $('.container').html(inputString);
}

function displayHandleClick () {

    $('.searchSubmit').on('click', function(event) {
        event.preventDefault();

        if ($('#handledInput').val() === '') {

            alert('please input a handle');

        } else {
          let username = $('#handledInput').val();
            getJson(username);
        }
    });
}

function getJson (username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson =>
      displayJson(responseJson))
    .catch(error => {
        $('.handleDisplayArea').html(`<p>${error.message}</p>`);
    });
}

function displayJson (responseJson) {
  $('.handleDisplayArea').empty();
  for (let i=0; i<responseJson.length; i++) {
  let resultString = ""

  resultString += `<p>${responseJson[i].name}</p><a href="${responseJson[i].clone_url}">${responseJson[i].clone_url}</p>`

  $('.handleDisplayArea').append(resultString);
}
}

constHandleInput();
displayHandleClick ();
*/
