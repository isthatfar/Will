// STEPS
// Functions to navigate between steps
function goToStep1() {
  showStep(1)
}
function goToStep2() {
  updateWillOptions()
  showStep(2)
}
function goToStep3() {
  showStep(3)
}
function goToStep4() {
  showStep(4)
}
function goToStep5() {
  showStep(5)
}
function goToStep6() {
  populateGiftRecipientList()
  showStep(6)
}
function goToStep7() {
  populateResidualEstateDivisionList()
  showStep(7)
}
function goToStep8() {
  populateContingencyList()
  showStep(8)
}
function goToStep9() {
  populateExecutorOptions()
  showStep(9)
}
function goToStep10() {
  showStep(10)
}
function goToStep11() {
  showStep(11)
}
function goToStep12() {
  showStep(12)
}
function goToStep13() {
  showStep(13)
}
function goToStep14() {
  showStep(14)
}
function goToStep15() {
  populateReviewPage()
  showStep(15)
}

// STEPS + PROGRESS BAR
// Define the total number of steps in your form
const totalSteps = 15

function showStep(stepNumber) {
  const steps = document.querySelectorAll('div[id^="step"]')
  // Hide all steps
  steps.forEach((step) => {
    step.classList.remove("visible")
    step.classList.add("hidden")
  })
  // Show the current step
  const currentStep = document.getElementById(`step${stepNumber}`)
  currentStep.classList.remove("hidden")
  currentStep.classList.add("visible")
  // Update the progress bar
  updateProgressBar(stepNumber)
}

function updateProgressBar(stepNumber) {
  const progressBar = document.getElementById("progressBar")
  const progressPercentage = (stepNumber / totalSteps) * 100
  // Update the width of the progress bar
  progressBar.style.width = `${progressPercentage}%`
  progressBar.setAttribute("aria-valuenow", progressPercentage)
}

// STEP 2
// Functions for dynamic data population
function updateWillOptions() {
  const relationship = document.querySelector(
    'input[name="relationship"]:checked',
  )
  const willOptionsDiv = document.getElementById("willOptions")
  willOptionsDiv.innerHTML = ""

  if (
    relationship &&
    (relationship.value === "Single" || relationship.value === "Widowed")
  ) {
    willOptionsDiv.innerHTML = `
      <div class="form-check">
        <input type="radio" id="whoNeedsWillJustMe" name="whoNeedsWill" value="Just me">
        <label class="form-check-label" for="whoNeedsWillJustMe">
            <h5>Just me (£99)</h5>
            <p>If your partner already has a will and doesn't need to update it</p>
          </div>
        </label>
      </div>
    `
  } else if (relationship) {
    willOptionsDiv.innerHTML = `
      <div class="form-check">
        <input type="radio" id="whoNeedsWillJustMe" name="whoNeedsWill" value="Just me">
       <label class="form-check-label" for="whoNeedsWillJustMe">
            <h5>Just me (£99)</h5>
            <p>If your partner already has a will and doesn't need to update it</p>
          </div>
        </label>
      </div>
      <div class="form-check">
        <input type="radio" id="whoNeedsWillPartner" name="whoNeedsWill" value="Me and my partner">
        <label class="form-check-label" for="whoNeedsWillPartner">
            <h5>Me and my partner (£149)</h5>
            <p>If you are married, partnered, or just with someone</p>
          </div>
        </label>
      </div>
    `
  }
}

// STEP 4 - FOREIGN ASSETS
// Show the foreign asset inclusion question when "Yes" is selected
function showForeignAssetQuestion() {
  document.getElementById("foreignAssetInclude").classList.remove("hidden")
}

// Hide the foreign asset inclusion question when "No" is selected
function hideForeignAssetQuestion() {
  document.getElementById("foreignAssetInclude").classList.add("hidden")
}

// STEP 5 - BENEFICIARIES
let beneficiaryCount = 0
let charityCount = 0

