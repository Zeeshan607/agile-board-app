import bcrypt from 'bcryptjs';


export const hashMake=async(pass)=>{
        const salt =await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(pass, salt);
        return hashedPass;
}

export const comparePassword= async (password, hashedPassword)=>{
        const isMatched= await bcrypt.compare(password, hashedPassword);
        return isMatched;
}