import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import NotFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import { LoginRoute } from "./app/modules/auth/auth.routes";
import { FacilityRoutes } from "./app/modules/facility/facility.routes";
import { BookingsRoutes } from "./app/modules/bookings/bookings.routes";
import { paymentRoutes } from "./app/modules/payment/payment.routes";
import { ProductRoutes } from "./app/modules/products/product.routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://playtime-pro.vercel.app", "http://localhost:4173"], credentials: true
}));
app.use(cookieParser());

// application routes
app.use("/api", UserRoutes);
app.use("/api", LoginRoute);
app.use("/api", FacilityRoutes);
app.use("/api", BookingsRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/payment", paymentRoutes);

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(NotFound);

export default app;
