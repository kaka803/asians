import React, { useState } from 'react'
import { useProjectsContext } from '../context/GlobalContext';
import { HashLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const Minifoam = () => {
  const { open, setOpen } = useProjectsContext();

  const [formData, setFormData] = useState({
  name: '',
  phone: '',
  email: '',
  budget: 'Less than $1,000', // default pehla option select
  description: '',
});
const [sendloading, setsendloading] = useState(false)

  if (!open) return null; // Agar close ho gaya hai to kuch render nahi hoga

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

const handleSubmit = async (e) => {
  e.preventDefault();
setsendloading(true)
  try {
    const response = await fetch('/api/addmessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        urgent: true 
      })
    });

    const data = await response.json();
setsendloading(false)
    if (!response.ok) {
      toast.error('something went wrong')
      return;
    }

    // Success
    toast.success('Message sent successfully!')
    setFormData({
      name: '',
      phone: '',
      email: '',
      budget: '',
      description: ''
    });

    // Agar chaho form close bhi kar sakte ho
    setOpen(false);


  } catch (error) {
    console.error(error);
    toast.error('something went wrong');
  }
};


  return (
    <div>
  <div className="fixed bottom-5 right-5  max-md:overflow-scroll  max-md:h-1/2  w-full max-md:w-[80%] z-1000 max-w-md md:w-96 bg-[#2020209a] backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/30">
    
    {/* Header with X button */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white text-lg font-semibold">Contact Me</h2>
      <button
        onClick={() => setOpen(false)}
        className="text-white text-xl font-bold hover:text-red-500 transition"
      >
        &times;
      </button>
    </div>
    
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm mb-1 text-white">Your Name*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white py-2 text-white placeholder-white"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-white">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white py-2 text-white placeholder-white"
          placeholder="Enter your phone"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-white">Your Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white py-2 text-white placeholder-white"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-white">Select Project Budget</label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white py-2 text-white"
        >
          <option className="bg-black text-white">Less than $1,000</option>
          <option className="bg-black text-white">$1,000 - $5,000</option>
          <option className="bg-black text-white">$5,000 - $10,000</option>
          <option className="bg-black text-white">$10,000+</option>
        </select>
      </div>

      <div className="col-span-1 md:col-span-2">
        <label className="block text-sm mb-1 text-white">Project Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full bg-transparent border-b border-white/50 focus:outline-none focus:border-white py-2 resize-none text-white placeholder-white"
          placeholder="Describe your project"
        />
      </div>

      <button type="submit" className="mt-4 flex justify-center items-center col-span-1 md:col-span-2 w-full white-border text-white py-2 rounded-lg hover:bg-white/50 transition">
        {sendloading ? <HashLoader color="white" size={20}/> : 'Send'}
      </button>
    </form>
  </div>
</div>

  )
}

export default Minifoam
