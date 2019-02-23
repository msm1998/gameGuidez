//create-admin
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const adminEmail = adminForm['admin-email'].value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email:adminEmail}).then(result =>{
        console.log(result);
    })
})


// create form
const creatForm = document.querySelector('#create-form');
creatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('guide').add({
        title:creatForm['title'].value,
        content:creatForm['content'].value,
    }).then(()=>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        creatForm.reset();
    },err=>{
      console.log(err.message);      
    })
})

//authstatus
auth.onAuthStateChanged(user =>{
    if(user){
        user.getIdTokenResult().then(idTokenResult =>{
            user.admin = idTokenResult.claims.admin;
        })

        db.collection('guide').onSnapshot(snapshot=>{
            setupGuides(snapshot.docs);
            setupUI(user);
        })
    }
    else{
        setupUI(user);
        setupGuides([]);
    }
})


//signup 
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) =>{

    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        return db.collection('users').doc(cred.user.uid).set({
            bio:signupForm['signup-bio'].value,
        });
    }).then(()=>{
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(err =>{
        signupForm.querySelector('.error').innerHTML = err.message;
    })
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut();
})

//login

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    //user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred =>{
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch(err =>{
        loginForm.querySelector('.error').innerHTML = err.message;
    })


})