const path = require('path');
const express = require('express');
const multer = require('multer');


const Ajv = require('ajv');
const ajv = new Ajv();

const router = express.Router();

const uploadDir = path.join(__dirname, '../public/uploads/');
//console.log(uploadDir)
const upload = multer({ dest: uploadDir });

router.get('/', (req,res) =>{
    res.render('page')
})


const schema = {
    type: 'object',
    properties: {
            name: {
            type: 'string',
            minLength: 1,
            maxLength: 15
        },
        surname: {
            type: 'string',
            minLength: 1,
            maxLength: 10
        },
        birthday: {
            type: 'string',
            pattern: '^(19|20)[0-9][0-9]\.[0-1][0-9]\.[0-3][0-9]$'// регулярка дн
            },
    },
    additionalProperties: false,
    required: ['name', 'surname', 'birthday'],
};


router.post('/infoUser', upload.single('avatar'), (req, res) => {
    console.log('body:', req.body);

   
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (!valid){
        res.json({status: "validate error", error: validate.errors});
    }
    console.log('valid:', valid);
    console.log('error:', validate.errors);
    res.json({status:"ok"});
});



module.exports = router;