// Function to add a beneficiary
function addBeneficiary() {
  const beneficiaryDiv = document.createElement("div")
  beneficiaryDiv.id = `beneficiary${beneficiaryCount}`
  beneficiaryDiv.classList.add("mt-3")

  beneficiaryDiv.innerHTML = `
          <div class="form-group">
              <label for="beneficiaryName${beneficiaryCount}">
              <input type="text" class="form-control" name="beneficiaryName" id="beneficiaryName${beneficiaryCount}" placeholder="Full name"></label>
          </div>
  
          <div class="form-group">
              <label for="beneficiaryRelationship${beneficiaryCount}">
              <select name="beneficiaryRelationship" class="form-control" id="beneficiaryRelationship${beneficiaryCount}"></label>
                  <option value="Select">Relationship to you</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Civil partner">Civil partner</option>
                  <option value="Partner">Partner</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Son">Son</option>
                  <option value="Grandson">Grandson</option>
                  <option value="Granddaughter">Granddaughter</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
              </select>
          </div>
  
          <div class="form-group">
              <label for="beneficiaryAddress${beneficiaryCount}">
              <input type="text" class="form-control" name="beneficiaryAddress" id="beneficiaryAddress${beneficiaryCount}" placeholder="Address or city"></label>
          </div>
  
          <button class="btn btn-danger" onclick="removeBeneficiary(${beneficiaryCount})">Remove Beneficiary</button>
          <hr>
      `

  document.getElementById("beneficiaryList").appendChild(beneficiaryDiv)
  beneficiaryCount++
}

// Function to remove a beneficiary
function removeBeneficiary(id) {
  const beneficiaryDiv = document.getElementById(`beneficiary${id}`)
  beneficiaryDiv.remove()
}

// Function to add a charity
function addCharity() {
  const charityDiv = document.createElement("div")
  charityDiv.id = `charity${charityCount}`
  charityDiv.classList.add("mt-3")

  charityDiv.innerHTML = `
          <div class="form-group">
              <label for="charityName${charityCount}"><input type="text" class="form-control" name="charityName" id="charityName${charityCount}" placeholder="Name of the charity"></label>
          </div>
  
          <div class="form-group">
              <label for="charityAddress${charityCount}"><input type="text" class="form-control" name="charityAddress" id="charityAddress${charityCount}" placeholder="Address or city"></label>
          </div>
  
          <button class="btn btn-danger" onclick="removeCharity(${charityCount})">Remove Charity</button>
          <hr>
      `

  document.getElementById("charityList").appendChild(charityDiv)
  charityCount++
}

// Function to remove a charity
function removeCharity(id) {
  const charityDiv = document.getElementById(`charity${id}`)
  charityDiv.remove()
}

// Function to dynamically populate gift recipients (beneficiaries and charities)
function populateGiftRecipientList() {
  const giftRecipientList = document.getElementById("giftRecipientList");
  giftRecipientList.innerHTML = ""; // Clear previous content

  // Gather all beneficiary and charity names
  const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');
  const charities = document.querySelectorAll('input[name="charityName"]');

  // Create a list for beneficiaries
  if (beneficiaries.length > 0) {
      beneficiaries.forEach((beneficiary, index) => {
          const recipientDiv = document.createElement("div");
          recipientDiv.classList.add("mt-3");
          recipientDiv.innerHTML = `
              <h4>${beneficiary.value}</h4>
              <div id="giftDetailsBeneficiary${index}" class="mt-3"></div>
              <button class="btn btn-outline-primary" onclick="addGift(${index}, 'beneficiary')">Add a new gift for ${beneficiary.value}</button>
          `;
          giftRecipientList.appendChild(recipientDiv);
      });
  }

  // Create a list for charities
  if (charities.length > 0) {
      charities.forEach((charity, index) => {
          const recipientDiv = document.createElement("div");
          recipientDiv.classList.add("mt-3");
          recipientDiv.innerHTML = `
              <h4>${charity.value}</h4>
              <div id="giftDetailsCharity${index}" class="mt-3"></div>
              <button class="btn btn-outline-primary" onclick="addGift(${index}, 'charity')">Add a new gift for ${charity.value}</button>
          `;
          giftRecipientList.appendChild(recipientDiv);
      });
  }
}

// STEP 6 - GIFTS
//Function to add a gift for a recipient (either beneficiary or charity)
let giftCounters = { beneficiary: {}, charity: {} }; // Track gift counts separately

