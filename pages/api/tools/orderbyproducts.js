import { mongooseConnect } from "@/lib/mongoose";

const handle = async (req,res) => {
    await mongooseConnect();
}

export default handle;