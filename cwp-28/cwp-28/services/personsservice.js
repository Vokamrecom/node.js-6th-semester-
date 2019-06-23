function PersonsService(Persons) {
  async function readAll() {
    return await Persons.findAll({ raw: true });
  }
  async function read(id) {
    return Persons.findById(id, { raw: true });
  }
  async function create(data) {
    return Persons.create(data);
  }
  async function update(id, data) {
    await Persons.update(data, { where: { id: id }, limit: 1 });
    return await read(id);
  }
  async function deleteF(id) {
    id = parseInt(id);
    const res = await read(id);
    await Persons.destroy({ where: { id: id } });
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

module.exports = PersonsService;
