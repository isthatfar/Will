let currentStep = 1;

function nextStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    currentStep += 1;
    document.getElementById(`step${currentStep}`).classList.add('active');
    
    // If moving to step 4, dynamically populate the beneficiaries for specific gifts
    if (currentStep === 4) {
        populateSpecificGifts();
    }
}

function prevStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    currentStep -= 1;
    document.getElementById(`step${currentStep}`).classList.add('active');
}

function toggleWillOptions() {
    const status = document.getElementById('relationshipStatus').value;
    const whoNeedsWillDiv = document.getElementById('whoNeedsWillDiv');
    whoNeedsWillDiv.style.display = (status === 'single' || status === 'widowed') ? 'block' : 'none';
}

function toggleForeignAssets() {
    const foreignAssets = document.getElementById('foreignAssets').value;
    const includeForeignAssetsDiv = document.getElementById('includeForeignAssetsDiv');
    includeForeignAssetsDiv.style.display = (foreignAssets === 'yes') ? 'block' : 'none';
}

function toggleCharity() {
    const charityDiv = document.getElementById('charityDiv');
    charityDiv.style.display = document.getElementById('charities').checked ? 'block' : 'none';
}

function addBeneficiary() {
    const beneficiariesDiv = document.getElementById('beneficiariesDiv');
    const newBeneficiary = `
        <div class="form-group">
            <input type="text" name="beneficiaryName[]" class="form-control mb-2" placeholder="Full Name" required>
            <select name="beneficiaryRelationship[]" class="form-control mb-2" required>
                <option value="spouse">Spouse</option>
                <option value="civil_partner">Civil Partner</option>
                <option value="partner">Partner</option>
                <option value="mother">Mother</option>
                <option value="father">Father</option>
                <option value="daughter">Daughter</option>
                <option value="son">Son</option>
                <option value="grandson">Grandson</option>
                <option value="granddaughter">Granddaughter</option>
                <option value="niece">Niece</option>
                <option value="nephew">Nephew</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
            </select>
            <input type="text" name="beneficiaryCity[]" class="form-control mb-2" placeholder="Address or City" required>
        </div>
    `;
    beneficiariesDiv.insertAdjacentHTML('beforeend', newBeneficiary);
}

function populateSpecificGifts() {
    const beneficiariesDiv = document.getElementById('beneficiariesDiv');
    const specificGiftsDiv = document.getElementById('specificGiftsDiv');
    specificGiftsDiv.innerHTML = '';  // Clear any existing content

    const beneficiaryNames = document.querySelectorAll('[name="beneficiaryName[]"]');
    const beneficiaryCities = document.querySelectorAll('[name="beneficiaryCity[]"]');

    // Loop through all beneficiaries and create a section for each to assign specific gifts
    beneficiaryNames.forEach((name, index) => {
        const beneficiaryName = name.value;
        const beneficiaryCity = beneficiaryCities[index].value;

        // Create a section for each beneficiary
        const giftSection = document.createElement('div');
        giftSection.className = 'gift-section';
        giftSection.innerHTML = `
            <h4>Gifts for ${beneficiaryName} (${beneficiaryCity})</h4>
            <label for="giftType_${index}">Select the type of gift:</label><br>
            <select id="giftType_${index}" name="giftType_${index}" class="form-control mb-2" onchange="toggleGiftFields(${index})" required>
                <option value="cash">Cash</option>
                <option value="property">Property</option>
                <option value="collection">Collection of items</option>
                <option value="item">Item</option>
            </select>
            <div id="giftDetails_${index}" class="gift-details">
                <!-- Gift details based on the selected type will be displayed here -->
            </div>
        `;
        specificGiftsDiv.appendChild(giftSection);
    });
}
function toggleGiftFields(index) {
    const giftType = document.getElementById(`giftType_${index}`).value;
    const giftDetailsDiv = document.getElementById(`giftDetails_${index}`);
    
    let giftDetails = '';

    if (giftType === 'cash') {
        giftDetails = `
            <label for="cashAmount_${index}">Enter Amount £:</label>
            <input type="number" id="cashAmount_${index}" name="cashAmount_${index}" class="form-control mb-2" required>
        `;
    } else if (giftType === 'property') {
        giftDetails = `
            <label for="propertyAddress_${index}">Enter Address Located at:</label>
            <input type="text" id="propertyAddress_${index}" name="propertyAddress_${index}" class="form-control mb-2" required>
            <label for="propertyPercentage_${index}">Enter Percentage of Property (%) :</label>
            <input type="number" id="propertyPercentage_${index}" name="propertyPercentage_${index}" class="form-control mb-2" required>
        `;
    } else if (giftType === 'collection') {
        giftDetails = `
            <label for="collectionItems_${index}">Enter Collection Description (e.g., "All of my..."):</label>
            <input type="text" id="collectionItems_${index}" name="collectionItems_${index}" class="form-control mb-2" required>
        `;
    } else if (giftType === 'item') {
        giftDetails = `
            <label for="specificItem_${index}">Enter Item Description (e.g., "My..."):</label>
            <input type="text" id="specificItem_${index}" name="specificItem_${index}" class="form-control mb-2" required>
        `;
    }

    // Display the appropriate fields based on the selected gift type
    giftDetailsDiv.innerHTML = giftDetails;
}

