"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const authGuard_guard_1 = require("../guard/authGuard.guard");
const roleGuard_1 = require("../guard/roleGuard");
const roles_decorator_1 = require("./roles.decorator");
const Auth = (roles) => {
    if (!roles || roles.length === 0) {
        return (0, common_1.applyDecorators)((0, common_1.UseGuards)(authGuard_guard_1.AuthGuard));
    }
    return (0, common_1.applyDecorators)((0, roles_decorator_1.Roles)(...roles), (0, common_1.UseGuards)(authGuard_guard_1.AuthGuard, roleGuard_1.RoleGuard));
};
exports.Auth = Auth;
exports.AuthUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user;
});
//# sourceMappingURL=auth.decorator.js.map