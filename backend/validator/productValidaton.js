const { check, validationResult } = require('express-validator');
exports.productValidation = [
    check('name',"Name is required").not().isEmpty()

]


exports.isRequestedValidated = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.array.length > 0){
        return res.status(400).json({ error: errors.array()[0] });
    }else{
        next();
    }
}