function addGift(index, type) {
    const giftDiv = document.getElementById(`giftDetails${capitalizeFirstLetter(type)}${index}`);
    const recipientName = type === "beneficiary" ? "Beneficiary" : "Charity";

    if (!giftCounters[type][index]) {
        giftCounters[type][index] = 0;
    }

    const giftId = giftCounters[type][index]++;
    const newGiftDiv = document.createElement("div");
    newGiftDiv.id = `giftDiv${type}${index}${giftId}`;
    newGiftDiv.classList.add("mt-3");

    newGiftDiv.innerHTML = `
        <label>Select a gift type:</label><br>
        <div class="form-check">
            <input type="radio" id="giftCash${type}${index}${giftId}" name="giftType${type}${index}${giftId}" value="cash" onchange="showGiftDetails(${index}, ${giftId}, '${type}', 'cash')">
            <label class="form-check-label" for="giftCash${type}${index}${giftId}">Cash</label>
        </div>
        <div class="form-check">
            <input type="radio" id="giftProperty${type}${index}${giftId}" name="giftType${type}${index}${giftId}" value="property" onchange="showGiftDetails(${index}, ${giftId}, '${type}', 'property')">
            <label class="form-check-label" for="giftProperty${type}${index}${giftId}">Property</label>
        </div>
        <div class="form-check">
            <input type="radio" id="giftCollection${type}${index}${giftId}" name="giftType${type}${index}${giftId}" value="collection" onchange="showGiftDetails(${index}, ${giftId}, '${type}', 'collection')">
            <label class="form-check-label" for="giftCollection${type}${index}${giftId}">Collection of items</label>
        </div>
        <div class="form-check">
            <input type="radio" id="giftItem${type}${index}${giftId}" name="giftType${type}${index}${giftId}" value="item" onchange="showGiftDetails(${index}, ${giftId}, '${type}', 'item')">
            <label class="form-check-label" for="giftItem${type}${index}${giftId}">Item</label>
        </div>

        <div id="giftDetails${type}${index}${giftId}" class="gift-details mt-2"></div>
        <button class="btn btn-danger mt-2" onclick="removeGift(${index}, ${giftId}, '${type}')">Remove Gift</button>
        <hr>
    `;
    giftDiv.appendChild(newGiftDiv);
}

// Function to handle gift details based on the selected type
function showGiftDetails(index, giftId, type, giftType) {
    const giftDetailsDiv = document.getElementById(`giftDetails${type}${index}${giftId}`);
    giftDetailsDiv.innerHTML = ''; // Clear previous content

    if (giftType === 'cash') {
        giftDetailsDiv.innerHTML = `
            <label for="cashAmount${type}${index}${giftId}">Cash Amount:</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">£</span>
                </div>
                <input type="number" class="form-control" id="cashAmount${type}${index}${giftId}" name="cashAmount${type}${index}${giftId}" placeholder="Enter amount">
            </div>
        `;
    } else if (giftType === 'property') {
        giftDetailsDiv.innerHTML = `
            <label for="propertyAddress${type}${index}${giftId}">Property Address:</label>
            <input type="text" id="propertyAddress${type}${index}${giftId}" name="propertyAddress${type}${index}${giftId}" class="form-control" placeholder="Enter property address">
            <label for="propertyPercentage${type}${index}${giftId}" class="mt-2">Percentage:</label>
            <input type="number" class="form-control" id="propertyPercentage${type}${index}${giftId}" name="propertyPercentage${type}${index}${giftId}" placeholder="Enter percentage">
        `;
    } else if (giftType === 'collection') {
        giftDetailsDiv.innerHTML = `
            <label for="collectionDescription${type}${index}${giftId}">Collection Description:</label>
            <input type="text" id="collectionDescription${type}${index}${giftId}" name="collectionDescription${type}${index}${giftId}" class="form-control" placeholder="Describe the collection">
        `;
    } else if (giftType === 'item') {
        giftDetailsDiv.innerHTML = `
            <label for="itemDescription${type}${index}${giftId}">Item Description:</label>
            <input type="text" id="itemDescription${type}${index}${giftId}" name="itemDescription${type}${index}${giftId}" class="form-control" placeholder="Describe the item">
        `;
    }
}

// Function to remove a gift
function removeGift(index, giftId, type) {
    const giftDiv = document.getElementById(`giftDiv${type}${index}${giftId}`);
    giftDiv.remove();
}


