const signUp = document.querySelector("#signup");
const loginForm = document.querySelector('#login-form');

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
    //   mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });
    return response.json(); 

  }

signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const body = document.querySelector('body');
    $(body).empty();
    const signupForm = document.createElement('form');
    signupForm.setAttribute('id', 'signup-form');
    document.body.append(signupForm);

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Name');
    signupForm.appendChild(nameInput);

    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'text');
    emailInput.setAttribute('placeholder', 'email');
    signupForm.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'text');
    passwordInput.setAttribute('placeholder', 'password');
    signupForm.appendChild(passwordInput);

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('placeholder', 'Job Title');
    signupForm.appendChild(titleInput);
    
    const descInput = document.createElement('textarea');
    descInput.setAttribute('placeholder', 'Description');
    signupForm.appendChild(descInput);

    const signMeUpButton = document.createElement('button');
    signMeUpButton.setAttribute('type', 'submit');
    signMeUpButton.textContent = 'sign me up';
    signupForm.appendChild(signMeUpButton);



    signMeUpButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const suName = nameInput.value;
      const suEmail = emailInput.value;
      const suPassword = passwordInput.value;
      const suTitle = titleInput.value;
      const suDesc = descInput.value;
      

      if (suName === '') {
        alert('Please enter your Name');
        return;
      }

      if (suEmail === '') {
        alert('Please enter an email');
        return;
       }
       
       if (suPassword === '') {
        alert('Please enter a password'); 
        return; 
       }
    
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
       if (!emailRegex.test(suEmail)) {
           alert('Please enter valid email');
         return;
       }
    
       if (suPassword.length < 8) {
           alert('Please enter password with atleast 8 characters');
         return;
       }

       try {
        // Register the user and add portfolio info
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: suName,
            email: suEmail,
            password: suPassword,
            title: suTitle,
            description: suDesc,
          }),
        });
    
        if (!response.ok) {
          alert('Failed to register user');
          return;
        }
    
        alert('Registration completed successfully');
      } catch (error) {
        console.error(error);
        alert('An error occurred during registration');
      }
     

  });

})

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
     const email = document.querySelector('#email').value;
     const password = document.querySelector('#password').value;

    if (email === '') {
        alert('Please enter an email');
        return;
       }
       
       if (password === '') {
        alert('Please enter a password'); 
        return; 
       }
    
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
       if (!emailRegex.test(email)) {
           alert('Please enter valid email');
         return;
       }
    
       if (password.length < 8) {
           alert('Please enter password with atleast 8 characters');
         return;
       }
    
    const data = await postData('/api/login', { email, password });

   
    if (data.success) {
        // Navigate to a new page


        const body = document.querySelector('body');
        $(body).empty();
        // document.body.style.backgroundColor = "black";
        const portfolioHead = document.createElement('head-div');
        portfolioHead.setAttribute("id", "portfolio-header");
        portfolioHead.innerHTML = '';

        const portfolioBody = document.createElement('body-container');
        portfolioBody.innerHTML = '';

        $.get('/api/login', (userData) => {
            console.log(userData); // log the response data to the console
            for (let i = 0; i < userData.length; i++) {
                const currentUser = userData[i];
                if (currentUser.email === email) {
                    console.log(currentUser.name);
                    const name = currentUser.name;
                    const nameElem = document.createElement('h1');
                    body.append(portfolioHead);
                    nameElem.innerHTML = `Welcome to your Portfolio, ${name}`;
                    portfolioHead.append(nameElem);
                    const userId = currentUser.id;

                    $.get('/api/portfolio', (portfolioData) => {
                        console.log(portfolioData); // log the response data to the console
                        for (let i = 0; i < portfolioData.length; i++) {
                            const currentPortfolio = portfolioData[i];
                            if (currentPortfolio.user_id === userId) {
                                console.log(currentPortfolio.title);
                                const title = currentPortfolio.title;
                                const titleElem = document.createElement('h2');
                                titleElem.setAttribute('id', 'title-elem');
                                const description = currentPortfolio.description;
                                const descriptionElem = document.createElement('p');
                                descriptionElem.setAttribute('id', 'description-elem');
                                body.append(portfolioBody);
                                titleElem.innerHTML = title;
                                portfolioBody.append(titleElem);
                                descriptionElem.innerHTML = description;
                                portfolioBody.append(descriptionElem);
                                console.log(currentPortfolio.description);
                            }
                        }
                        
                    });
                } 
            
            }
       
            
          });
          

          const updateButton = document.createElement('button');
          updateButton.setAttribute("id", "edit-btn");
          updateButton.textContent = 'edit portfolio';
          portfolioBody.appendChild(updateButton);

          updateButton.addEventListener('click', () => {
           const editForm = document.createElement('form');
           editForm.setAttribute('id', 'edit-form');

           const titleInput = document.createElement('input');
           titleInput.setAttribute('type', 'text');
           titleInput.setAttribute('placeholder', 'New Title');
           editForm.appendChild(titleInput);
           titleInput.value = document.querySelector('#title-elem').textContent;

           const descInput = document.createElement('textarea');
           descInput.setAttribute('placeholder', 'New Description');
           editForm.appendChild(descInput);
           descInput.value = document.querySelector('#description-elem').textContent;


           const saveButton = document.createElement('button');
           saveButton.setAttribute('type', 'submit');
           saveButton.textContent = 'Save Changes';
           editForm.appendChild(saveButton);
           

           const cancelButton = document.createElement('button');
           cancelButton.textContent = 'Cancel';
           editForm.appendChild(cancelButton);

           saveButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const newTitle = titleInput.value;
            const newDescription = descInput.value;
            
            $.get('/api/login', (userData) => {
                for (let i = 0; i < userData.length; i++) {
                    const currentUser = userData[i];
                    if (currentUser.email === email) {
                        const userId = currentUser.id;
                        $.get('/api/portfolio', async (portfolioData) => {
                            for (let i = 0; i < portfolioData.length; i++) {
                                const currentPortfolio = portfolioData[i];
                                if (currentPortfolio.user_id === userId) {
                                    
                                    console.log(userId);
                                }
                            }
                            const response = await fetch(`/api/portfolio/${userId}`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ title: newTitle, description: newDescription }),
                              });
                              
                              if (response.ok) {
                                const portfolioTitle = document.querySelector('#title-elem');
                                const portfolioDescription = document.querySelector('#description-elem');
                
                                portfolioTitle.textContent = newTitle;
                                portfolioDescription.textContent = newDescription;
                
                                document.body.removeChild(editForm);
                                document.body.style.opacity = '1.0';
                              }
                            
                        });
                    } 
                
                }
           
                
              });
           
        
        });


        cancelButton.addEventListener('click', () => {
            editForm.remove();
            document.body.style.opacity = '1';
        });


        document.body.appendChild(editForm);
        document.body.style.opacity = '0.5';
           

            
        });
                       
                        



         
                } else {
                    const errorMessage = document.createElement('p');
                    errorMessage.textContent = 'Login unsuccessful';
                    document.body.appendChild(errorMessage);
                }

         



        
        });




