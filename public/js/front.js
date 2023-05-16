const img = document.querySelector('.img');
const formEl = document.querySelector('.form');



formEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const infoUser = () => {
        let error;
        if (!error) {
            const result = axios.post('/infoUser', formData);
            // те що нам приходить на сервер
        
            //console.log('result:', result.data)	
          }
          // якщо щось пішло не так то ловимо помилку
           else if (error) {
            console.error(error); 
          }
    }
    infoUser();
    const name = formData.get('name');
    const surname = formData.get('surname');
    const birthday = formData.get('birthday');

    const avatar = formData.get('avatar');
    const reader = new FileReader();

    const readFile = await new Promise((resolve) => {
        reader.onload = (ev) => {
            const {result} = ev.target;
            resolve(result);
        }
        reader.readAsDataURL(avatar);
    });
    img.src = readFile;
 
    
});
