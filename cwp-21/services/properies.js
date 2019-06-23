const CrudService = require('./crud');
const Joi = require('joi');
const schema  = Joi.object().keys({
    price:Joi.number().min(0).required(),
    currency:Joi.any().valid('BYN','USD','EUR').required(),
    heading:Joi.required(),
    location:Joi.required(),

});

class PropertiesService extends CrudService {
    async create(data) {
        const {error,value} = await Joi.validate(data,schema);
        if(error===undefined){
            return await super.create(data);
        }else{
            console.log('properties create error valid');
        }
    }
    async update(id, data){
        const {error,value} = await Joi.validate(data,schema);
        if(error===undefined){
           return await super.update(id,data);
        }else{
            console.log('properties update error valid');
        }
    }
    async upBinding(id,agentId){
        let data = await super.read(id);
        data.dataValues.agentId = agentId;
        return await super.update(id,data.dataValues);
    }
    async downBinding(id){
        let data = await super.read(id);
        data.dataValues.agentId = null;
        let value = await super.update(id,data.dataValues);
        return value;
    }
}

module.exports = PropertiesService;