"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.Role_key = void 0;
const common_1 = require("@nestjs/common");
exports.Role_key = "roles";
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.Role_key, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map