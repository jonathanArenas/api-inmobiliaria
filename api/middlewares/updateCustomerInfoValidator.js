import joi from 'joi';

const now = Date.now();
const adultAge = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);

const updateCustomerInfoValidator = async (req, res, next) => {
  const userSchema = joi.object({
    firstName: joi.string().empty().min(4).max(30).trim(),
    lastName: joi.string().empty().empty().min(4).max(30).trim(),
    birthDate: joi.date().less(adultAge).greater('1-1-1934'),
    dni: joi.string().empty(''),
    phoneNumber: joi.string().min(8).max(10),
    address: joi.string().empty(),
    email: joi.string().email().empty().trim(),
    password: joi.string().empty().min(4).max(30).trim(),
    oldPassword: joi.string().when('password', {
      is: joi.exist(),
      then: joi.string().empty().min(4).max(30).trim().required(),
    }),
    pointContact: joi.array().items(joi.string())
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

export { updateCustomerInfoValidator };
