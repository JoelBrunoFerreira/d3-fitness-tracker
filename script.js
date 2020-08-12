// DOM elements
const btns = document.querySelectorAll('button');
const form = document.querySelector('form');
const formAct = document.querySelector('form span');
const input = document.querySelector('input');
const error = document.querySelector('.error');

let activity = 'cycling';

btns.forEach(btn => {
    btn.addEventListener('click', e => {
        // Get activity
        activity = e.target.dataset.activity;

        // Remove and Add active class
        btns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Set id of input field
        input.setAttribute('id', activity);

        // Set text of form span
        formAct.textContent = activity;

        // Call the update function
        update(data);
    });
});

// Form submit
form.addEventListener('submit', e => {
    // Prevent Default action
    e.preventDefault();

    const distance = parseInt(input.value);
    if(distance) {
        db.collection('activities').add({
            distance: distance,
            activity: activity,
            date: new Date().toString()
        }).then(()=> {
            error.textContent = '';
            input.value = '';
        });
    } else {
        error.textContent = 'Please enter a valid distance!';
    }
});

