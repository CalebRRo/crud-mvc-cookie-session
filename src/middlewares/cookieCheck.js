module.exports = (req,res,next) => {
    if(req.cookies.liebre16){
        req.session.userLogin = req.cookies.liebre16
    }
    next()
}