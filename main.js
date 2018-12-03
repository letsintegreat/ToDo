/* Coded by Harshit Seksaria */

// Instance of a div to add a work
const addButton = document.getElementById("addbutton");

// Instance of work list
const list = document.getElementById('workslist');

// Instance of title div
const title = document.getElementById('text');

// Number of works
let works = 0;

// Record of current works
let workTitles = [];

// Function to add a beautiful TypeWriter effect
const type = function(target, s, interval) {
    if (s.length === 0) {
        return;
    }

    target.innerHTML += s[0];
    return setTimeout(() => type(title, s.slice(1), interval), interval);
}

// Function to remove any work at the given index
const removeWork = function (i) {
    const toBeDeleted = document.getElementById('item' + i);
    if (workTitles.length === 1) {
        workTitles.pop();
    } else {
        workTitles.splice(i, 1);
    }

    toBeDeleted.style.transform = 'scale(0)'
    setTimeout(function () {
        renderWorks(false);
    }, 1500);

    setWorks();
}

// Function to update work in localStorage
const setWorks = function () {
    localStorage.setItem('works', workTitles.toString());
}

// Function to update the list
const renderWorks = function (checkAnim) {
    list.textContent = "";
    workTitles.forEach((workTitle, i) => {
        if (checkAnim) {
            addWork(workTitle, i, i === (workTitles.length - 1), false);
        } else {
            addWork(workTitle, i, false, false);
        }
    })

    document.getElementsByTagName('h4')[0].textContent = workTitles.length === 0
        ? "No works to do."
        : "Works to do:"
}

// Function to add any work in list
const addWork = function (title, i, anim, addStorage) {
    let li = document.createElement('li');
    let div = document.createElement('div');
    let span = document.createElement('span');

    li.id = 'item' + i;

    div.className = 'works';
    div.id = 'works' + i;
    div.textContent = title;
    div.title = 'Click to remove';

    // Adding a onclick on the work so that whenever
    // users click on that then that would gets removed
    div.onclick = () => removeWork(i);

    span.className = 'works remove';
    span.id = 'remove' + i;
    span.textContent = 'Done';
    span.addEventListener('click', () => removeWork(i));

    li.appendChild(div);
    li.appendChild(span);

    list.appendChild(li);

    if (anim) {
        li.style.transform = 'scale(0)';
        li.style.display = 'block';

        setTimeout(function () {
            li.style.transform = 'scale(1)';
        }, 1)
    } else {
        li.style.display = 'block';
    }

    if (addStorage) {
        workTitles.push(title);
        setWorks();
    }
}

// Function to prompt user to add a new work
const promptNewWork = function () {
    const newWork = prompt('Add new work.');

    if (newWork)
        workTitles.push(newWork)
    else
        console.log('Invalid Work');

    setWorks();
    renderWorks(true);
}

// Function to load works from localStorage
const getWorks = function () {
    
    // Checking if localStorage.getItem() reuturns null
    if (localStorage.getItem('works')) {
        workTitles = localStorage.getItem('works').length > 0
            ? localStorage.getItem('works').split(',')
            : [];
    } else {
        workTitles = [];
    }

    workTitles.forEach((title, i) => {
        addWork(title, i, true, false);
    })

    document.getElementsByTagName('h4')[0].textContent = workTitles.length > 0 
        ? "Works to do:"
        : "No works to do."
}

// ClickListener for addButton
addButton.addEventListener('click', () => promptNewWork());

// Calling type() to start TypeWriter effect
type(title, "To-do Application", 250);

// Calling getWorks() to load works from localStorage
getWorks();
