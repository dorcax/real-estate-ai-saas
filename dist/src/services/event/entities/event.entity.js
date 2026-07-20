"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailJob = void 0;
var MailJob;
(function (MailJob) {
    MailJob["VERIFY_EMAIL"] = "send-verification-email";
    MailJob["RESET_PASSWORD"] = "send-reset-password-email";
    MailJob["WELCOME"] = "send-welcome-email";
    MailJob["PROPERTY_APPROVED"] = "send-property-approved-email";
    MailJob["BOOKING_CONFIRMATION"] = "send-booking-confirmation-email";
    MailJob["PAYMENT_RECEIPT"] = "send-payment-receipt-email";
})(MailJob || (exports.MailJob = MailJob = {}));
//# sourceMappingURL=event.entity.js.map