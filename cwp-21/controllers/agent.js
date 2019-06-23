const CrudController = require('./crud');

class UsersController extends CrudController {
    constructor(usersService,cache) {
        super(usersService,cache);

        this.upBinding = this.upBinding.bind(this);
        this.downBinding = this.downBinding.bind(this);
        this.readProperties = this.readProperties.bind(this);

        this.routes['/upbinding'] = [{ method: 'post',
            cb: this.upBinding
        }];

        this.routes['/downbinding'] = [{ method: 'post',
            cb: this.downBinding
        }];

        this.routes['/readProperties']=[{method:'post', cb:this.readProperties}];

        this.registerRoutes();
    }
    async upBinding(req, res) {
        await this.service.upBinding(req.body.id,req.body.officeId);
        res.json({success:true});
    }
    async downBinding(req, res) {
        await this.service.downBinding(req.body.id);
        res.json({success:true});
    }
    async readProperties(req,res){
        let properties = await this.service.readPropertiesByAgentId(req.body.id,req.body.options);
        res.json(properties);
    }
}

module.exports = (usersService) => {
    const controller = new UsersController(
        usersService
    );

    return controller.router;
};