export let data = [];

//to add the user logged in
export const addUser = (email) => {
    return (new Promise((resolve, reject) => {
        if (!email) {
            reject(new Error('Please provide email'));
        }
        else {
            data = [];
            data.push(email);
            setTimeout(resolve(true), 250);
        }
    }));
}