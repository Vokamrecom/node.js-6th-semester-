const CrudController = require('./crud');

class UsersController extends CrudController {
    constructor(usersService,cache) {
        super(usersService,cache);

        this.readAgent = this.readAgent.bind(this);

        this.routes['/readAgent']=[{method:'post', cb:this.readAgent}];

        this.registerRoutes();
    }

    async readAgent(req,res){
        let properties = await this.service.readAgentsByOfficeId(req.body.id,req.body.options);
        res.json(properties);
    }
}

module.exports = (usersService) => {
    const controller = new UsersController(
        usersService
    );

    return controller.router;
};