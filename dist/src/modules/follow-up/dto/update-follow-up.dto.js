"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFollowUpDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_follow_up_dto_1 = require("./create-follow-up.dto");
class UpdateFollowUpDto extends (0, mapped_types_1.PartialType)(create_follow_up_dto_1.CreateFollowUpDto) {
}
exports.UpdateFollowUpDto = UpdateFollowUpDto;
//# sourceMappingURL=update-follow-up.dto.js.map