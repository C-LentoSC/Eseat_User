import React from "react";

const PassengerForm = ({
  name,
  mobile,
  nic,
  email,
  setName,
  setMobile,
  setNic,
  setEmail,
}: any) => {
  return (
    <div className="w-full p-4 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold mb-6">Passenger Details</h2>

      <form className="grid md:grid-cols-1 gap-6 text-gray-500">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Supun Perera"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            onChange={(e)=>setName(e.target.value)}
          />
          <label className="block text-sm font-medium">Passenger Name</label>
        </div>

        <div className="space-y-2">
          <input
            type="tel"
            placeholder="+94 000000000"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            onChange={(e)=>setMobile(e.target.value)}
          />
          <label className="block text-sm font-medium">
            Passenger Mobile Number
          </label>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="xxxxxxxxxxx"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            onChange={(e)=>setNic(e.target.value)}
          />
          <label className="block text-sm font-medium">
            Passenger NIC Number.
          </label>
        </div>

        <div className="space-y-2">
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label className="block text-sm font-medium">
            Passenger Email Address.
          </label>
        </div>
      </form>
    </div>
  );
};

export default PassengerForm;
