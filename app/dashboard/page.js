"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { fetchuser, updateprofile } from '@/actions/Useraction';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
function Dashboard() {
  const router = useRouter();
  let { data: session } = useSession();
  const [form, setform] = useState({ "name": "", "email": "", "username": "", "profilePicture": "", "coverPicture": "", "razorpayId": "", "razorpaySecret": "" });
  useEffect(() => {
    document.title = "Dashboard | GetMeAChai";
    getdata();
    if (!session) {
      router.push('/login');
    }
  }, [router, session]);


  const getdata = async () => {
    if (session?.user?.name) {
      let data = await fetchuser(session.user.email.split('@')[0]);
      setform(data);
    }
  };


  const handleSubmit = async (e) => {
    let a = await updateprofile(e, session.user.name);
    toast('Profile Updated.', {
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


  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });

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
      <div className="text-white flex items-center justify-center min-h-screen">
        <div className="w-full max-w-[80%] p-8 rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold mb-6">Welcome to your Dashboard</h2>
          <form action={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg text-sm"
                  name='name'
                  onChange={handlechange}
                  value={form.name || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg text-sm"
                  name='email'
                  onChange={handlechange}
                  value={form.email || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg text-sm"
                  name='user'
                  onChange={handlechange}
                  value={form.username || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="profilePicture">Profile Picture</label>
                <input
                  type="text"
                  id="profilePicture"
                  placeholder="Enter profile picture URL"
                  className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg text-sm"
                  name='profilePicture'
                  onChange={handlechange}
                  value={form.profilePicture || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="coverPicture">Cover Picture</label>
                <input
                  type="text"
                  id="coverPicture"
                  placeholder="Enter cover picture URL"
                  className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg text-sm"
                  name='coverPicture'
                  onChange={handlechange}
                  value={form.coverPicture || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="razorpayId">Razorpay Id</label>
                <input
                  type="text"
                  id="razorpayId"
                  placeholder="Enter Razorpay ID"
                  className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg text-sm"
                  name='razorpayId'
                  onChange={handlechange}
                  value={form.razorpayId ||  ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="razorpaySecret">Razorpay Secret</label>
                <input
                  type="password"
                  id="razorpaySecret"
                  placeholder="Enter Razorpay Secret"
                  className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg text-sm"
                  name='razorpaySecret'
                  onChange={handlechange}
                  value={form.razorpaySecret || ""}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

