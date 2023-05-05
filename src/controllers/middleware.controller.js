const jwt = require('jsonwebtoken');
const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken,process.env.SECRET_KEY, (err, user) =>{
                if(err){
                    res.status(403).json('Token hết hạn');
                }
                req.user = user;
                next();
            });
        }else {
            res.status(401).json('Bạn chưa được xác thực');
        }
    },
    isAdmin: (req, res, next) => {
        const token = req.headers.token;
        if(token){
            // cắt token từ header ra
            const accessToken = token.split(' ')[1];
            const payload =  jwt.decode(accessToken);
        
            if(payload.admin) {
               next()
            }
            else{
                res.status(401).json('Bạn không có quyền');
            }
        }
    },
    isLogin:( req, res, next) => {
        const token = req.headers.token;
        if(token){
            next()
        }else{
            res.status(401).json('Bạn cần đăng nhập');
        }
    }
}


module.exports = middlewareController;