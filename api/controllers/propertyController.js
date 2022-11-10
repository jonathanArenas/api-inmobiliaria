import Property from '../models/property.js';


const create = async (req, res)=>{
    try {
        req.body.user = req.user.id;
        const property = await Property.create(req.body);
        return res.status(200).json({
          msg: 'Property created suscefully',
          property,
        });
      } catch (error) {
        res.status(500).json({
          msg: 'Error to created property',
          error,
        });
      }
}

const read = async (req, res)=>{
    const {id} = req.params
    try {
        const property = await Property.findById(req.body);
        return res.status(200).json({
          msg: 'Property created suscefully',
          property,
        });
      } catch (error) {
        res.status(500).json({
          msg: 'Error to created property',
          error,
        });
      }
}


const update = async (req, res)=>{
    const {id} =  req.params;
    try {
        const property = await Property.findByIdAndUpdate(id, req.body ,{
            new: true
        });
        return res.status(200).json({
          msg: 'Property updated suscefully',
          property,
        });
      } catch (error) {
        res.status(500).json({
          msg: 'Error to updated property',
          error,
        });
      }
}

const softDelete = async (req, res)=>{
    try {
        const property = await Property.create(req.body);
        return res.status(200).json({
          msg: 'Property created suscefully',
          property,
        });
      } catch (error) {
        res.status(500).json({
          msg: 'Error to created property',
          error,
        });
      }
}

export {create, read, update, softDelete}
