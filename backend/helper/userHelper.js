import bcrypt from "bcrypt";

const encryptPassword = async (plainPassword)=>{
    const saltRounds = 10;
    const encryptPassword = await bcrypt.hash(plainPassword, saltRounds);
    return encryptPassword;
}

const matchPassword = async (userPassword,hashedPassword)=>{
 return bcrypt.compare(userPassword,hashedPassword);
};

export {encryptPassword,matchPassword}