// STEP 7 - RESIDUAL ESTATE
function populateResidualEstateDivisionList() {
  const divisionList = document.getElementById("residualEstateDivisionList");
  divisionList.innerHTML = ""; // Clear previous content

  const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');
  const charities = document.querySelectorAll('input[name="charityName"]');

  // Add inputs for beneficiaries
  beneficiaries.forEach((beneficiary, index) => {
      const div = document.createElement("div");
      div.classList.add("form-group", "mt-3");
      div.innerHTML = `
          <label for="beneficiaryPercentage${index}">${beneficiary.value}:</label>
          <div class="input-group">
              <input type="number" class="form-control" name="beneficiaryPercentage${index}" min="0" max="100" value="0" oninput="calculateTotalPercentage()">
              <div class="input-group-append">
                  <span class="input-group-text">%</span>
              </div>
          </div>`;
      divisionList.appendChild(div);
  });

  // Add inputs for charities
  charities.forEach((charity, index) => {
      const div = document.createElement("div");
      div.classList.add("form-group", "mt-3");
      div.innerHTML = `
          <label for="charityPercentage${index}">${charity.value}:</label>
          <div class="input-group">
              <input type="number" class="form-control" name="charityPercentage${index}" min="0" max="100" value="0" oninput="calculateTotalPercentage()">
              <div class="input-group-append">
                  <span class="input-group-text">%</span>
              </div>
          </div>`;
      divisionList.appendChild(div);
  });
}

// Function to calculate total percentage
function calculateTotalPercentage() {
  let total = 0;

  // Sum the percentages from beneficiaries
  const beneficiaryPercentages = document.querySelectorAll('input[name^="beneficiaryPercentage"]');
  beneficiaryPercentages.forEach((input) => {
      total += parseFloat(input.value || 0);
  });

  // Sum the percentages from charities
  const charityPercentages = document.querySelectorAll('input[name^="charityPercentage"]');
  charityPercentages.forEach((input) => {
      total += parseFloat(input.value || 0);
  });

  // Display the total percentage
  document.getElementById("totalPercentage").value = total.toFixed(2) + "%";

  return total; // Return the total percentage
}

// Validate that the total percentage equals 100%
function validatePercentage() {
  const total = calculateTotalPercentage(); // Get the total percentage

  // Allow for a small floating-point margin (e.g., 99.99 - 100.01)
  if (Math.abs(total - 100) <= 0.01) {
      document.getElementById("percentageError").classList.add("hidden");
      goToStep8(); // Proceed to the next step
  } else {
      document.getElementById("percentageError").classList.remove("hidden");
  }
}







// STEP 8 - CONTINGENCY
function populateContingencyList() {
  const contingencyList = document.getElementById("contingencyList")
  if (!contingencyList) {
    console.error("Contingency list container not found.")
    return
  }

  contingencyList.innerHTML = "" // Clear previous content

  const beneficiaries = document.querySelectorAll(
    'input[name="beneficiaryName"]',
  )

  if (beneficiaries.length > 0) {
    beneficiaries.forEach((beneficiary, index) => {
      const contingencyDiv = document.createElement("div")
      contingencyDiv.innerHTML = `
                  <h4>${beneficiary.value}</h4>
                  <label>What should happen to ${beneficiary.value}'s share if they pass away before you?</label><br>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" id="contingencyChildren${index}" name="contingency${index}" value="children">
                      <label for="contingencyChildren${index}" class="form-check-label">Children</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" id="contingencySpouse${index}" name="contingency${index}" value="spouse">
                      <label for="contingencySpouse${index}" class="form-check-label">Spouse</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" id="contingencyShare${index}" name="contingency${index}" value="share" onclick="hideSpecificPersonFields(${index})">
                      <label for="contingencyShare${index}" class="form-check-label">Distribute with others beneficiaries</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" id="contingencySpecific${index}" name="contingency${index}" value="specific" onclick="showSpecificPersonFields(${index})">
                      <label for="contingencySpecific${index}" class="form-check-label">Specific Person</label>
                  </div>
                  <div id="specificPersonFields${index}" class="hidden mt-3">
                    <input type="text" class="form-control mt-2" name="specificFullName${index}" placeholder="Full Name">
                    <select name="specificRelationship${index}" class="form-control mt-2">
                        <option value="Select">Relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Civil partner">Civil partner</option>
                        <option value="Partner">Partner</option>
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Son">Son</option>
                        <option value="Grandson">Grandson</option>
                        <option value="Granddaughter">Granddaughter</option>
                        <option value="Great grandson">Great grandson</option>
                        <option value="Great granddaughter">Great granddaughter</option>
                        <option value="Niece">Niece</option>
                        <option value="Nephew">Nephew</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" class="form-control mt-2" name="specificAddress${index}" placeholder="Address or City">
                </div>
              `
      contingencyList.appendChild(contingencyDiv)
    })
  } else {
    console.warn("No beneficiaries found to populate contingency.")
    contingencyList.innerHTML =
      "<p>No beneficiaries available to set contingency for.</p>"
  }
}

