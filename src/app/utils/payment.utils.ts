/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../config";


export const initiatePayment = async (paymentData: any) => {
    const res = await axios.post(config.aamarpay_payment_url as string, {
        store_id: config.aamarpay_store_id,
        signature_key: config.aamarpay_signature_key,
        tran_id: paymentData?.transactionId,
        success_url: "http://www.merchantdomain.com/sucesspage.html",
        fail_url: "http://www.merchantdomain.com/failedpage.html",
        cancel_url: "http://www.merchantdomain.com/cancellpage.html",
        amount: paymentData?.payableAmount,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: paymentData?.name,
        cus_email: paymentData?.email,
        cus_add1: paymentData?.address,
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: "N/A",
        cus_country: "N/A",
        cus_phone: paymentData?.phone,
        type: "json"
    });

    return res?.data;
};