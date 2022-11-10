import joi from 'joi';
const  propertyValidator = async (req, res, next) => {
    const photos = []
    req.files.filter( element => photos.push(element.path));
    req.body.photos = photos;
    
    const propertySchema = joi.object({
    street: joi.string().empty().required() ,
    noExt: joi.string().empty().required(),
    noInt: joi.string().empty(),
    zipCode: joi.string().empty().required() ,
    city: joi.string().empty().required(),
    country: joi.string().empty().required(),
    locality: joi.string().empty().required(),
    typeOffer: joi.string().empty().required(),
    price: joi.number().required(),
    description:joi.string().empty().required() ,
    numBedrooms: joi.string().required(),
    photos:joi.any().required(),
  });

  try {
    await propertySchema.validateAsync( req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      msg: 'bad request, incorrect data',
      error,
    });
  }
};

export { propertyValidator };
