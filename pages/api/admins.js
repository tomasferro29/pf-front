import { mongooseConnect } from "@/lib/mongoose"
import { Admin } from "@/models/Admin";

const handle = async(req,res) => {
    await mongooseConnect();

    if(req.method ==='GET'){
        const {email} = req.query;
        if(await Admin.findOne({email})){
            res.json({success:true});
        }else{
            res.status(400).json({message:'Is not a admin'});
        }
    }

}

export default handle