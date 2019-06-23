function FoodsService(Foods) {
    async function readAll(options) {
      return await Foods.findAll({ raw: true });
    }
    async function read(id) {
      return Foods.findById(id, { raw: true });
    }
    async function create(data) {
      return Foods.create(data);
    }
    async function update(id, data) {
      await Foods.update(data, { where: { id: id }, limit: 1 });
      return await read(id);
    }
    async function deleteF(id) {
      id = parseInt(id);
      const res = await read(id);
      await Foods.destroy({ where: { id: id } });
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
  
  module.exports = FoodsService;