const { check, validationResult } = require('express-validator');
exports.productValidation = [
    check('name',"Name is required").isLength({min: 3}).not().isEmpty(),
    check('price',"Price is required and must be numeric").not().isEmpty().isNumeric(),
    check('profit',"Profit is required and must be numeric").not().isEmpty().isNumeric(),
    check('category',"Category is required and must be alphanumeric").isAlphanumeric().not().isEmpty()

]


exports.isRequestedValidated = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.array.length >0){
        return res.status(400).json({ error: errors.array()[0].msg });
    } 
}