function showSpecificPersonFields(index) {
    document.getElementById(`specificPersonFields${index}`).classList.remove('hidden');
}

function hideSpecificPersonFields(index) {
    document.getElementById(`specificPersonFields${index}`).classList.add('hidden');
}








// STEP 9 - EXECUTOR
function populateExecutorOptions() {
  const executorList = document.getElementById("executorList");
  executorList.innerHTML = "";

  // Option for Swiftwills
  executorList.innerHTML += `
      <div class="form-check">
          <input type="checkbox" id="swiftwills" name="executor" value="Swiftwills">
          <label class="form-check-label" for="swiftwills">Swiftwills</label>
      </div>
  `;

  // Options for beneficiaries as executors (from Step 5)
  const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');
  beneficiaries.forEach((beneficiary, index) => {
      executorList.innerHTML += `
          <div class="form-check">
              <input type="checkbox" id="executor${index}" name="executor" value="${beneficiary.value}">
              <label class="form-check-label" for="executor${index}">${beneficiary.value}</label>
          </div>
      `;
  });

  // Option for someone else
  executorList.innerHTML += `
      <div class="form-check">
          <input type="checkbox" id="someoneElse" name="executor" value="someoneElse" onclick="toggleAdditionalExecutorFields(this)">
          <label class="form-check-label" for="someoneElse">Someone else</label>
      </div>
      <div id="additionalExecutorFields" class="hidden mt-3">
          <input type="text" class="form-control mt-2" name="executorFullName" placeholder="Full Name">
          <select name="executorRelationship" class="form-control mt-2">
              <option value="Select">Relationship</option>
              <option value="Spouse">Spouse</option>
              <option value="Civil partner">Civil partner</option>
              <option value="Partner">Partner</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Daughter">Daughter</option>
              <option value="Son">Son</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
          </select>
          <input type="text" class="form-control mt-2" name="executorAddress" placeholder="Address or City">
      </div>
  `;
}

// Function to toggle the additional executor fields when 'Someone else' is selected
function toggleAdditionalExecutorFields(checkbox) {
  const additionalExecutorFields = document.getElementById('additionalExecutorFields');
  if (checkbox.checked) {
      additionalExecutorFields.classList.remove('hidden');
  } else {
      additionalExecutorFields.classList.add('hidden');
  }
}



// STEP 10 - CHILDREN
// Show or hide children fields based on user selection (Children under 18)
function showChildrenFields() {
  document.getElementById("childrenFields").classList.remove("hidden")
}

function hideChildrenFields() {
  document.getElementById("childrenFields").classList.add("hidden")
  document.getElementById("executorFields").classList.add("hidden")
  document.getElementById("guardianFields").classList.add("hidden")
}

// Show executor-related fields when "Yes" is selected for managing inheritance
function showExecutorFields() {
  document.getElementById("executorFields").classList.remove("hidden")
  populateChildrenUnder18List() // Populate child beneficiaries dynamically
}

// Hide executor-related fields if "No" is selected
function hideExecutorFields() {
  document.getElementById("executorFields").classList.add("hidden")
}

// Populate the list of children under 18 (from the beneficiary list)
function populateChildrenUnder18List() {
  const childList = document.getElementById("childrenUnder18List")
  childList.innerHTML = "" // Clear any existing content

  // Pull beneficiary names dynamically from Step 5 (Beneficiaries)
  const beneficiaries = document.querySelectorAll(
    'input[name="beneficiaryName"]',
  )
  if (beneficiaries.length > 0) {
    beneficiaries.forEach((beneficiary, index) => {
      const checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.name = `childBeneficiary${index}`
      checkbox.value = beneficiary.value
      checkbox.id = `childBeneficiary${index}`
      checkbox.classList.add("form-check-input")

      const label = document.createElement("label")
      label.htmlFor = `childBeneficiary${index}`
      label.textContent = beneficiary.value
      label.classList.add("form-check-label")

      childList.appendChild(checkbox)
      childList.appendChild(label)
      childList.appendChild(document.createElement("br")) // Line break between checkboxes
    })
  } else {
    childList.innerHTML = "No beneficiaries available to select."
  }
}

