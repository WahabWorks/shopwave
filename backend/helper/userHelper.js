import bcrypt from "bcrypt";

const encryptPassword = async (plainPassword)=>{
    const saltrounds = 10;
    const encryptedPassword = await bcrypt.hash("plainPassword", saltrounds);
    return encryptedPassword;
}

export {encryptPassword};