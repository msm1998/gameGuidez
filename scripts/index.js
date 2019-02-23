// login details
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const createDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) =>{
    if(user){
        if(user.admin){
            adminItems.forEach(item => item.style.display = 'block');
        }
        //create account info
        db.collection('users').doc(user.uid).get().then(doc =>{
            const html = `
                <div>Logged as ${user.email}</div>
                <div>${doc.data().bio}</div>
                <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
            `;
            createDetails.innerHTML = html;
        })
        
        //login and logout user links
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    else{
        adminItems.forEach(item => item.style.display = 'none');
        createDetails.innerHTML = '';
        //login and logout user links
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}



//function grab data from db
const guideList = document.querySelector('.guides');
const setupGuides = (data) =>{
    if(data.length){
        let html='';
        data.forEach(doc => {
            const guide = doc.data();
            const li = `
                <li>
                    <div class="collapsible-header grey lighten-4">${guide.title}</div>
                    <div class="collapsible-body white">${guide.content}</div>
                </li>
            `;
            html += li;
        });
        guideList.innerHTML = html;
    }
    else{
        guideList.innerHTML = '<h5 class="center-align">Login to view Guidez</h5>';
    }
}


document.addEventListener('DOMContentLoaded',function(){
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});