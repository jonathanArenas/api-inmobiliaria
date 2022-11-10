import joi from 'joi';

const now = Date.now();
const adultAge = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);

const  userSignUpValidator = async (req, res, next) => {

    req.body.role = (req.body.role === undefined || req.body.role === '') ? 'customer':req.body.role  ;
   const userSchema = joi.object({
    firstName: joi.string().empty().min(4).max(30).trim(),
    lastName: joi.string().empty().empty().min(4).max(30).trim(),
    birthDate: joi.date().less(adultAge).greater('1-1-1934'),
    dni: joi.string().empty(''),
    phoneNumber: joi.string().min(8).max(10),
    address: joi.string().required(),
    email: joi.string().email().empty().trim(),
    password: joi.string().empty().min(4).max(30).trim(),
    role: joi.string().default('customer').required(),
    pointContact: joi.array().items(joi.string()).required()
  });

  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      msg: 'bad request, incorrect data',
      error,
    });
  }
};

export { userSignUpValidator };
