// app.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace with your app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdR0ZKYGac95o6pqlSw1bwGmNKy_xh3GA",
    authDomain: "swift-7c667.firebaseapp.com",
    projectId: "swift-7c667",
    storageBucket: "swift-7c667.appspot.com",
    messagingSenderId: "253052443224",
    appId: "1:253052443224:web:7f106735bfd5bf436cc82d",
    measurementId: "G-TQMV7C75D3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);


// Initialize Cloud Firestore
const db = getFirestore(app);

// Multi-step form navigation functions
function showStep(stepNumber) {
    const steps = document.querySelectorAll('div[id^="step"]');
    steps.forEach((step) => {
        step.classList.remove("visible");
        step.classList.add("hidden");
    });
    const currentStep = document.getElementById(`step${stepNumber}`);
    currentStep.classList.remove("hidden");
    currentStep.classList.add("visible");
    updateProgressBar(stepNumber);
}

function updateProgressBar(stepNumber) {
    const progressBar = document.getElementById("progressBar");
    const totalSteps = 15; // Update based on your form
    const progressPercentage = (stepNumber / totalSteps) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute("aria-valuenow", progressPercentage);
}

// Navigation functions for specific steps
function goToStep1() { showStep(1); }
function goToStep2() { saveUserData(); showStep(2); }
function goToStep3() { showStep(3); }
function goToStep4() { showStep(4); }
function goToStep5() { showStep(5); }
function goToStep6() { populateGiftRecipientList(); showStep(6); }
function goToStep7() { populateResidualEstateDivisionList(); showStep(7); }
function goToStep8() { populateContingencyList(); showStep(8); }
function goToStep9() { populateExecutorOptions(); showStep(9); }
function goToStep10() { showStep(10); }
function goToStep11() { showStep(11); }
function goToStep12() { showStep(12); }
function goToStep13() { showStep(13); }
function goToStep14() { showStep(14); }
function goToStep15() { populateReviewPage(); showStep(15); }

// Example function to save user data from Step 1
async function saveUserData() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address1").value;
    const city = document.getElementById("city").value;
    const postcode = document.getElementById("postcode").value;
    const relationship = document.querySelector('input[name="relationship"]:checked')?.value;

    try {
        const docRef = await addDoc(collection(db, "users"), {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            postcode: postcode,
            relationship: relationship,
            createdAt: serverTimestamp()
        });
        console.log("User data saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving user data: ", error);
    }
}

// Function to populate the gift recipient list dynamically
function populateGiftRecipientList() {
    const giftRecipientList = document.getElementById("giftRecipientList");
    giftRecipientList.innerHTML = "";

    const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');
    const charities = document.querySelectorAll('input[name="charityName"]');

    if (beneficiaries.length > 0) {
        beneficiaries.forEach((beneficiary, index) => {
            const recipientDiv = document.createElement("div");
            recipientDiv.classList.add("mt-3");
            recipientDiv.innerHTML = `
                <h4>${beneficiary.value}</h4>
                <div id="giftDetailsBeneficiary${index}" class="hidden mt-3"></div>
                <button class="btn btn-outline-primary" onclick="addGift(${index}, 'beneficiary')">Add a new gift for ${beneficiary.value}</button>
            `;
            giftRecipientList.appendChild(recipientDiv);
        });
    }

    if (charities.length > 0) {
        charities.forEach((charity, index) => {
            const recipientDiv = document.createElement("div");
            recipientDiv.classList.add("mt-3");
            recipientDiv.innerHTML = `
                <h4>${charity.value}</h4>
                <div id="giftDetailsCharity${index}" class="hidden mt-3"></div>
                <button class="btn btn-outline-primary" onclick="addGift(${index}, 'charity')">Add a new gift for ${charity.value}</button>
            `;
            giftRecipientList.appendChild(recipientDiv);
        });
    }
}

// adding a specific gift for a recipient
function addGift(id, type) {
    const giftDetailsDiv = document.getElementById(`giftDetails${type.charAt(0).toUpperCase() + type.slice(1)}${id}`);
    giftDetailsDiv.classList.remove("hidden");

    const giftDiv = document.createElement("div");
    giftDiv.classList.add("mt-3");
    giftDiv.innerHTML = `
        <div class="form-group">
            <label for="giftType${id}">Gift type:</label>
            <input type="text" class="form-control" id="giftType${id}" placeholder="Enter gift type (e.g., cash, property)">
        </div>
        <button class="btn btn-danger" onclick="removeGift(${id})">Remove Gift</button>
        <hr>
    `;
    giftDetailsDiv.appendChild(giftDiv);
}

// removing a gift
function removeGift(id) {
    const giftDiv = document.getElementById(`giftDiv${id}`);
    giftDiv?.remove();
}


// Save data for "General Information"
async function saveGeneralInformation() {
    const location = document.querySelector('input[name="location"]:checked')?.value;
    const relationshipStatus = document.querySelector('input[name="relationship"]:checked')?.value;

    try {
        const docRef = await addDoc(collection(db, "users_general_information"), {
            location: location,
            relationshipStatus: relationshipStatus,
            timestamp: serverTimestamp()
        });
        console.log("General information saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving general information: ", error);
    }
}


