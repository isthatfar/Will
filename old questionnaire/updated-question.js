// Functions to navigate between steps
function goToStep1() {
    showStep(1);
}

function goToStep2() {
    updateWillOptions();
    showStep(2);
}

function goToStep3() {
    showStep(3);
}

function goToStep4() {
    showStep(4);
}

function goToStep5() {
    showStep(5);
}

function goToStep6() {
    populateGiftRecipientList(); // Populate the recipients for gifts or donations
    showStep(6);
}

function goToStep7() {
    populateResidualEstateDivisionList(); // Populate names for division of residual estate
    showStep(7);
}

function goToStep8() {
    populateContingencyList(); // Populate the contingency options for each beneficiary
    showStep(8);
}
function goToStep9() { populateExecutorOptions(); showStep(9); }
function goToStep10() { showStep(10); }
function goToStep11() {
    showStep(11);  // Move to Step 11 (Funeral Plans)
}
function goToStep12() { showStep(12); }
function goToStep13() { showStep(13); }
function goToStep14() { showStep(14); }

// Function to display a specific step
function showStep(stepNumber) {
    // Hide all steps
    const steps = document.querySelectorAll('div[id^="step"]');
    steps.forEach(step => {
        step.classList.remove('visible');
        step.classList.add('hidden');
    });

    // Show the current step
    const currentStep = document.getElementById(`step${stepNumber}`);
    currentStep.classList.remove('hidden');
    currentStep.classList.add('visible');
}

// Dynamically update will options based on relationship status
function updateWillOptions() {
    const relationship = document.querySelector('input[name="relationship"]:checked');
    const willOptionsDiv = document.getElementById('willOptions');
    willOptionsDiv.innerHTML = ''; // Clear previous options

    if (relationship && (relationship.value === 'Single' || relationship.value === 'Widowed')) {
        willOptionsDiv.innerHTML = '<input type="radio" name="whoNeedsWill" value="Just me"> Just me';
    } else if (relationship) {
        willOptionsDiv.innerHTML = `
            <input type="radio" name="whoNeedsWill" value="Just me"> Just me<br>
            <input type="radio" name="whoNeedsWill" value="Me and my partner"> Me and my partner
        `;
    }
}

// Add and remove beneficiaries
let beneficiaryCount = 0;

function addBeneficiary() {
    const beneficiaryDiv = document.createElement('div');
    beneficiaryDiv.id = `beneficiary${beneficiaryCount}`;

    beneficiaryDiv.innerHTML = `
        <label for="beneficiaryName">Full name:</label>
        <input type="text" name="beneficiaryName"><br>

        <label for="relationship">Relationship to you:</label>
        <select name="beneficiaryRelationship">
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
        </select><br>

        <label for="beneficiaryAddress">Address or city:</label>
        <input type="text" name="beneficiaryAddress"><br>

        <button onclick="removeBeneficiary(${beneficiaryCount})">Remove</button><br><br>
    `;

    document.getElementById('beneficiaryList').appendChild(beneficiaryDiv);
    beneficiaryCount++;
}

function removeBeneficiary(id) {
    const beneficiaryDiv = document.getElementById(`beneficiary${id}`);
    beneficiaryDiv.remove();
}

// Add and remove charities
let charityCount = 0;

function addCharity() {
    const charityDiv = document.createElement('div');
    charityDiv.id = `charity${charityCount}`;

    charityDiv.innerHTML = `
        <label for="charityName">Name of charity:</label>
        <input type="text" name="charityName"><br>

        <label for="charityAddress">Address or city:</label>
        <input type="text" name="charityAddress"><br>

        <button onclick="removeCharity(${charityCount})">Remove</button><br><br>
    `;

    document.getElementById('charityList').appendChild(charityDiv);
    charityCount++;
}

function removeCharity(id) {
    const charityDiv = document.getElementById(`charity${id}`);
    charityDiv.remove();
}

// Function to dynamically populate gift recipients (beneficiaries and charities)
function populateGiftRecipientList() {
    const giftRecipientList = document.getElementById('giftRecipientList');
    giftRecipientList.innerHTML = ''; // Clear previous content

    // Gather all beneficiary and charity names
    const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');
    const charities = document.querySelectorAll('input[name="charityName"]');

    // Create a list for beneficiaries
    if (beneficiaries.length > 0) {
        beneficiaries.forEach((beneficiary, index) => {
            const recipientDiv = document.createElement('div');
            recipientDiv.innerHTML = `
                <h4>${beneficiary.value}</h4>
                <button onclick="addGift(${index}, 'beneficiary')">Add a new gift for ${beneficiary.value}</button><br><br>
                <div id="giftDetailsBeneficiary${index}" class="hidden"></div>
            `;
            giftRecipientList.appendChild(recipientDiv);
        });
    }

    // Create a list for charities
    if (charities.length > 0) {
        charities.forEach((charity, index) => {
            const recipientDiv = document.createElement('div');
            recipientDiv.innerHTML = `
                <h4>${charity.value}</h4>
                <button onclick="addGift(${index}, 'charity')">Add a new gift for ${charity.value}</button><br><br>
                <div id="giftDetailsCharity${index}" class="hidden"></div>
            `;
            giftRecipientList.appendChild(recipientDiv);
        });
    }
}

