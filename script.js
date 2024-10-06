const menuItems = document.querySelectorAll('.nav-item');
const menuBtns = document.querySelectorAll('.nav-item-num');
const form = document.querySelector('.input-wrapper');
const inputs = document.querySelectorAll('.input');
const back = document.querySelector('.back');
const next = document.querySelector('.next');
const planSwitch = document.querySelector('.switch-btn');
const monthlyPlan = document.querySelector('.monthly');
const yearlyPlan = document.querySelector('.yearly');
const cardYearly = document.querySelector('.card-yearly');
const cardMonthly = document.querySelector('.card-monthly');
const planCards = document.querySelectorAll('.plan-card');
const addOns = document.querySelectorAll('.add-ons');
const labels = document.querySelectorAll('add-ons-plan');
const mobileMenus = document.querySelectorAll('.mobile-item');
console.log(mobileMenus);


// .........regex patterns..........

const pattern = {
    name: /^[a-z\d]{6,15}$/i,
    email: /^([\w@\.]+)@([a-z]{2,8})\.([a-z]{2,5})(\.[a-z]{2,8})?$/,
    phone: /^\+[0-9]{11,15}$/
};

// ............functions.............

const validate = (field, regex) => {

    if(regex.test(field.value)){
        field.setAttribute('class', 'valid');
    }else{
        field.setAttribute('class', 'invalid');
    }
};

const changePage = (url) => {
    location.replace(url);
};

// ........switching to different pages..........


menuItems[0].addEventListener('click', () => {
    location.replace('./index.html');
    back.style.visibility = 'hidden';
})

menuItems[1].addEventListener('click', () => {
    location.replace('./step2.html');
})

menuItems[2].addEventListener('click', () => {
    location.replace('./step3.html');
})

menuItems[3].addEventListener('click', () => {
    location.replace('./step4.html');
})

mobileMenus[0].addEventListener('click', () => {
    location.replace('./index.html');
    back.style.visibility = 'hidden';
})

mobileMenus[1].addEventListener('click', () => {
    location.replace('./step2.html');
})

mobileMenus[2].addEventListener('click', () => {
    location.replace('./step3.html');
})

mobileMenus[3].addEventListener('click', () => {
    location.replace('./step4.html');
})


next.addEventListener('click', (e) => {
    e.preventDefault();

    let page = '';

    switch(location.pathname){

        case '/index.html' :
            page = changePage('./step2.html');
        break;
        case '/step2.html' :
            page = changePage('./step3.html');
        break;

        case '/step3.html' :
            page = changePage('./step4.html');
        break;

        case '/step4.html' :
            page = changePage('./step5.html');
        break;

    } 
});


back.addEventListener('click', (e) => {
    e.preventDefault();

    let page = '';

    switch(location.pathname){

        case '/index.html' :
            back.style.visibility = 'hidden';
        break;

        case '/step2.html' :
            page = changePage('./index.html');
            back.style.visibility = 'hidden';
        break;

        case '/step3.html' :
            page = changePage('./step2.html');
        break;

        case '/step4.html' :
            page = changePage('./step3.html');
        break;

    }
});


// .........form validation........



inputs.forEach((input) => {
    input.addEventListener('keyup', (e)=> {

        validate(e.target, pattern[e.target.attributes.name.value]);
         
    });
});

// ...........choosing add-ons...........

addOns.forEach((addOn)=> {
    let bc = 'white';
        
    addOn.addEventListener('click', () => {
        // console.log(e.target.className==='add-ons-plan')
        
        if(addOn.style.backgroundColor === 'white'){
            bc = addOn.style.backgroundColor='var(--Magnolia)';

        }else{
            bc = addOn.style.backgroundColor = 'white';
        }
    });

    labels.forEach((label) =>{
        label.addEventListener('click', () => {
            if(addOn.style.backgroundColor === 'white'){
                bc = addOn.style.backgroundColor='var(--Magnolia)';
    
            }else{
                bc = addOn.style.backgroundColor = 'white';
            }
        })
    })

    // addOn.add-ons-plan.addEventListener('click', () => {

    //     console.log(e.target.className==='add-ons-plan')
    //     if(addOn.style.backgroundColor === 'white'){
    //         bc = addOn.style.backgroundColor='var(--Magnolia)';

    //     }else{
    //         bc = addOn.style.backgroundColor = 'white';
    //     }
    // })

});

// .......selecting your plan.........

planSwitch.onclick = () => {
    let position = '';
    let color = ''; 
    let display ='';

    if(planSwitch.style.left === '8%'){
        position = planSwitch.style.left = '60%';
        color = yearlyPlan.style.color='var(--Marineblue)';
        color = monthlyPlan.style.color='var(--Coolgray)';
        display = cardMonthly.classList.add('hidden');
        display = cardYearly.classList.remove('hidden');

    }else{
        position = planSwitch.style.left = '8%';
        color = monthlyPlan.style.color='var(--Marineblue)';
        color = yearlyPlan.style.color='var(--Coolgray)';
        display = cardYearly.classList.add('hidden');
        display = cardMonthly.classList.remove('hidden');
    }
};

yearlyPlan.onclick = () => {

    planSwitch.style.left = '60%';
    yearlyPlan.style.color='var(--Marineblue)';
    monthlyPlan.style.color='var(--Coolgray)';
    cardMonthly.classList.add('hidden');
    cardYearly.classList.remove('hidden');

};

monthlyPlan.onclick = () => {

    planSwitch.style.left = '8%';
    monthlyPlan.style.color='var(--Marineblue)';
    yearlyPlan.style.color='var(--Coolgray)';
    cardYearly.classList.add('hidden');
    cardMonthly.classList.remove('hidden');

};



planCards.forEach((planCard)=> {
    
    planCard.addEventListener('click', () => {
        let bc = 'white';
        if(planCard.style.backgroundColor === 'white'){
            bc = planCard.style.backgroundColor='var(--Magnolia)';
        }else{
            bc = planCard.style.backgroundColor = 'white';
        }
    });

});
