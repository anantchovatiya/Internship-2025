"use client";
import React, { useState } from 'react'
import Script from 'next/script';
import { initiatePayment } from '@/actions/Useraction';
import { useSession } from 'next-auth/react';
import { fetchpayments, fetchuser } from '@/actions/Useraction';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Share from './Share/Share';

export const PaymentPage =  ({username}) => {
  let { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
    const [currentuser, setcurrentuser] = useState({});
    const [payments, setpayments] = useState([]);
    useEffect(() => {
      if(searchParams.get('payment') == 'success') {
        toast('Thankyou for your Support!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });

          router.push(`/${username}`);
      }},[]);
    useEffect(() => {
        getdata();
    },[]);
    const getdata = async () => {

      let u = await fetchuser(username);

      setcurrentuser(u);
      let dbpayments = await fetchpayments(username);

      setpayments(dbpayments);

    }
    // const { data: session } = useSession();
    const handlechange = (e) => {
        setpaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
    };
    const [paymentForm, setpaymentForm] = useState({name: '', message: '', amount: ''});
    const pay = async (amount) => {
        let a = await initiatePayment(amount, username, paymentForm);

        let orderId = a.id;

        var options = {
            "key": currentuser.razorpayId, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Fuel the chai!", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`, //Pass the same callback URL used in Step 1
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Anant Chovatiya", //your customer's name
                "email": "anantchovatiya@gmail.com",
                "contact": "9428871141" //Provide the customer's phone number for better conversion rates
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }

        }
        var rzp1 = new Razorpay(options);

    rzp1.open();
    // e.preventDefault();

};
    return (
        <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
<div className="flex justify-center w-full items-center md:h-16 mb-3 bg-black text-white">
<Share />
</div>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>




            <div className="cover w-full relative">
      <img
        className="object-cover h-64 md:h-80 w-full"
        src={currentuser.coverPicture || null}
        alt=""
      />
      <div className="profile absolute -bottom-10 right-[41.5%] md:right-[47.4%]">
        <img
          className="w-20 rounded-full border-black border-2"
          src={currentuser.profilePicture || null}
          alt=""
        />
      </div>
    </div>
    <div className="info flex justify-center items-center mt-14 flex-col">
      <div className="font-bold text-2xl">@{username}</div>
      <div className="text-lg text-slate-400">
        Let's help {username} to get a Chai!
      </div>
      <div className="text-xs text-slate-400">
        {payments.length} donors. ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
      </div>

      <div className="pay flex flex-col md:flex-row gap-5 w-[80%] mt-10">
        <div
          className="support md:w-1/2 bg-slate-900 rounded-lg p-5 h-96 overflow-y-auto
[&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:bg-black-100
[&::-webkit-scrollbar-thumb]:bg-black-300
dark:[&::-webkit-scrollbar-track]:bg-neutral-700
dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <h2 className="text-xl font-bold mb-3">Top 10 Supporters</h2>
          <ul className="pl-3 text-lg">
            {payments.length === 0 && <li>No payments yet</li>}
            {payments.map((p, i) => {
              if(i<10){
              return <li key={i} className="my-3 flex gap-2 items-center">
                <img
                  width={35}
                  className="bg-blend-lighten"
                  src="/man.png"
                  alt=""
                />
                <p>{p.name} donated <span className='font-bold'>₹{p.amount}</span>  with a message "{p.message}"</p>
              </li>
            }})}
          </ul>
        </div>
        <div className="payment md:w-1/2 bg-slate-900 rounded-lg p-5">
          <h2 className="text-xl font-bold mb-3">Make a Payment</h2>
          <div className="flex gap-2 flex-col">
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-slate-800"
              name="name"
              placeholder="Enter Name"
              onChange={handlechange}
              value={paymentForm.name}
            />
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-slate-800"
              name="message"
              placeholder="Enter Message"
              onChange={handlechange}
              value={paymentForm.message}
            />
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-slate-800 "
              placeholder="Enter Amount"
              name='amount'
              onChange={handlechange}
              value={paymentForm.amount}
            />
            <button onClick={()=>{pay(paymentForm.amount)}} className="bg-slate-800 rounded-lg p-3 disabled:bg-slate-400 disabled:from-slate-800" disabled={paymentForm.amount?.length<1 || paymentForm.message?.length<1 || paymentForm.name?.length<1}>Pay</button>
          </div>
          <div className="flex gap-2 mt-5">
            <button className="bg-slate-800 rounded-lg p-3" onClick={()=>pay(10)}>Pay ₹10</button>
            <button className="bg-slate-800 rounded-lg p-3" onClick={()=>pay(20)}>Pay ₹20</button>
            <button className="bg-slate-800 rounded-lg p-3" onClick={()=>pay(50)}>Pay ₹50</button>
            <button className="bg-slate-800 rounded-lg p-3" onClick={()=>pay(100)}>Pay ₹100</button>
          </div>
        </div>
      </div>
    </div>
  </>
);


}

