// [Fullstack Convention Center] (https://fsa-crud-2aa9294fe819.herokuapp.com/api)
// [API documentation](https://fsa-crud-2aa9294fe819.herokuapp.com/api/#tag/Events)

// Constants
const baseURL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const cohortCode = "/2504-FTB-ET-WEB-PT";
const resource = "/events";
const API = baseURL + cohortCode + resource;

// State
let partyAll = [];
let party = {};

// Renders All Party
async function getPartyAll() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    partyAll = result.data;
    renderAll(partyAll);
  } catch (error) {
    console.error(error.message);
  }
}
getPartyAll();

// Renders Single Party
async function getParty(id) {
  const url = `${API}/${id}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    const getdata = result.data;

    party = {
      name: getdata.name,
      id: getdata.id,
      date: getdata.date,
      description: getdata.description,
      location: getdata.location,
    };

    render(party);
  } catch (error) {
    console.error(error.message);
  }
}

// app HTML structure
const app = document.getElementById("app");
app.innerHTML = `
<div id="apiContents">
<h1 id="header">Party Planner</h1>
<div id="upcomingParty"><h3>Upcoming Party</h3></div>
<div id="partyDetails"></div>
</div>
`;

// Renders All Parties Data to DOM
function renderAll(partyAll) {
  const upcomingParty = document.getElementById("upcomingParty");

  // Creates a button for each arry name
  partyAll.forEach((partyAll) => {
    const buttonElm = document.createElement("button");
    buttonElm.textContent = partyAll.name;

    // * I still dont understand how this works
    buttonElm.addEventListener("click", () => {
      getParty(partyAll.id);
    });
    upcomingParty.append(buttonElm);
  });

  // * Had help with this - I dont understand it
  getParty(partyAll[0]?.id);
}

// Renders Single Party Data to DOM
function render(party) {
  const partyDetails = document.getElementById("partyDetails");
  partyDetails.innerHTML = `
    <h3>Party Details</h3>
    <div id="details">
        <h4>${party.name}</h4>
        <p>${party.date}<br/>${party.location}</p>
        <i>${party.description}</i>
    </div>
`;
}