// Function to add a gift for a recipient (either beneficiary or charity)
function addGift(index, type) {
    const giftDetailsDiv = document.getElementById(`giftDetails${type.charAt(0).toUpperCase() + type.slice(1)}${index}`);
    giftDetailsDiv.innerHTML = `
        <label for="giftType">Select a gift type:</label><br>
        <input type="radio" name="giftType${index}" value="cash" onclick="showGiftOptions(${index}, 'cash', '${type}')"> Cash<br>
        <input type="radio" name="giftType${index}" value="property" onclick="showGiftOptions(${index}, 'property', '${type}')"> Property<br>
        <input type="radio" name="giftType${index}" value="collection" onclick="showGiftOptions(${index}, 'collection', '${type}')"> Collection of items<br>
        <input type="radio" name="giftType${index}" value="item" onclick="showGiftOptions(${index}, 'item', '${type}')"> Item<br><br>
        
        <div id="giftOptionDetails${type.charAt(0).toUpperCase() + type.slice(1)}${index}"></div>
    `;

    giftDetailsDiv.classList.remove('hidden');
}

// Function to display specific inputs based on the selected gift type
function showGiftOptions(index, giftType, type) {
    const giftOptionDetailsDiv = document.getElementById(`giftOptionDetails${type.charAt(0).toUpperCase() + type.slice(1)}${index}`);

    if (giftType === 'cash') {
        giftOptionDetailsDiv.innerHTML = `
            <label for="cashAmount">Enter Amount (£):</label>
            <input type="number" name="cashAmount${index}" placeholder="Amount £"><br>
        `;
    } else if (giftType === 'property') {
        giftOptionDetailsDiv.innerHTML = `
            <label for="propertyAddress">Enter Address located at:</label>
            <input type="text" name="propertyAddress${index}" placeholder="Property Address"><br>
            <label for="propertyPercentage">Percentage of property:</label>
            <input type="number" name="propertyPercentage${index}" placeholder="% of property"><br>
        `;
    } else if (giftType === 'collection') {
        giftOptionDetailsDiv.innerHTML = `
            <label for="collectionDescription">Enter Description of Collection:</label>
            <input type="text" name="collectionDescription${index}" placeholder="All of my ..."><br>
        `;
    } else if (giftType === 'item') {
        giftOptionDetailsDiv.innerHTML = `
            <label for="itemDescription">Enter Description of Item:</label>
            <input type="text" name="itemDescription${index}" placeholder="My ..."><br>
        `;
    }
}

// Function to dynamically populate the names for residual estate division
function populateResidualEstateDivisionList() {
    const divisionList = document.getElementById('residualEstateDivisionList');
    divisionList.innerHTML = ''; // Clear previous content

    // Gather all beneficiary and charity names from previous sections
    const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');
    const charities = document.querySelectorAll('input[name="charityName"]');

    // Create input fields for beneficiaries
    if (beneficiaries.length > 0) {
        beneficiaries.forEach((beneficiary, index) => {
            const recipientDiv = document.createElement('div');
            recipientDiv.innerHTML = `
                <label for="beneficiaryPercentage${index}">${beneficiary.value}:</label>
                <input type="number" name="beneficiaryPercentage${index}" min="0" max="100" value="0" oninput="calculateTotalPercentage()"> %<br>
            `;
            divisionList.appendChild(recipientDiv);
        });
    }

    // Create input fields for charities
    if (charities.length > 0) {
        charities.forEach((charity, index) => {
            const recipientDiv = document.createElement('div');
            recipientDiv.innerHTML = `
                <label for="charityPercentage${index}">${charity.value}:</label>
                <input type="number" name="charityPercentage${index}" min="0" max="100" value="0" oninput="calculateTotalPercentage()"> %<br>
            `;
            divisionList.appendChild(recipientDiv);
        });
    }
}