// Save data for "Who Needs a Will"
async function saveWhoNeedsWill() {
    const willOptions = [];
    document.querySelectorAll('input[name="willOptions"]:checked').forEach((input) => {
        willOptions.push(input.value);
    });

    try {
        const docRef = await addDoc(collection(db, "users_who_needs_will"), {
            willOptions: willOptions,
            timestamp: serverTimestamp()
        });
        console.log("Who needs a will data saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving 'Who Needs a Will' data: ", error);
    }
}

// Save contact information
async function saveContactInformation() {
    const email = document.getElementById("email").value;
    const fullName = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value
    };
    const address = {
        line1: document.getElementById("address1").value,
        line2: document.getElementById("address2").value || null,
        city: document.getElementById("city").value,
        postcode: document.getElementById("postcode").value
    };

    try {
        const docRef = await addDoc(collection(db, "users_contact_info"), {
            email: email,
            fullName: fullName,
            address: address,
            timestamp: serverTimestamp()
        });
        console.log("Contact information saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving contact information: ", error);
    }
}

// Save asset overview
async function saveAssetOverview() {
    const hasForeignAssets = document.querySelector('input[name="foreignAssets"]:checked')?.value;
    const includeForeignAssets = hasForeignAssets === "yes" ? document.querySelector('input[name="includeForeignAssets"]:checked')?.value : null;

    try {
        const docRef = await addDoc(collection(db, "users_asset_overview"), {
            hasForeignAssets: hasForeignAssets,
            includeForeignAssets: includeForeignAssets,
            timestamp: serverTimestamp()
        });
        console.log("Asset overview saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving asset overview: ", error);
    }
}

// Save beneficiaries and gifts
async function saveBeneficiariesAndGifts() {
    const beneficiaries = [];
    document.querySelectorAll('.beneficiary-item').forEach((item, index) => {
        const name = item.querySelector('input[name="beneficiaryName"]').value;
        const relationship = item.querySelector('input[name="beneficiaryRelationship"]').value;
        const share = item.querySelector('input[name="beneficiaryShare"]').value;
        beneficiaries.push({
            name: name,
            relationship: relationship,
            share: share
        });
    });

    const charities = [];
    document.querySelectorAll('.charity-item').forEach((item, index) => {
        const name = item.querySelector('input[name="charityName"]').value;
        const donation = item.querySelector('input[name="charityDonation"]').value;
        charities.push({
            name: name,
            donation: donation
        });
    });

    try {
        const docRef = await addDoc(collection(db, "users_beneficiaries_gifts"), {
            beneficiaries: beneficiaries,
            charities: charities,
            timestamp: serverTimestamp()
        });
        console.log("Beneficiaries and gifts saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving beneficiaries and gifts: ", error);
    }
}

// Save specific gifts or donations data
async function saveGiftsAndDonations() {
    const giftRecipientList = [];
    const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');
    const charities = document.querySelectorAll('input[name="charityName"]');

    beneficiaries.forEach((beneficiary, index) => {
        const giftType = document.querySelector(`input[name="giftType${index}"]:checked`)?.value;
        const giftDetails = document.querySelector(`#giftOptionDetails${index}`)?.value;

        if (giftType) {
            giftRecipientList.push({
                recipientType: "beneficiary",
                name: beneficiary.value,
                giftType: giftType,
                details: giftDetails || "Not provided"
            });
        }
    });

    charities.forEach((charity, index) => {
        const giftType = document.querySelector(`input[name="giftTypeCharity${index}"]:checked`)?.value;
        const giftDetails = document.querySelector(`#giftOptionDetailsCharity${index}`)?.value;

        if (giftType) {
            giftRecipientList.push({
                recipientType: "charity",
                name: charity.value,
                giftType: giftType,
                details: giftDetails || "Not provided"
            });
        }
    });

    try {
        const docRef = await addDoc(collection(db, "users_gifts"), {
            gifts: giftRecipientList,
            timestamp: serverTimestamp()
        });
        console.log("Gifts and donations data saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving gifts and donations data: ", error);
    }
}

// Save residual estate division data
async function saveResidualEstateDivision() {
    const residualDivisionList = [];
    const beneficiaries = document.querySelectorAll('input[name^="beneficiaryPercentage"]');
    const charities = document.querySelectorAll('input[name^="charityPercentage"]');

    beneficiaries.forEach((input, index) => {
        residualDivisionList.push({
            type: "beneficiary",
            name: input.name.replace("beneficiaryPercentage", ""),
            percentage: input.value || "0"
        });
    });

    charities.forEach((input, index) => {
        residualDivisionList.push({
            type: "charity",
            name: input.name.replace("charityPercentage", ""),
            percentage: input.value || "0"
        });
    });

    try {
        const docRef = await addDoc(collection(db, "users_residual_estate"), {
            divisions: residualDivisionList,
            totalPercentage: document.getElementById("totalPercentage").value,
            timestamp: serverTimestamp()
        });
        console.log("Residual estate division data saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving residual estate division data: ", error);
    }
}