// Step 5: Populate beneficiaries for residual estate division
function populateResidualDivision() {
    const beneficiaries = document.querySelectorAll('[name="beneficiaryName[]"]');
    const residualDivisionDiv = document.getElementById('residualDivisionDiv');
    residualDivisionDiv.innerHTML = '';  // Clear any previous entries

    // Loop through each beneficiary and create an input field for share percentage
    beneficiaries.forEach((name, index) => {
        const beneficiaryName = name.value;
        const divisionInput = `
            <div class="form-group">
                <label for="beneficiaryShare_${index}">${beneficiaryName}'s Share (%):</label>
                <input type="number" id="beneficiaryShare_${index}" name="beneficiaryShare[]" class="form-control" value="0" oninput="calculateTotalPercentage()" required>
            </div>
        `;
        residualDivisionDiv.insertAdjacentHTML('beforeend', divisionInput);
    });

    // Add a total percentage display
    residualDivisionDiv.insertAdjacentHTML('beforeend', `
        <div class="form-group">
            <label for="totalPercentage">Total Percentage:</label>
            <input type="number" id="totalPercentage" class="form-control" readonly value="0">
        </div>
        <p id="percentageError" class="text-danger" style="display:none;">The total percentage must add up to 100%.</p>
    `);
}

// Calculate total percentage in step 5 and validate if it adds up to 100%
function calculateTotalPercentage() {
    const shares = document.querySelectorAll('[name="beneficiaryShare[]"]');
    let total = 0;

    shares.forEach(share => {
        total += parseFloat(share.value) || 0;  // Ensure that empty inputs are treated as 0
    });

    document.getElementById('totalPercentage').value = total;

    // Display error if total is not 100%
    const errorMessage = document.getElementById('percentageError');
    if (total !== 100) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
    }
}

// Validate total percentage equals 100% before proceeding to the next step
function validateAndNextStep(step) {
    const total = parseFloat(document.getElementById('totalPercentage').value);
    if (total === 100) {
        nextStep(step);  // Proceed to the next step only if the total percentage is 100
    } else {
        document.getElementById('percentageError').style.display = 'block';
    }
}

function populateContingencyPlanning() {
    const beneficiariesDiv = document.querySelectorAll('[name="beneficiaryName[]"]');
    const contingencyPlanningDiv = document.getElementById('contingencyPlanningDiv');
    contingencyPlanningDiv.innerHTML = '';

    beneficiariesDiv.forEach((name, index) => {
        const beneficiaryName = name.value;
        const contingencyOptions = `
            <h4>What should happen if ${beneficiaryName} dies before you?</h4>
            <select id="contingency_${index}" name="contingency_${index}" class="form-control mb-2">
                <option value="children">Give to their children</option>
                <option value="spouse">Give to their spouse or civil partner</option>
                <option value="specific">Give to specific persons</option>
                <option value="remaining">Share between remaining beneficiaries</option>
            </select>
            <div id="specificContingency_${index}" style="display:none;" class="mt-3">
                <label for="specificName_${index}">Specific Person Name:</label>
                <input type="text" id="specificName_${index}" name="specificName_${index}" class="form-control mb-2" placeholder="Full Name">
                <label for="specificRelationship_${index}">Relationship:</label>
                <select id="specificRelationship_${index}" name="specificRelationship_${index}" class="form-control mb-2">
                    <option value="spouse">Spouse</option>
                    <option value="civil_partner">Civil Partner</option>
                    <option value="partner">Partner</option>
                    <option value="mother">Mother</option>
                    <option value="father">Father</option>
                    <option value="daughter">Daughter</option>
                    <option value="son">Son</option>
                    <option value="grandson">Grandson</option>
                    <option value="granddaughter">Granddaughter</option>
                    <option value="niece">Niece</option>
                    <option value="nephew">Nephew</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                </select>
                <label for="specificCity_${index}">Address or City:</label>
                <input type="text" id="specificCity_${index}" name="specificCity_${index}" class="form-control mb-2" placeholder="Address or City">
            </div>
        `;
        contingencyPlanningDiv.insertAdjacentHTML('beforeend', contingencyOptions);

        document.getElementById(`contingency_${index}`).addEventListener('change', function() {
            const specificDiv = document.getElementById(`specificContingency_${index}`);
            specificDiv.style.display = this.value === 'specific' ? 'block' : 'none';
        });
    });
}