// Function to calculate the total percentage
function calculateTotalPercentage() {
    let total = 0;

    // Sum the percentages for beneficiaries
    const beneficiaryPercentages = document.querySelectorAll('input[name^="beneficiaryPercentage"]');
    beneficiaryPercentages.forEach(input => {
        total += parseFloat(input.value || 0);
    });

    // Sum the percentages for charities
    const charityPercentages = document.querySelectorAll('input[name^="charityPercentage"]');
    charityPercentages.forEach(input => {
        total += parseFloat(input.value || 0);
    });

    // Update the total percentage display in the input field
    document.getElementById('totalPercentage').value = total.toFixed(2) + "%";

    return total;  // Return the calculated total for validation
}

// Function to validate before moving to the next page
function validatePercentage() {
    const total = calculateTotalPercentage();  // Get the total from the calculation function

    // Now check if the total is exactly 100 (with a small tolerance to handle floating-point errors)
    if (Math.abs(total - 100) <= 0.01) {  // Allow small floating-point margin of error
        document.getElementById('percentageError').classList.add('hidden');  // Hide error message if total is 100%
        goToStep8();  // Proceed to Step 8
    } else {
        document.getElementById('percentageError').classList.remove('hidden');  // Show error message if total is not 100%
    }
}

// Show or hide the foreign asset question
function showForeignAssetQuestion() {
    document.getElementById('foreignAssetInclude').classList.remove('hidden');
}

function hideForeignAssetQuestion() {
    document.getElementById('foreignAssetInclude').classList.add('hidden');
}
// Function to dynamically populate the contingency list for each beneficiary
function populateContingencyList() {
    const contingencyList = document.getElementById('contingencyList');
    contingencyList.innerHTML = ''; // Clear previous content

    // Gather all beneficiary names from previous steps
    const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');

    // Create contingency options for each beneficiary
    beneficiaries.forEach((beneficiary, index) => {
        const contingencyDiv = document.createElement('div');
        contingencyDiv.innerHTML = `
            <h4>${beneficiary.value}</h4>
            <label>What should happen to ${beneficiary.value}'s share if they pass away before you?</label><br>
            <input type="radio" name="contingency${index}" value="children"> Give to their children<br>
            <input type="radio" name="contingency${index}" value="spouse"> Give to their spouse<br>
            <input type="radio" name="contingency${index}" value="specific" onclick="showSpecificPersonFields(${index})"> Give to a specific person<br>
            <input type="radio" name="contingency${index}" value="share" onclick="hideSpecificPersonFields(${index})"> Share with remaining beneficiaries<br><br>

            <!-- Specific person input fields (hidden by default) -->
            <div id="specificPersonFields${index}" class="hidden">
                <label for="specificFullName${index}">Full Name:</label><br>
                <input type="text" name="specificFullName${index}" placeholder="Enter full name"><br>

                <label for="specificRelationship${index}">Relationship:</label><br>
                <select name="specificRelationship${index}">
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
                </select><br>

                <label for="specificAddress${index}">Address or City:</label><br>
                <input type="text" name="specificAddress${index}" placeholder="Enter address or city"><br><br>
            </div>
        `;
        contingencyList.appendChild(contingencyDiv);
    });
}

// Show specific person fields when "Give to specific person" is selected
function showSpecificPersonFields(index) {
    document.getElementById(`specificPersonFields${index}`).classList.remove('hidden');
}

// Hide specific person fields when any other option is selected
function hideSpecificPersonFields(index) {
    document.getElementById(`specificPersonFields${index}`).classList.add('hidden');
}

// Step 6: Executors - Populate options for appointing executors
function populateExecutorOptions() {
    const executorList = document.getElementById('executorList');
    executorList.innerHTML = '';

    // Add "Swiftwills" option
    executorList.innerHTML += `<input type="radio" name="executor" value="Swiftwills"> Swiftwills<br>`;

    // Add beneficiary names dynamically
    const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');
    if (beneficiaries.length > 0) {
        beneficiaries.forEach((beneficiary, index) => {
            executorList.innerHTML += `
                <input type="radio" name="executor" value="${beneficiary.value}"> ${beneficiary.value}<br>
            `;
        });
    }

    // Add "Add someone else" option
    executorList.innerHTML += `
        <input type="radio" name="executor" value="someoneElse" onclick="showAdditionalExecutors()"> Add someone else<br>
        <div id="additionalExecutorFields" class="hidden">
            <label for="executorFullName">Full Name:</label><br>
            <input type="text" name="executorFullName" placeholder="Enter full name"><br>
            <label for="executorRelationship">Relationship:</label><br>
            <select name="executorRelationship">
                <option value="Spouse">Spouse</option>
                <option value="Civil partner">Civil partner</option>
                <option value="Partner">Partner</option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
            </select><br>
            <label for="executorAddress">Address or City:</label><br>
            <input type="text" name="executorAddress" placeholder="Enter address or city"><br><br>
        </div>
    `;
}

