const {AbilityBuilder, Ability} = require("@casl/ability");

const abilityGuest = AbilityBuilder.define((can, cannot) => {
    can("read", [
        "/api/repos",
        "/api/repos/commits",
        "/api/repos/*",
        "/api/repos/commits/*"
    ]);
});

const abilityMember = AbilityBuilder.define((can, cannot) => {
    can("read", [
        "/api/repos",
        "/api/repos/commits",
        "/api/repos/*",
        "/api/repos/commits/*"
    ]);
    can("create", ["/api/repos/commits/create", "/api/repos/create"]);
    can("update", ["/api/repos/commits/*/update", "/api/repos/*/update"]);
});

const abilityModerator = AbilityBuilder.define((can, cannot) => {
    can("read", [
        "/api/repos",
        "/api/repos/commits",
        "/api/repos/*",
        "/api/repos/commits/*"
    ]);

    can("update", ["/api/repos/commits/*/update", "/api/repos/*/update"]);
    can("delete", ["/api/repos/commits/*", "/api/repos/*"]);
});

function checkAbilitiesPrivate(role, path, method) {
    if (role === "guest") {
        return check(abilityGuest, path, method);
    } else if (role === "member") {
        return check(abilityMember, path, method);
    } else if (role === "moderator") {
        return check(abilityModerator, path, method);
    }
    return false;
}

function check(ability, url, method) {
    if (method === "GET") {
        url = url.replace(/\/api\/repos(\/commits)*\/.*/, "/api/repos$1/*");
        return ability.can("read", url);
    } else if (method === "DELETE") {
        url = url.replace(/\/api\/repos(\/commits)*\/.*/, "/api/repos$1/*");
        let result = ability.can("delete", url);
        return result;
    } else if (method === "POST") {
        url = url
            .replace(
                /\/api\/repos\/commits\/.+\/update/,
                "/api/repos/commits/*/update"
            )
            .replace(/\/api\/repos\/.+\/update/, "/api/repos/*/update");

        if (url.endsWith("create")) {
            let result = ability.can("create", url);
            return result;
        } else if (url.endsWith("update")) {
            let result = ability.can("update", url);
            return result;
        }
    }
    return false;
}

function checkAbilities(req, res, next) {
    let fullUrl = String(req.originalUrl);
    let index = fullUrl.indexOf("?");
    let url = fullUrl;
    if (index !== -1) {
        url = fullUrl.substring(0, index);
    }
    if (url[url.length - 1] === "/") {
        url = url.substring(0, url.length - 1);
    }
    let role = req.query.role;
    if (role === undefined && req.body !== undefined) {
        role = req.body.role;
    }
    if (role === undefined) {
        role = "guest";
    }
    const isCan = checkAbilitiesPrivate(String(role), url, req.method);
    if (isCan) {
        next();
    } else {
        res.statusCode = 403;
        res.json({error: 403});
    }
}

module.exports = {
    checkAbilities: checkAbilities,
    rules: function (req, res) {
        res.json({
            rules: {
                guest: abilityGuest.rules,
                member: abilityMember.rules,
                moderator: abilityModerator.rules
            }
        });
    }
};
