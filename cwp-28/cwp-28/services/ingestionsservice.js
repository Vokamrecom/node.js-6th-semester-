function IngestionsService(Ingestions) {
  async function readAll(options) {
    return await Ingestions.findAll({ raw: true });
  }
  async function read(id) {
    return Ingestions.findById(id, { raw: true });
  }
  async function create(data) {
      console.log(data);
    return Ingestions.create(data);
  }
  async function update(id, data) {
    await Ingestions.update(data, { where: { id: id }, limit: 1 });
    return await read(id);
  }
  async function deleteF(id) {
    id = parseInt(id);
    const res = await read(id);
    await Ingestions.destroy({ where: { id: id } });
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

module.exports = IngestionsService;
