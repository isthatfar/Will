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
    willOptionsDiv.innerHTML =
      '<input type="radio" name="whoNeedsWill" value="Just me"> Just me'
  } else if (relationship) {
    willOptionsDiv.innerHTML = `
              <input type="radio" name="whoNeedsWill" value="Just me"> Just me<br>
              <input type="radio" name="whoNeedsWill" value="Me and my partner"> Me and my partner
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
  const giftRecipientList = document.getElementById("giftRecipientList")
  giftRecipientList.innerHTML = "" // Clear previous content

  // Gather all beneficiary and charity names
  const beneficiaries = document.querySelectorAll(
    'input[name="beneficiaryName"]',
  )
  const charities = document.querySelectorAll('input[name="charityName"]')

  // Create a list for beneficiaries
  if (beneficiaries.length > 0) {
    beneficiaries.forEach((beneficiary, index) => {
      const recipientDiv = document.createElement("div")
      recipientDiv.classList.add("mt-3")
      recipientDiv.innerHTML = `
                  <h4>${beneficiary.value}</h4>
                  <div id="giftDetailsBeneficiary${index}" class="hidden mt-3"></div>
                   <button class="btn btn-outline-primary" onclick="addGift(${index}, 'beneficiary')">Add a new gift for ${beneficiary.value}</button>
              `
      giftRecipientList.appendChild(recipientDiv)
    })
  }

  // Create a list for charities
  if (charities.length > 0) {
    charities.forEach((charity, index) => {
      const recipientDiv = document.createElement("div")
      recipientDiv.classList.add("mt-3")
      recipientDiv.innerHTML = `
                  <h4>${charity.value}</h4>
                  <div id="giftDetailsCharity${index}" class="hidden mt-3"></div>
                  <button class="btn btn-outline-primary" onclick="addGift(${index}, 'charity')">Add a new gift for ${charity.value}</button>
              `
      giftRecipientList.appendChild(recipientDiv)
    })
  }
}






// STEP 6 - GIFTS
//Function to add a gift for a recipient (either beneficiary or charity)
let giftCounters = {} // Initialize the gift counter object

function addGift(id, type) {
  const giftDetailsDiv = document.getElementById(
    `giftDetails${type.charAt(0).toUpperCase() + type.slice(1)}${id}`,
  )

  // Remove 'hidden' class to make the gift details section visible
  giftDetailsDiv.classList.remove("hidden")

  // Initialize the gift counter for the recipient if not already initialized
  if (!giftCounters[id]) {
    giftCounters[id] = 0
  }

  // Increment the gift counter for this recipient
  const giftCount = ++giftCounters[id]

  const giftDiv = document.createElement("div")
  giftDiv.id = `giftDiv${id}${giftCount}`
  giftDiv.classList.add("mt-3")
  giftDiv.innerHTML = `
          <div class="form-group">
              <label for="giftType${id}${giftCount}">Select a gift type:</label><br>
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="giftType${id}${giftCount}" value="cash" onclick="showGiftOptions('${id}', ${giftCount}, 'cash', '${type}')"> 
                  <label class="form-check-label">Cash</label>
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="giftType${id}${giftCount}" value="property" onclick="showGiftOptions('${id}', ${giftCount}, 'property', '${type}')">
                  <label class="form-check-label">Property</label>
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="giftType${id}${giftCount}" value="collection" onclick="showGiftOptions('${id}', ${giftCount}, 'collection', '${type}')">
                  <label class="form-check-label">Collection of items</label>
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="giftType${id}${giftCount}" value="item" onclick="showGiftOptions('${id}', ${giftCount}, 'item', '${type}')">
                  <label class="form-check-label">Item</label>
              </div>
          </div>
  
          <div id="giftOptionDetails${id}${giftCount}" class="mt-3"></div>
          <button class="btn btn-danger" onclick="removeGift('${id}', ${giftCount})">Remove Gift</button>
          <hr>
      `

  giftDetailsDiv.appendChild(giftDiv) // Append the new gift
}

// Function to remove a gift
function removeGift(id, giftCount) {
  const giftDiv = document.getElementById(`giftDiv${id}${giftCount}`)
  giftDiv.remove() // Remove the selected gift
}

// Function to show gift options based on the selected type (cash, property, etc.)
function showGiftOptions(id, giftCount, type, recipientType) {
  const giftOptionDetailsDiv = document.getElementById(
    `giftOptionDetails${id}${giftCount}`,
  )

  let giftOptionFields = ""

if (type === "cash") {
  giftOptionFields = `
            <div class="form-group">
                <label for="cashAmount${id}${giftCount}">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">£</span>
                    </div>
                    <input type="number" class="form-control" id="cashAmount${id}${giftCount}" placeholder="Enter amount"></label>
                </div>
            </div>
        `

  } else if (type === "property") {
    giftOptionFields = `
              <!-- Property Address Field -->
              <div class="form-group">
                  <label for="propertyAddress${id}${giftCount}">
                  <input type="text" class="custom-input" id="propertyAddress${id}${giftCount}" placeholder="My property located at...">
                  <small class="helper-text">e.g. 28 Mount Pleasent Road SE9 H56, London</small></label>
              </div>
  
              <!-- Property Percentage Field -->
              <div class="form-group input-group-percentage">
                  <input type="number" class="custom-input" id="propertyPercentage${id}${giftCount}" placeholder="Percentage of the property..." min="0" max="100"><div class="input-group-prepend"><span class="input-group-text">%</span>
                  <small class="helper-text">e.g., to split this property between two beneficiaries you can gift 50% each</small>
              </div>
              `
  } else if (type === "collection") {
    giftOptionFields = `
              <div class="form-group">
                  <label for="collectionDescription${id}${giftCount}">
                  <input type="text" class="form-control" id="collectionDescription${id}${giftCount}" placeholder="Enter collection details"></label>
                  <small class="helper-text">All of my jewels, or gold, etc</small>
              </div>
          `
  } else if (type === "item") {
    giftOptionFields = `
              <div class="form-group">
                  <label for="itemDescription${id}${giftCount}">Describe the item:</label>
                  <input type="text" class="form-control" id="itemDescription${id}${giftCount}" placeholder="Enter item details">
                  <small class="helper-text">e.g. my Honda car registered WXX0000, my pearl necklace, etc.</small>
              </div>
          `
  }

  giftOptionDetailsDiv.innerHTML = giftOptionFields
}

// STEP 7 - RESIDUAL ESTATE
//Function to dynamically populate the names for residual estate division
function populateResidualEstateDivisionList() {
  const divisionList = document.getElementById("residualEstateDivisionList")
  divisionList.innerHTML = "" // Clear previous content

  // Gather all beneficiary and charity names from previous sections
  const beneficiaries = document.querySelectorAll(
    'input[name="beneficiaryName"]',
  )
  const charities = document.querySelectorAll('input[name="charityName"]')

  // Create input fields for beneficiaries
  if (beneficiaries.length > 0) {
    beneficiaries.forEach((beneficiary, index) => {
      const recipientDiv = document.createElement("div")
      recipientDiv.classList.add("form-group", "mt-3")
      recipientDiv.innerHTML = `
                  <label for="beneficiaryPercentage${index}">${beneficiary.value}:</label>
                  <div class="input-group">
                      <input type="number" class="form-control" name="beneficiaryPercentage${index}" min="0" max="100" value="0" oninput="calculateTotalPercentage()">
                      <div class="input-group-append">
                          <span class="input-group-text">%</span>
                      </div>
                  </div>
              `
      divisionList.appendChild(recipientDiv)
    })
  }

  // Create input fields for charities
  if (charities.length > 0) {
    charities.forEach((charity, index) => {
      const recipientDiv = document.createElement("div")
      recipientDiv.classList.add("form-group", "mt-3")
      recipientDiv.innerHTML = `
                  <label for="charityPercentage${index}">${charity.value}:</label>
                  <div class="input-group">
                      <input type="number" class="form-control" name="charityPercentage${index}" min="0" max="100" value="0" oninput="calculateTotalPercentage()">
                      <div class="input-group-append">
                          <span class="input-group-text">%</span>
                      </div>
                  </div>
              `
      divisionList.appendChild(recipientDiv)
    })
  }
}

function calculateTotalPercentage() {
  let total = 0

  // Sum the percentages for beneficiaries
  const beneficiaryPercentages = document.querySelectorAll(
    'input[name^="beneficiaryPercentage"]',
  )
  beneficiaryPercentages.forEach((input) => {
    total += parseFloat(input.value || 0)
  })

  // Sum the percentages for charities
  const charityPercentages = document.querySelectorAll(
    'input[name^="charityPercentage"]',
  )
  charityPercentages.forEach((input) => {
    total += parseFloat(input.value || 0)
  })

  // Update the total percentage display in the input field
  document.getElementById("totalPercentage").value = total.toFixed(2) + "%"

  return total // Return the calculated total for validation
}

// Function to validate before moving to the next page
function validatePercentage() {
  const total = calculateTotalPercentage() // Get the total from the calculation function

  // Now check if the total is exactly 100 (with a small tolerance to handle floating-point errors)
  if (Math.abs(total - 100) <= 0.01) {
    // Allow small floating-point margin of error
    document.getElementById("percentageError").classList.add("hidden") // Hide error message if total is 100%
    goToStep8() // Proceed to Step 8
  } else {
    document.getElementById("percentageError").classList.remove("hidden") // Show error message if total is not 100%
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
                  <label>What should happen to ${beneficiary.value}'s share if they pass away before you?</label>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" id="contingencyChildren${index}" name="contingency${index}" value="children">
                      <label for="contingencyChildren${index}" class="form-check-label">Children</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" id="contingencySpouse${index}" name="contingency${index}" value="spouse">
                      <label for="contingencySpouse${index}" class="form-check-label">Spouse</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" id="contingencySpecific${index}" name="contingency${index}" value="specific" onclick="showSpecificPersonFields(${index})">
                      <label for="contingencySpecific${index}" class="form-check-label">Specific Person</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" id="contingencyShare${index}" name="contingency${index}" value="share" onclick="hideSpecificPersonFields(${index})">
                      <label for="contingencyShare${index}" class="form-check-label">Share with others</label>
                  </div>
                  <div id="specificPersonFields${index}" class="hidden">
                      <input type="text" class="form-control mt-2" name="specificFullName${index}" placeholder="Full Name">
                      <input type="text" class="form-control mt-2" name="specificRelationship${index}" placeholder="Relationship">
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

// STEP 9 - EXECUTOR
function populateExecutorOptions() {
  const executorList = document.getElementById("executorList")
  executorList.innerHTML = ""

  executorList.innerHTML += `
          <div class="radio-button-toggle">
              <input type="radio" id="swiftwills" name="executor" value="Swiftwills">
              <label for="swiftwills">Swiftwills</label>
          </div>
      `

  const beneficiaries = document.querySelectorAll(
    'input[name="beneficiaryName"]',
  )
  beneficiaries.forEach((beneficiary, index) => {
    executorList.innerHTML += `
              <div class="radio-button-toggle">
                  <input type="radio" id="executor${index}" name="executor" value="${beneficiary.value}">
                  <label for="executor${index}">${beneficiary.value}</label>
              </div>
          `
  })

  executorList.innerHTML += `
          <div class="radio-button-toggle">
              <input type="radio" id="someoneElse" name="executor" value="someoneElse" onclick="showAdditionalExecutors()">
              <label for="someoneElse">Someone else</label>
          </div>
          <div id="additionalExecutorFields" class="hidden">
              <input type="text" name="executorFullName" placeholder="Full Name" class="input-container">
              <input type="text" name="executorRelationship" placeholder="Relationship" class="input-container">
          </div>
      `
}

function showAdditionalExecutors() {
  document.getElementById("additionalExecutorFields").classList.remove("hidden")
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
          <label for="guardianFullName${guardianCount}" class="form-label">Full Name:</label><br>
          <input type="text" name="guardianFullName${guardianCount}" placeholder="Enter full name" class="form-control"><br>
  
          <label for="guardianRelationship${guardianCount}" class="form-label">Relationship:</label><br>
          <select name="guardianRelationship${guardianCount}" class="form-select">
              <option value="Spouse">Spouse</option>
              <option value="Civil partner">Civil partner</option>
              <option value="Partner">Partner</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
          </select><br>
  
          <label for="guardianAddress${guardianCount}" class="form-label">Address or City:</label><br>
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

//STEP 15 - REVIEW
// Function to populate the review page dynamically with data from earlier steps
function populateReviewPage() {
  // Ensure that we're not affecting the existing code by isolating this functionality

  // General Information
  const firstName =
    document.getElementById("firstName")?.value || "Not provided"
  const lastName = document.getElementById("lastName")?.value || "Not provided"
  const address1 = document.getElementById("address1")?.value || "Not provided"
  const city = document.getElementById("city")?.value || "Not provided"
  const postcode = document.getElementById("postcode")?.value || "Not provided"
  const relationshipStatus =
    document.querySelector('input[name="relationship"]:checked')?.value ||
    "Not provided"
  document.getElementById("reviewGeneralInfo").innerHTML =
    `${firstName} ${lastName}<br>${address1}, ${city}, ${postcode}<br>Status: ${relationshipStatus}`

  // Gifts Section
  let giftsReview = ""
  const beneficiaries = document.querySelectorAll(
    'input[name="beneficiaryName"]',
  )
  beneficiaries.forEach((beneficiary, index) => {
    const giftAmount =
      document.getElementById(`beneficiaryGift${index}`)?.value ||
      "Not provided"
    giftsReview += `${beneficiary.value}: £${giftAmount}<br>`
  })
  document.getElementById("reviewGifts").innerHTML =
    giftsReview || "No gifts provided."

  // Residuary Estate
  const residuaryPercentage =
    document.getElementById("totalPercentage")?.value || "0%"
  document.getElementById("reviewResiduaryEstate").innerHTML =
    `Residuary Estate: ${residuaryPercentage}`

  // Executors
  let executorsReview = ""
  const executors = document.querySelectorAll('input[name="executorName"]')
  executors.forEach((executor) => {
    executorsReview += `${executor.value}<br>`
  })
  document.getElementById("reviewExecutors").innerHTML =
    executorsReview || "No executors provided."

  // Children Section
  const childrenInfo =
    document.getElementById("childrenInfo")?.value || "No information provided."
  document.getElementById("reviewChildren").innerHTML = childrenInfo

  // Pets Section
  const petsInfo =
    document.getElementById("petsInfo")?.value || "No information provided."
  document.getElementById("reviewPets").innerHTML = petsInfo

  // Digital Assets
  const digitalAssetsInfo =
    document.getElementById("digitalAssetsInfo")?.value ||
    "No instructions provided."
  document.getElementById("reviewDigitalAssets").innerHTML = digitalAssetsInfo
}

// Final submission function (isolated, won’t interfere with the rest of the code)
function submitForm() {
  // Handle submission logic here. You can extend it to send the form data to the server.
  alert("Your will has been submitted for review!")
}

// Final submission function
function submitForm() {
  // You would handle the form submission here, such as sending the data to a server
  alert("Your will has been submitted for review!")
}