// Show or hide guardian fields based on user input
function showGuardianFields() {
  document.getElementById("guardianFields").classList.remove("hidden")
}

function hideGuardianFields() {
  document.getElementById("guardianFields").classList.add("hidden")
}

// Add multiple guardian fields dynamically
let guardianCount = 0
function addGuardian() {
  const guardianDiv = document.createElement("div")
  guardianDiv.id = `guardian${guardianCount}`
  guardianDiv.classList.add("mb-3")

  guardianDiv.innerHTML = `
          <label for="guardianFullName${guardianCount}" class="form-label"</label><br>
          <input type="text" name="guardianFullName${guardianCount}" placeholder="Enter full name" class="form-control"><br>
  
          <label for="guardianRelationship${guardianCount}" class="form-label"></label>
          <select name="guardianRelationship${guardianCount}" class="form-select">
                <option value="Select">Relationship</option>
                <option value="Spouse">Spouse</option>
                <option value="Civil partner">Civil partner</option>
                <option value="Partner">Partner</option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Daughter">Daughter</option>
                <option value="Son">Son</option>
                <option value="Grandson">Grandson</option>
                <option value="Granddaughter">Granddaughter</option>
                <option value="Great grandson">Great grandson</option>
                <option value="Great granddaughter">Great granddaughter</option>
                <option value="Niece">Niece</option>
                <option value="Nephew">Nephew</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
          </select><br>
  
          <label for="guardianAddress${guardianCount}" class="form-label"></label>
          <input type="text" name="guardianAddress${guardianCount}" placeholder="Enter address or city" class="form-control"><br>
  
          <button class="btn btn-danger" onclick="removeGuardian(${guardianCount})">Remove Guardian</button><br><br>
      `

  document.getElementById("guardianList").appendChild(guardianDiv)
  guardianCount++
}

// Remove guardian
function removeGuardian(id) {
  const guardianDiv = document.getElementById(`guardian${id}`)
  guardianDiv.remove()
}

// STEP 11 - PETS
// Show or hide pet caretaker fields based on user input (Has Pets)
function showPetFields() {
  document.getElementById("petFields").classList.remove("hidden")
}

function hidePetFields() {
  document.getElementById("petFields").classList.add("hidden")
  document.getElementById("additionalPetCaretaker").classList.add("hidden")
  document.getElementById("leaveMoneyAmount").classList.add("hidden")
}

// Show additional fields when "Someone else" is selected for pet caretaker
function showAdditionalExecutorFields() {
  document.getElementById("additionalPetCaretaker").classList.remove("hidden")
}

// Hide additional fields if executors are chosen to care for pets
function hideAdditionalExecutorFields() {
  document.getElementById("additionalPetCaretaker").classList.add("hidden")
}

// Show or hide the leave money amount input based on user selection (Leave Money for Pets)
function showLeaveMoneyAmount() {
  document.getElementById("leaveMoneyAmount").classList.remove("hidden")
}

function hideLeaveMoneyAmount() {
  document.getElementById("leaveMoneyAmount").classList.add("hidden")
}

