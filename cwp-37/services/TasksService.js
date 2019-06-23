function TasksService(Items) {
  async function readAll() {
    return await Items.findAll({ attributees: ["id", "text", "completed"] });
  }

  async function read(id) {
    return await Items.findById(id, {
      attributees: ["id", "text", "completed"]
    });
  }

  async function create(body) {
    console.log(body);
    const text = body.text;
    const completed = body.completed || false;
    const item = await Items.create({ text, completed });
    const temp = await item.get({ plaint: true });
    const result = await read(temp.id);
    return { item: result };
  }

  async function deleteF(id) {
    return await Items.destroy({ where: { id: id } });
  }

  async function update(id, body) {
    const text = body.text;
    const completed = body.completed || false;
    const item = { text, completed };
    await Items.update(item, { where: { id: id }, limit: 1 });
    return await read(id);
  }

  async function complete(id, body) {
    const completed = body.completed || false;
    const item = { completed };
    await Items.update(item, { where: { id: id }, limit: 1 });
    return await read(id);
  }

  return { read, readAll, create, deleteF, update, complete };
}
module.exports = TasksService;
