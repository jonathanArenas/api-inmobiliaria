import Property from '../models/property.js';

//CUSTOMER
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
// READ PROPERTIES  ADMIN
const list = async (req, res)=>{

    try {
        const property = await Property.find({}).populate('user');
        return res.status(200).json({
          msg: 'Request Okay',
          property,
        });
      } catch (error) {
        res.status(500).json({
          msg: 'Error to query property',
          error,
        });
      }
}


//READ PROPERTY FOR ADMIN
const read = async (req, res)=>{
    const {id} = req.params
    try {
        const property = await Property.findById(id).populate('user');
        return res.status(200).json({
          msg: 'Request Okay',
          property,
        });
      } catch (error) {
        res.status(500).json({
          msg: 'Error to query property',
          error,
        });
      }
}

//READ PROPERTIES FOR CUSTOMER
const listPropertyCustomer = async (req, res)=>{
    try {
        const property = await Property.find({
            user: req.user.id
        }, {user: 0}).populate('message');
        return res.status(200).json({
          msg: 'Request Okay',
          property,
        });
      } catch (error) {
        res.status(500).json({
          msg: 'Error to query property',
          error,
        });
      }
}

//READ PROPERTY FOR CUSTOMER
const readPropertyCustomer = async (req, res)=>{
    const idProperty = req.params.id
    const userId = req.user.id
    try {
        const property = await Property.find({
            $and : [ 
                {
                    _id: idProperty 
                },{
                    user: userId
                } ]
        }, {user: 0}).populate('message');
        
        return res.status(200).json({
                msg: 'Request Okay',
                property,
        });
      
       
      } catch (error) {
        res.status(500).json({
          msg: 'Error to query property',
          error,
        });
      }
}

//CUSTOMER
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

const updateCustomer = async (req, res) =>{
    const idProperty = req.params.id
    const userId = req.user.id
    try {
        const property = await Property.findOneAndUpdate({ $and : [ 
            {
                _id: idProperty 
            },{
                user: userId
            } ]
        }, req.body , {new: true,})
        return res.json ({
            msg: 'Property updated suscefully',
        })
      } catch (error) {
        res.status(500).json({
          msg: 'Error to updating property',
          error: error
        });
      }
}
//SOFTDELETE FOR CUSTOMER
const removeCustomer = async (req, res)=>{
    const idProperty = req.params.id
    const userId = req.user.id
    try {
        const softDelete = await Property.findOneAndUpdate({ $and : [ 
            {
                _id: idProperty 
            },{
                user: userId
            } ]
        }, {isDeleted: true,}, {new: true,})
        return res.json ({
            msg: 'Property deleted suscefully',
        })
      } catch (error) {
        res.status(500).json({
          msg: 'Error to deleting property',
          error: error
        });
      }
}

//SOFTDELETE FOR ADMIN
const remove = async (req, res)=>{
    const {id} = req.params
    try {
        const softDelete = await Property.findByIdAndUpdate(id, {isDeleted: true,}, {new: true,})
        return res.json ({
            msg: 'Property deleted suscefully',
        })
      } catch (error) {
        res.status(500).json({
          msg: 'Error to deleting property',
          error: error,
        });
      }
}

const filter = async(req, res)=>{
    let filter = {};
    let minPrice = {};
    let maxPrice = {};
    if(req.query.minPrice || req.query.maxPrice){
        req.query.price = undefined
        if(req.query.maxPrice){
           maxPrice = { $lte:  req.query.maxPrice  }  
           delete req.query.maxPrice
        }
        if(req.query.minPrice){
          minPrice = {$gte: req.query.minPrice}
          delete req.query.minPrice
        }

        filter.prince = {
          ...minPrice,
          ...maxPrice
        }
    }else{
      filter.prince = {$eq: req.query.price}
    }

//max and min Rooms
    if(req.query.minRooms || req.query.maxRooms){
        req.query.rooms = undefined

        if(req.query.minRooms){
          filter.numBedrooms = { $gte:  req.query.minRooms  }  
          delete req.query.minRooms
        }

        if(req.query.maxRooms){
          const max = {$lte: req.query.maxRooms}
          filter.numBedrooms = {
            ...filter.numBedrooms,
            ...max
          }  
          delete req.query.maxRooms
        }
    }else{
      filter.numBedrooms = {$eq: req.query.rooms}
    }
    filter = {
      ...filter,
      ...req.query
    }

    try{
      const property = await Property.find({filter},{_id: 1, photos: 1});
      return res.status(200).json({
        msg: 'Request Okay',
        properties: property,
      });
    }catch(error){
      res.status(500).json({
        msg: 'Error to query property',
        error,
      });
    }
/*
    try {
        const property = await Property.find({filter}, {user: 0}).populate('user');
        return res.status(200).json({
          msg: 'Request Okay',
          property,
        });
      } catch (error) {
        res.status(500).json({
          msg: 'Error to query property',
          error,
        });
      }*/
    
}
export {
    create,
    read,
    update,
    updateCustomer,
    list,
    readPropertyCustomer,
    listPropertyCustomer,
    removeCustomer,
    remove,
    filter
}
