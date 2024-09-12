import { Request, Response } from "express";
import { paymentService } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {

    const res = await paymentService.confirmService();


    res.send(`<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh;">
  <div style="background-color: #ffffff; padding: 20px; max-width: 500px; width: 100%;">
    <h1 style="text-align: center; color: #000000;">Payment Confirmed</h1>
    <p style="text-align: center; font-size: 16px; margin-bottom: 20px;">Thank you for your payment. Your transaction has been successfully completed.</p>
    
    <div style="margin-bottom: 20px;">
      <h2 style="font-size: 18px; color: #555;">Payment Details</h2>
      <p style="margin: 5px 0;"><strong>Transaction ID:</strong> <span style="color: #333;">TSXID1234567890</span></p>
      <p style="margin: 5px 0;"><strong>Amount Paid:</strong> <span style="color: #333;">$100.00</span></p>
      <p style="margin: 5px 0;"> <strong>Payment Method:</strong> <span style="color: #333;">Credit Card</span></p>
    </div>
  </div>
</body>`);


};

const cancelController = async (req: Request, res: Response) => {

    const res = await paymentService.confirmService();


    res.send(`<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh;">
  <div style="background-color: #ffffff; padding: 20px; max-width: 500px; width: 100%; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <h1 style="text-align: center; color: #e53935;">Payment Canceled</h1>
    <p style="text-align: center; font-size: 16px; margin-bottom: 20px;">We're sorry, but your payment has been canceled. If you need further assistance, please contact support.</p>
    
    <div style="margin-bottom: 20px;">
      <h2 style="font-size: 18px; color: #555;">Cancellation Details</h2>
      <p style="margin: 5px 0;"><strong>Transaction ID:</strong> <span style="color: #333;">TSXID1234567890</span></p>
      <p style="margin: 5px 0;"><strong>Amount Attempted:</strong> <span style="color: #333;">$100.00</span></p>
      <p style="margin: 5px 0;"> <strong>Payment Method:</strong> <span style="color: #333;">Credit Card</span></p>
    </div>
    
    <div style="text-align: center;">
      <a href="/" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #e53935; border-radius: 4px; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Return to Homepage</a>
    </div>
  </div>
</body>`);


};

export const paymentController = {
    confirmationController,
    cancelController
};