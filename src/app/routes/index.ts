// import express from "express";
// import { UserRoutes } from "../modules/user/user.routes";
// import { LoginRoute } from "../modules/auth/auth.routes";
// import { FacilityRoutes } from "../modules/facility/facility.routes";
// import { BookingsRouter } from "../modules/bookings/bookings.routes";



// const router = express.Router();

// app.use("/api", UserRoutes);
// app.use("/api", LoginRoute);
// app.use("/api", FacilityRoutes);
// app.use("/api", BookingsRouter);

// const moduleRoutes = [
//     {
//         path: "/users",
//         route: UserRoutes
//     },
//     {
//         path: "/auth",
//         route: LoginRoute
//     },
//     {
//         path: "/facilities",
//         route: FacilityRoutes
//     },
//     {
//         path: "/bookings",
//         route: BookingsRouter
//     }
// ];


// moduleRoutes.forEach((route) => router.use(route.path, route.route));


// export default router;