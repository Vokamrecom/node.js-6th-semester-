const CrudService = require('./crud');
const Joi = require('joi');
const schema  = Joi.object().keys({
    title:Joi.string().required(),
    website:Joi.string().required(),
    address:Joi.string().required(),
});

class OfficeService extends CrudService {

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
        let officeAgent = getAgentByOfficeId(id);
        let resualt = super.delete(id);
        downBindingAgent(officeAgent);
        return resualt;
    }

    async upBinding(id,officeId){
        let data = await super.read(id);
        data.officeId = officeId;
        return await super.update(id,data);
    }

    async downBinding(id){
        let data = await super.read(id);
        data.officeId = null;
        let value = await super.update(id,data);
        return value;
    }

    async readAgentsByOfficeId(id,options){
        options = Object.assign({}, this.defaults.readChunk, options);
        let limit = options.limit;
        let offset = (options.page-1)*options.limit;
        let agent = await this.getAgentByOfficeId(id);
        return agent.slice(offset,offset+limit);
    }

    async  getAgentByOfficeId(id){
        let office = await super.read(id);
        return await office.getAgents();
    }
}



async function downBindingAgent(agents) {
    await agents.forEach(async(element)=>{
        await element.update({officeId:null},{field:['officeId']});
    });
}


module.exports = OfficeService;