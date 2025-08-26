import React from 'react';
import { PaymentPage } from '@/components/PaymentPage';
const UsernamePage = async ({params})=>{
    const { username } = await params;
    return(
    <PaymentPage username={username}/>
    )
};
export default UsernamePage;

export const metadata = {
    title: `@ Get Me A Chai!`,
  }