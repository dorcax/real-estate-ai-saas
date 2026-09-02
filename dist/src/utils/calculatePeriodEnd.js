"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePeriodEnd = void 0;
const calculatePeriodEnd = (interval) => {
    const now = new Date();
    switch (interval) {
        case 'MONTHLY':
            return new Date(now.setMonth(now.getMonth() + 1));
        case 'QUARTLY':
            return new Date(now.setMonth(now.getMonth() + 3));
        case 'Yearly':
            return new Date(now.setFullYear(now.getFullYear() + 1));
        default:
            return new Date(now.setMonth(now.getMonth() + 1));
    }
};
exports.calculatePeriodEnd = calculatePeriodEnd;
//# sourceMappingURL=calculatePeriodEnd.js.map