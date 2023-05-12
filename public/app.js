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

        const body = document.querySelector('body');
        $(body).empty();

        const portfolioHead = document.createElement('div');
        portfolioHead.setAttribute("id", "portfolio-header");
        portfolioHead.innerHTML = '';

        const portfolioBody = document.createElement('container');
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
                                const description = currentPortfolio.description;
                                const descriptionElem = document.createElement('p');
                                body.append(portfolioBody);
                                titleElem.innerHTML = title;
                                portfolioBody.append(titleElem);
                                descriptionElem.innerHTML = description;
                                portfolioBody.append(descriptionElem);
                                console.log(currentPortfolio.description);
                            }
                        }
                        // your code to handle the portfolio data goes here
                    });
                } 
            
            }
       
            
          });
          




          
    //---------------------------- "Login Successful" -----------------------------------------

        // const message = document.createElement('p');
        //     message.textContent = 'Login successful';
        //     document.body.appendChild(message);
    
        } else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Login unsuccessful';
            document.body.appendChild(errorMessage);
        }

    //---------------------------- "Login Successful" -----------------------------------------



    //------------------------- create and append portfolio items -----------------------------

        // const container = document.createElement('container');
        // container.innerHTML = '';

        // const portfolioItems = await fetch('/api/portfolio', {
            // headers: {
            //   Authorization: `Bearer ${data.token}`,
            // },
        //   }).then((res) => res.json());

        //   const portfolioDiv = document.createElement('div');
        //   const portfolioList = document.createElement('ul');
      
        //   portfolioItems.forEach((item) => {

        //     const title = document.createElement('h2');
        //     title.textContent = item.title;

        //     const description = document.createElement('p');
        //     description.textContent = item.description;
        //     const listItem = document.createElement('li');
        //     listItem.appendChild(title);
        //     listItem.appendChild(description);
        //     portfolioList.appendChild(listItem);
        //   });
        //     body.append(container);
        //     portfolioDiv.appendChild(portfolioList);
        //     container.appendChild(portfolioDiv);
          
        // } else {
        //   const errorMessage = document.createElement('p');
        //   errorMessage.textContent = 'Login unsuccessful';
        //   document.body.appendChild(errorMessage);
        // }
    //     const message = document.createElement('p');
    //     message.textContent = 'Login successful';
    //     document.body.appendChild(message);

    // } else {
    //     const errorMessage = document.createElement('p');
    //     errorMessage.textContent = 'Login unsuccessful';
    //     document.body.appendChild(errorMessage);
    // }

 //------------------------- create and append portfolio items -----------------------------
   
});