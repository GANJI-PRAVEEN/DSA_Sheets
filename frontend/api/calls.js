import dotenv from 'dotenv'
dotenv.config();

export const createUser = async({
    name,
    email,
    password
}) => {
    const res = fetch(`${process.env.URL}create-user`,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
            name,
            email,
            password
        })
    });
    return res.json();

}