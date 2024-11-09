// Function to add a user
function addUser() {
    fetch('https://adduser-ilvlv2lhsq-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
      })
    })
    .then(response => response.json())
    .then(data => console.log('User added:', data))
    .catch(error => console.error('Error:', error));
  }
  
  // Function to save general information
  function saveGeneralInformation() {
    fetch('https://savegeneralinformation-ilvlv2lhsq-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: 'England',
        relationshipStatus: 'Married'
      })
    })
    .then(response => response.json())
    .then(data => console.log('General information saved:', data))
    .catch(error => console.error('Error:', error));
  }
  
  function getUserData() {
    fetch('https://getuserdata-ilvlv2lhsq-uc.a.run.app')
    .then(response => response.json())
    .then(data => console.log('User data retrieved:', data))
    .catch(error => console.error('Error:', error));
  }
  
  function saveAssetOverview() {
    fetch('https://saveassetoverview-ilvlv2lhsq-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foreignAssets: true,
        includeForeignAssetsInWill: true
      })
    })
    .then(response => response.json())
    .then(data => console.log('Asset overview saved:', data))
    .catch(error => console.error('Error:', error));
  }
  
  
  