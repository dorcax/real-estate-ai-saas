"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppointmentRequestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_appointment_request_dto_1 = require("./create-appointment-request.dto");
class UpdateAppointmentRequestDto extends (0, mapped_types_1.PartialType)(create_appointment_request_dto_1.CreateAppointmentRequestDto) {
}
exports.UpdateAppointmentRequestDto = UpdateAppointmentRequestDto;
//# sourceMappingURL=update-appointment-request.dto.js.map