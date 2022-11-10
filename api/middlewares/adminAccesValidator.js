const adminAccessValidator = async (req, res, next)=>{
   

        if(req.user.role != 'admin'){
            return res.status(403).json({
                msg: "No access"
            })
        }
        next()
}

export { adminAccessValidator };