// Save contingency planning data
async function saveContingencyPlanning() {
    const contingencyList = [];
    const beneficiaries = document.querySelectorAll('input[name="beneficiaryName"]');

    beneficiaries.forEach((beneficiary, index) => {
        const contingencyOption = document.querySelector(`input[name="contingency${index}"]:checked`)?.value;
        const specificPersonFullName = document.querySelector(`input[name="specificFullName${index}"]`)?.value;
        const specificPersonRelationship = document.querySelector(`input[name="specificRelationship${index}"]`)?.value;

        contingencyList.push({
            beneficiaryName: beneficiary.value,
            option: contingencyOption || "Not provided",
            specificPerson: contingencyOption === "specific" ? {
                fullName: specificPersonFullName || "Not provided",
                relationship: specificPersonRelationship || "Not provided"
            } : null
        });
    });

    try {
        const docRef = await addDoc(collection(db, "users_contingency"), {
            contingencies: contingencyList,
            timestamp: serverTimestamp()
        });
        console.log("Contingency planning data saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving contingency planning data: ", error);
    }
}

// Save children and guardianship data
async function saveChildrenAndGuardianship() {
    const hasChildren = document.querySelector('input[name="hasChildren"]:checked')?.value;
    const manageInheritance = document.querySelector('input[name="manageInheritance"]:checked')?.value;
    const appointGuardians = document.querySelector('input[name="appointGuardians"]:checked')?.value;

    const guardiansList = [];
    document.querySelectorAll('input[name^="guardianFullName"]').forEach((input, index) => {
        const relationship = document.querySelector(`select[name="guardianRelationship${index}"]`)?.value;
        const address = document.querySelector(`input[name="guardianAddress${index}"]`)?.value;

        guardiansList.push({
            fullName: input.value || "Not provided",
            relationship: relationship || "Not provided",
            address: address || "Not provided"
        });
    });

    try {
        const docRef = await addDoc(collection(db, "users_children_guardianship"), {
            hasChildren: hasChildren,
            manageInheritance: manageInheritance,
            appointGuardians: appointGuardians,
            guardians: guardiansList,
            timestamp: serverTimestamp()
        });
        console.log("Children and guardianship data saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving children and guardianship data: ", error);
    }
}


// Save pet-related data
async function savePetData() {
    const hasPets = document.querySelector('input[name="hasPets"]:checked')?.value;
    const petCaretaker = document.querySelector('input[name="petCaretaker"]:checked')?.value;
    let petCaretakerDetails = {};
    if (petCaretaker === "someoneElse") {
        petCaretakerDetails = {
            fullName: document.querySelector('input[name="petCaretakerFullName"]').value,
            relationship: document.querySelector('select[name="petCaretakerRelationship"]').value,
            address: document.querySelector('input[name="petCaretakerAddress"]').value
        };
    }
    const leaveMoneyForPets = document.querySelector('input[name="leaveMoneyForPets"]:checked')?.value;
    const petMoneyAmount = leaveMoneyForPets === "yes" ? document.querySelector('input[name="petMoneyAmount"]').value : null;

    try {
        const docRef = await addDoc(collection(db, "users_pets"), {
            hasPets: hasPets,
            petCaretaker: petCaretaker,
            petCaretakerDetails: petCaretakerDetails,
            leaveMoneyForPets: leaveMoneyForPets,
            petMoneyAmount: petMoneyAmount,
            timestamp: serverTimestamp()
        });
        console.log("Pet data saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving pet data: ", error);
    }
}

// Save digital assets data
async function saveDigitalAssets() {
    const allowDigitalAssets = document.querySelector('input[name="allowDigitalAssets"]:checked')?.value;

    try {
        const docRef = await addDoc(collection(db, "users_digital_assets"), {
            allowDigitalAssets: allowDigitalAssets,
            timestamp: serverTimestamp()
        });
        console.log("Digital assets data saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving digital assets data: ", error);
    }
}

// Save funeral plans data
async function saveFuneralPlans() {
    const funeralPlan = document.querySelector('input[name="funeralPlan"]:checked')?.value;

    try {
        const docRef = await addDoc(collection(db, "users_funeral_plans"), {
            funeralPlan: funeralPlan,
            timestamp: serverTimestamp()
        });
        console.log("Funeral plans data saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving funeral plans data: ", error);
    }
}

// Save will delivery method
async function saveWillDeliveryMethod() {
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked')?.value;

    try {
        const docRef = await addDoc(collection(db, "users_will_delivery"), {
            deliveryMethod: deliveryMethod,
            timestamp: serverTimestamp()
        });
        console.log("Will delivery method saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error saving will delivery method: ", error);
    }
}

// Final submission function
function submitForm() {
    alert("Your will has been submitted for review!");
    // Additional submission logic can be added here, such as sending a final request to a backend
}