function populateExecutors() {
    const beneficiariesDiv = document.querySelectorAll('[name="beneficiaryName[]"]');
    const executorsDiv = document.getElementById('executorsDiv');
    executorsDiv.innerHTML = '';  // Clear existing content

    beneficiariesDiv.forEach((name, index) => {
        const beneficiaryName = name.value;
        const executorOption = `
            <label>
                <input type="radio" name="executor" value="${beneficiaryName}" required>
                ${beneficiaryName}
            </label><br>
        `;
        executorsDiv.insertAdjacentHTML('beforeend', executorOption);
    });

    executorsDiv.insertAdjacentHTML('beforeend', `
        <label>
            <input type="radio" name="executor" value="add_executor" onclick="toggleAddExecutor(true)">
            Add someone else
        </label><br>
    `);
}

function toggleAddExecutor(show) {
    const addExecutorDiv = document.getElementById('addExecutorDiv');
    addExecutorDiv.style.display = show ? 'block' : 'none';
}

function populateReviewPage() {
    const reviewContent = document.getElementById('reviewContent');
    reviewContent.innerHTML = `
        <h3>1. General Information</h3>
        <p><strong>Location:</strong> ${getValue('location')}</p>
        <p><strong>Relationship Status:</strong> ${getValue('relationshipStatus')}</p>
        <p><strong>Email:</strong> ${getValue('email')}</p>
        <p><strong>Full Name:</strong> ${getValue('fullName')} ${getValue('lastName')}</p>
        <p><strong>Home Address:</strong> ${getValue('address1')}, ${getValue('address2')}, ${getValue('city')}, ${getValue('postcode')}</p>
        <button type="button" onclick="editStep(1)" class="btn btn-link">Edit General Information</button>

        <h3>2. Asset Overview</h3>
        <p><strong>Do you have any foreign assets?</strong> ${getValue('foreignAssets')}</p>
        ${getConditionalField('foreignAssets', 'yes', `
            <p><strong>Include foreign assets in will:</strong> ${getValue('includeForeignAssets')}</p>
        `)}
        <button type="button" onclick="editStep(2)" class="btn btn-link">Edit Asset Overview</button>

        <h3>3. Beneficiaries and Gifts</h3>
        ${populateBeneficiaryReview()}
        <button type="button" onclick="editStep(3)" class="btn btn-link">Edit Beneficiaries and Gifts</button>

        <h3>4. Division of Residual Estate</h3>
        ${populateResidualEstateReview()}
        <button type="button" onclick="editStep(4)" class="btn btn-link">Edit Residual Estate</button>

        <h3>5. Contingency Planning</h3>
        ${populateContingencyPlanningReview()}
        <button type="button" onclick="editStep(5)" class="btn btn-link">Edit Contingency Planning</button>

        <h3>6. Executors</h3>
        <p><strong>Chosen Executors:</strong> ${getSelectedRadioValue('executor')}</p>
        <button type="button" onclick="editStep(6)" class="btn btn-link">Edit Executors</button>
    `;
}

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : 'N/A';
}

function getSelectedRadioValue(name) {
    const selectedRadio = document.querySelector(`input[name="${name}"]:checked`);
    return selectedRadio ? selectedRadio.value : 'N/A';
}

function getConditionalField(id, expectedValue, content) {
    const value = getValue(id);
    return value === expectedValue ? content : '';
}

function populateBeneficiaryReview() {
    let beneficiaries = '';
    const beneficiaryNames = document.querySelectorAll('[name="beneficiaryName[]"]');
    const beneficiaryRelationships = document.querySelectorAll('[name="beneficiaryRelationship[]"]');
    const beneficiaryCities = document.querySelectorAll('[name="beneficiaryCity[]"]');
    
    beneficiaryNames.forEach((name, index) => {
        beneficiaries += `
            <p>Beneficiary ${index + 1}: ${name.value} (${beneficiaryRelationships[index].value}), ${beneficiaryCities[index].value}</p>
        `;
    });

    return beneficiaries;
}

function populateResidualEstateReview() {
    let residualEstate = '';
    const shares = document.querySelectorAll('[name^="beneficiaryShare_"]');
    
    shares.forEach((share, index) => {
        residualEstate += `
            <p>Beneficiary ${index + 1} Share: ${share.value}%</p>
        `;
    });

    return residualEstate;
}

function populateContingencyPlanningReview() {
    let contingencyPlans = '';
    const contingencies = document.querySelectorAll('[name^="contingency_"]');
    
    contingencies.forEach((contingency, index) => {
        contingencyPlans += `
            <p>Contingency for Beneficiary ${index + 1}: ${contingency.value}</p>
        `;
    });

    return contingencyPlans;
}

function editStep(step) {
    currentStep = step;
    nextStep(step);  // Go back to the specific step for editing
}