// STEP 15 - REVIEW
// Function to populate the review page dynamically with data from earlier steps
// Function to populate the review page dynamically with data from earlier steps
// Function to populate the review page dynamically with data from earlier steps
function populateReviewPage() {
    // Clear previous review content
    document.getElementById("reviewGeneralInfo").innerHTML = "";
    document.getElementById("reviewGifts").innerHTML = "";
    document.getElementById("reviewResiduaryEstate").innerHTML = "";
    document.getElementById("reviewExecutors").innerHTML = "";
    document.getElementById("reviewChildren").innerHTML = "";
    document.getElementById("reviewPets").innerHTML = "";
    document.getElementById("reviewDigitalAssets").innerHTML = "";

    // Step 1: General Information (including address)
    const firstName = document.getElementById("firstName")?.value || "Not provided";
    const lastName = document.getElementById("lastName")?.value || "Not provided";
    const address1 = document.getElementById("address1")?.value || "Not provided";
    const address2 = document.getElementById("address2")?.value || "";
    const city = document.getElementById("city")?.value || "Not provided";
    const postcode = document.getElementById("postcode")?.value || "Not provided";
    const email = document.getElementById("email")?.value || "Not provided";
    const relationshipStatus = document.querySelector('input[name="relationship"]:checked')?.value || "Not provided";

    // Populate general info section
    document.getElementById("reviewGeneralInfo").innerHTML = `
        <strong>Full Name:</strong> ${firstName} ${lastName}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Relationship Status:</strong> ${relationshipStatus}<br>
        <strong>Address:</strong> ${address1}, ${address2} ${city}, ${postcode}
    `;

    // Step 5 & Step 6: Beneficiaries and Gifts (Include specific gifts for beneficiaries and charities)
   // Clear previous review content
   document.getElementById("reviewGifts").innerHTML = "";

   let giftsReview = "<h3>Beneficiaries</h3>";
   const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');
   
   beneficiaries.forEach((beneficiary, index) => {
       giftsReview += `<strong>Beneficiary:</strong> ${beneficiary.value}<br>`;
       const gifts = getGiftDetailsForRecipient(index, 'beneficiary');

       if (gifts.length > 0) {
           giftsReview += "<strong>Gifts:</strong><br>";
           gifts.forEach((gift, giftIndex) => {
               giftsReview += `Gift ${giftIndex + 1}: ${gift.giftInfo}<br>`;
           });
       } else {
           giftsReview += "<strong>Gifts:</strong> None<br>";
       }
       giftsReview += "<br>";  // Add space between beneficiaries
   });

   giftsReview += "<h3>Charities</h3>";
   const charities = document.querySelectorAll('input[name="charityName"]');
   
   charities.forEach((charity, index) => {
       giftsReview += `<strong>Charity:</strong> ${charity.value}<br>`;
       const gifts = getGiftDetailsForRecipient(index, 'charity');

       if (gifts.length > 0) {
           giftsReview += "<strong>Gifts:</strong><br>";
           gifts.forEach((gift, giftIndex) => {
               giftsReview += `Gift ${giftIndex + 1}: ${gift.giftInfo}<br>`;
           });
       } else {
           giftsReview += "<strong>Gifts:</strong> None<br>";
       }
       giftsReview += "<br>";  // Add space between charities
   });

   document.getElementById("reviewGifts").innerHTML = giftsReview;

    // Step 7: Residuary Estate
    const totalPercentage = document.getElementById("totalPercentage")?.value || "0%";
    let residuaryReview = `Total Residuary Estate: ${totalPercentage}<br>`;

    const beneficiaryPercentages = document.querySelectorAll('input[name^="beneficiaryPercentage"]');
    beneficiaryPercentages.forEach((input, index) => {
        const beneficiary = beneficiaries[index]?.value || "Not provided";
        residuaryReview += `${beneficiary}: ${input.value}%<br>`;
    });

    const charityPercentages = document.querySelectorAll('input[name^="charityPercentage"]');
    charityPercentages.forEach((input, index) => {
        const charity = charities[index]?.value || "Not provided";
        residuaryReview += `${charity}: ${input.value}%<br>`;
    });

    document.getElementById("reviewResiduaryEstate").innerHTML = residuaryReview;

    // Step 9: Executors
   // Clear previous review content
   document.getElementById("reviewExecutors").innerHTML = "";

   // Executors Review
   let executorsReview = `<strong>Executors:</strong><br>`;
   const selectedExecutors = [];

   document.querySelectorAll('input[name="executor"]:checked').forEach((executor) => {
       if (executor.value === 'someoneElse') {
           const additionalExecutorName = document.querySelector('input[name="executorFullName"]')?.value || 'Not provided';
           const additionalExecutorRelationship = document.querySelector('select[name="executorRelationship"]')?.value || 'Not provided';
           const additionalExecutorAddress = document.querySelector('input[name="executorAddress"]')?.value || 'Not provided';

           executorsReview += `Name: ${additionalExecutorName}, Relationship: ${additionalExecutorRelationship}, Address: ${additionalExecutorAddress}<br>`;
       } else {
           executorsReview += `Name: ${executor.value}<br>`;
       }
   });

   document.getElementById("reviewExecutors").innerHTML = executorsReview;

    // Step 10: Children and Guardianship
    const hasChildren = document.querySelector('input[name="hasChildren"]:checked')?.value || "Not provided";
    let childrenInfo = hasChildren === "yes" ? "Children under 18: Yes" : "No children under 18.";
    if (hasChildren === "yes") {
        const childrenManagement = document.querySelector('input[name="manageInheritance"]:checked')?.value || "Not provided";
        childrenInfo += `<br>Manage inheritance: ${childrenManagement}`;
        const guardians = document.querySelectorAll('input[name^="guardianFullName"]');
        if (guardians.length > 0) {
            childrenInfo += `<br><strong>Guardians:</strong><br>`;
            guardians.forEach((guardian, index) => {
                const guardianName = guardian?.value || "Not provided";
                const guardianRelationship = document.querySelector(`select[name="guardianRelationship${index}"]`)?.value || "Not provided";
                const guardianAddress = document.querySelector(`input[name="guardianAddress${index}"]`)?.value || "Not provided";
                childrenInfo += `${guardianName}, Relationship: ${guardianRelationship}, Address: ${guardianAddress}<br>`;
            });
        }
    }
    document.getElementById("reviewChildren").innerHTML = childrenInfo;

    // Step 11: Pets
    const hasPets = document.querySelector('input[name="hasPets"]:checked')?.value || "Not provided";
    let petInfo = hasPets === "yes" ? "Has pets: Yes" : "No pets.";
    if (hasPets === "yes") {
        const caretaker = document.querySelector('input[name="petCaretaker"]:checked')?.value || "Not provided";
        petInfo += `<br>Pet caretaker: ${caretaker}`;
        if (caretaker === "someoneElse") {
            const caretakerFullName = document.querySelector('input[name="petCaretakerFullName"]')?.value || "Not provided";
            const caretakerRelationship = document.querySelector('select[name="petCaretakerRelationship"]')?.value || "Not provided";
            const caretakerAddress = document.querySelector('input[name="petCaretakerAddress"]')?.value || "Not provided";
            petInfo += `<br>Caretaker: ${caretakerFullName}, Relationship: ${caretakerRelationship}, Address: ${caretakerAddress}`;
        }
        const leaveMoney = document.querySelector('input[name="leaveMoneyForPets"]:checked')?.value || "Not provided";
        if (leaveMoney === "yes") {
            const petMoneyAmount = document.querySelector('input[name="petMoneyAmount"]')?.value || "Not provided";
            petInfo += `<br>Money left for pets: £${petMoneyAmount}`;
        }
    }
    document.getElementById("reviewPets").innerHTML = petInfo;

    // Step 12: Digital Assets
    const digitalAssets = document.querySelector('input[name="allowDigitalAssets"]:checked')?.value || "Not provided";
    document.getElementById("reviewDigitalAssets").innerHTML = `Allow executor to handle digital assets: ${digitalAssets}`;
}

