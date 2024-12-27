import React from "react";

const PassengerForm = () => {
  return (
    <div className="w-full max-w-2xl p-4 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold mb-6">Passenger Details</h2>

      <form className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="+94 000000000"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Supun Perera"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            NIC/Passport <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="xxxxxxxxxxx"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default PassengerForm;
