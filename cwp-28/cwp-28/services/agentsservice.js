function AgentsService(Agents) {
    async function readAll(options) {
      return await Agents.findAll({ raw: true });
    }
    async function read(id) {
      return Agents.findById(id, { raw: true });
    }
    async function create(data) {
      return Agents.create(data);
    }
    async function update(id, data) {
      await Agents.update(data, { where: { id: id }, limit: 1 });
      return await read(id);
    }
    async function deleteF(id) {
      id = parseInt(id);
      const res = await read(id);
      await Agents.destroy({ where: { id: id } });
      return res;
    }
    return {
      readAll,
      read,
      create,
      update,
      deleteF
    };
  }
  
  module.exports = AgentsService;