function getGiftDetailsForRecipient(index, type) {
  const giftDivs = document.querySelectorAll(`#giftDetails${capitalizeFirstLetter(type)}${index} > div`);
  let giftDetails = [];

  giftDivs.forEach((giftDiv, giftIndex) => {
      const giftType = document.querySelector(`input[name="giftType${type}${index}${giftIndex}"]:checked`)?.value || "Not specified";
      let giftInfo = "";

      // Handling different types of gifts
      if (giftType === 'cash') {
          const cashAmount = document.getElementById(`cashAmount${type}${index}${giftIndex}`)?.value || "Not provided";
          giftInfo = `Money: £${cashAmount}`;
      } else if (giftType === 'property') {
          const propertyAddress = document.getElementById(`propertyAddress${type}${index}${giftIndex}`)?.value || "Not provided";
          const propertyPercentage = document.getElementById(`propertyPercentage${type}${index}${giftIndex}`)?.value || "Not provided";
          giftInfo = `Property: ${propertyAddress}, ${propertyPercentage}% of the property`;
      } else if (giftType === 'collection') {
          const collectionDescription = document.getElementById(`collectionDescription${type}${index}${giftIndex}`)?.value || "Not provided";
          giftInfo = `Collection of items: ${collectionDescription}`;
      } else if (giftType === 'item') {
          const itemDescription = document.getElementById(`itemDescription${type}${index}${giftIndex}`)?.value || "Not provided";
          giftInfo = `Item: ${itemDescription}`;
      }

      // Push the gift info to the array if it's valid
      if (giftInfo) {
          giftDetails.push({
              giftType,
              giftInfo
          });
      }
  });

  return giftDetails.length > 0 ? giftDetails : [];
}



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function submitWill() {
    // Collect all the data and submit it, possibly using Firebase as demonstrated in your previous code.
    alert("Your will has been submitted successfully!");
}

