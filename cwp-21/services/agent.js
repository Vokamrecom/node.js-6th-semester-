const CrudService = require('./crud');

const Joi = require('joi');
const schema  = Joi.object().keys({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    tel:Joi.string().required(),
});

class AgentService extends CrudService {

    async create(data) {
        const {error,value} = await Joi.validate(data,schema);
        if(error===undefined){
            return await super.create(data);
        }else{
            console.log('Agent create error valid');
        }
    }

    async update(id, data){
        const {error,value} = await Joi.validate(data,schema);
        if(error===undefined){
            return await super.update(id,data);
        }else{
            console.log('Agent update error valid');
        }
    }

    async delete(id){
        let agentProperties = getPropertiesByAgentId(id);
        let resualt =super.delete(id);
       downBindingProperties(agentProperties);
       return resualt;
    }

    async upBinding(id,officeId){
        let data = await super.read(id);
        data.dataValues.officeId = officeId;
        return await super.update(id,data.dataValues);
    }

    async downBinding(id){
        let data = await super.read(id);
        data.dataValues.officeId = null;
        let value = await super.update(id,data.dataValues);
        return value;
    }

    async readPropertiesByAgentId(id,options){
        options = Object.assign({}, this.defaults.readChunk, options);
        let limit = options.limit;
        let offset = (options.page-1)*options.limit;
        let propeties =await this.getPropertiesByAgentId(id);
        return propeties.slice(offset,offset+limit);
    }

    async  getPropertiesByAgentId(id) {
        let agent =  await super.read(id);
        return await agent.getProp();
    }
}



async function downBindingProperties(properties) {
    await properties.forEach(async(element)=>{
        await element.update({agentId:null}, {fields: ['agentId']});
    });
}

module.exports = AgentService;