// Show additional executors fields
function showAdditionalExecutors() {
    document.getElementById('additionalExecutorFields').classList.remove('hidden');
}
// Step 7: Children and Guardianship
// Step 7: Children and Guardianship
function showChildrenFields() {
    document.getElementById('childrenFields').classList.remove('hidden');
}

function hideChildrenFields() {
    document.getElementById('childrenFields').classList.add('hidden');
    document.getElementById('executorFields').classList.add('hidden');
    document.getElementById('childSelectionFields').classList.add('hidden');
    document.getElementById('guardianFields').classList.add('hidden');
}

// Show executor question when "Yes" is selected for having children under 18
function showExecutorFields() {
    document.getElementById('executorFields').classList.remove('hidden');
    showChildSelectionFields();  // Populate the child selection list if executors manage inheritance
}

// Hide executor-related fields if "No" is selected
function hideExecutorFields() {
    document.getElementById('executorFields').classList.add('hidden');
    document.getElementById('childSelectionFields').classList.add('hidden');
}

// Populate children under 18 list dynamically from beneficiaries if executors will manage inheritance
function showChildSelectionFields() {
    const childList = document.getElementById('childrenUnder18List');
    childList.innerHTML = ''; // Clear previous content

    // Pull beneficiary names dynamically from Step 5
    const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');
    if (beneficiaries.length > 0) {
        beneficiaries.forEach((beneficiary, index) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = `childBeneficiary${index}`;
            checkbox.value = beneficiary.value;
            checkbox.id = `childBeneficiary${index}`;

            const label = document.createElement('label');
            label.htmlFor = `childBeneficiary${index}`;
            label.textContent = beneficiary.value;

            childList.appendChild(checkbox);
            childList.appendChild(label);
            childList.appendChild(document.createElement('br')); // Add line breaks between names
        });
    } else {
        childList.innerHTML = "No beneficiaries available to select.";
    }

    document.getElementById('childSelectionFields').classList.remove('hidden');
}

// Show or hide guardian fields based on user input
function showGuardianFields() {
    document.getElementById('guardianFields').classList.remove('hidden');
}

function hideGuardianFields() {
    document.getElementById('guardianFields').classList.add('hidden');
}

// Add multiple guardian fields dynamically
let guardianCount = 0;
function addGuardian() {
    const guardianDiv = document.createElement('div');
    guardianDiv.id = `guardian${guardianCount}`;

    guardianDiv.innerHTML = `
        <label for="guardianFullName${guardianCount}">Full Name:</label><br>
        <input type="text" name="guardianFullName${guardianCount}" placeholder="Enter full name"><br>

        <label for="guardianRelationship${guardianCount}">Relationship:</label><br>
        <select name="guardianRelationship${guardianCount}">
            <option value="Spouse">Spouse</option>
            <option value="Civil partner">Civil partner</option>
            <option value="Partner">Partner</option>
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
        </select><br>

        <label for="guardianAddress${guardianCount}">Address or City:</label><br>
        <input type="text" name="guardianAddress${guardianCount}" placeholder="Enter address or city"><br>
        <button onclick="removeGuardian(${guardianCount})">Remove Guardian</button><br><br>
    `;

    document.getElementById('guardianList').appendChild(guardianDiv);
    guardianCount++;
}

function removeGuardian(id) {
    const guardianDiv = document.getElementById(`guardian${id}`);
    guardianDiv.remove();
}

// Step 8: Pets
// Show or hide pet caretaker fields based on user input
function showPetFields() {
    document.getElementById('petFields').classList.remove('hidden');
}

function hidePetFields() {
    document.getElementById('petFields').classList.add('hidden');
    document.getElementById('additionalPetCaretaker').classList.add('hidden');
    document.getElementById('leaveMoneyAmount').classList.add('hidden');
}

// Show additional fields when "Someone else" is selected for pet caretaker
function showAdditionalExecutorFields() {
    document.getElementById('additionalPetCaretaker').classList.remove('hidden');
}

// Hide additional fields if executors are chosen to care for pets
function hideAdditionalExecutorFields() {
    document.getElementById('additionalPetCaretaker').classList.add('hidden');
}

// Show or hide the leave money amount input based on user selection
function showLeaveMoneyAmount() {
    document.getElementById('leaveMoneyAmount').classList.remove('hidden');
}

function hideLeaveMoneyAmount() {
    document.getElementById('leaveMoneyAmount').classList.add('hidden');
}



// Step 9: Digital Assets
function showDigitalAssetFields() {
    document.getElementById('digitalAssetFields').classList.remove('hidden');
}