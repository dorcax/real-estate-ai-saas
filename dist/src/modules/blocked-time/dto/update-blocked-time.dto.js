"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlockedTimeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_blocked_time_dto_1 = require("./create-blocked-time.dto");
class UpdateBlockedTimeDto extends (0, mapped_types_1.PartialType)(create_blocked_time_dto_1.CreateBlockedTimeDto) {
}
exports.UpdateBlockedTimeDto = UpdateBlockedTimeDto;
//# sourceMappingURL=update-blocked-time.dto.js.map