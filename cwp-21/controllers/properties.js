const CrudController = require('./crud');

class ProperiesController extends CrudController {
    constructor(propertiesService,cache) {
        super(propertiesService,cache);

        this.readAll = this.readAll.bind(this);
        this.upBinding = this.upBinding.bind(this);
        this.downBinding = this.downBinding.bind(this);

        this.routes['/'] = [{ method: 'get',
            cb: this.readAll }];
        this.routes['/upbinding'] = [{ method: 'post',
            cb: this.upBinding }];
        this.routes['/downbinding'] = [{ method: 'post',
            cb: this.downBinding }];

        this.registerRoutes();
    }
    async readAll(req, res) {
        const properties = await this.service.readChunk(req.params);
        this.cacheService.set(req,properties);
        res.json(properties);
    }
    async upBinding(req, res) {
        await this.service.upBinding(req.body.id,req.body.agentId);

        res.json({ success: true });
    }
    async downBinding(req, res) {
        await this.service.downBinding(req.body.id);

        res.json({ success: true });
    }
}

module.exports = (postsService, cacheService) => {
    const controller = new ProperiesController(
        postsService
    );

    return controller.router;
};