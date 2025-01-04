// "use strict";

// document.querySelector('#get1').addEventListener('click', () => {
//     const params = {  // URL Encode
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
//     window.history.pushState( null, '', '/bbs/get/' );
//     const url = "/BBS";
//     fetch( url, params )
//     .then( (response) => {
//         if( !response.ok ) {
//             throw new Error('Error');
//         }
//         return response.json();
//     })
//     .then( (response) => {
//         console.log( response );
//     });
// });

// document.querySelector('#post2').addEventListener('click', () => {
//     const params = {  // URL Encode
//         method: "POST",
//         body:  '',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
//     window.history.pushState( null, '', '/bbs/post/' );
//     const url = "/BBS";
//     fetch( url, params )
//     .then( (response) => {
//         if( !response.ok ) {
//             throw new Error('Error');
//         }
//         return response.json();
//     })
//     .then( (response) => {
//         console.log( response );
//     });
// });

// document.querySelector('#get2').addEventListener('click', () => {
//     const params = {  // URL Encode
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
//     window.history.pushState( null, '', '/bbs/get/1' );
//     const url = "/BBS/1";
//     fetch( url, params )
//     .then( (response) => {
//         if( !response.ok ) {
//             throw new Error('Error');
//         }
//         return response.json();
//     })
//     .then( (response) => {
//         console.log( response );
//     });
// });

// document.querySelector('#put').addEventListener('click', () => {
//     const params = {  // URL Encode
//         method: "PUT",
//         body:  '',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
//     window.history.pushState( null, '', '/bbs/put/1' );
//     const url = "/BBS/1";
//     fetch( url, params )
//     .then( (response) => {
//         if( !response.ok ) {
//             throw new Error('Error');
//         }
//         return response.json();
//     })
//     .then( (response) => {
//         console.log( response );
//     });
// });

// document.querySelector('#delete').addEventListener('click', () => {
//     const params = {  // URL Encode
//         method: "DELETE",
//         body:  '',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
//     window.history.pushState( null, '', '/bbs/delete/1' );
//     const url = "/BBS/1";
//     fetch( url, params )
//     .then( (response) => {
//         if( !response.ok ) {
//             throw new Error('Error');
//         }
//         return response.json();
//     })
//     .then( (response) => {
//         console.log( response );
//     });
// });


"use strict";

document.getElementById('add-task-btn').addEventListener('click', () => {
    const title = document.getElementById('task-title').value;
    const dueDate = document.getElementById('task-date').value;

    fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, dueDate })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const taskList = document.getElementById('task-list');
            const newTask = document.createElement('li');
            newTask.textContent = `${data.task.title} (Due: ${data.task.dueDate})`;
            taskList.appendChild(newTask);
        }
    });
});
