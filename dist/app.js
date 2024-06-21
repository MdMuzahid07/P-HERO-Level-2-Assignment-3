"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./app/modules/user/user.routes");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = require("./app/modules/auth/auth.routes");
const facility_routes_1 = require("./app/modules/facility/facility.routes");
const bookings_routes_1 = require("./app/modules/bookings/bookings.routes");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// application routes
app.use('/api', user_routes_1.UserRoutes);
app.use('/api', auth_routes_1.LoginRoute);
app.use('/api', facility_routes_1.FacilityRoutes);
app.use('/api', bookings_routes_1.BookingRouter);
// test route
app.get('/', (req, res) => {
    res.send('Server running');
});
// global error handler
app.use(globalErrorHandler_1.default);
// not found route
app.use(notFound_1.default);
exports.default = app;
