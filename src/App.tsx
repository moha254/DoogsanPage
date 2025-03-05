import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "23516e32-48ec-41f4-96c2-79d9442d082a");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Send Us a Message</h2>
        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full mb-4 p-2 border rounded-md" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full mb-4 p-2 border rounded-md" required />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" className="w-full mb-6 p-2 border rounded-md" rows={5} required></textarea>
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center w-full hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
            {loading ? "Sending..." : <><Send size={18} className="mr-2" /> Send Message</>}
          </button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg mt-8 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
        <div className="space-y-4 text-gray-600">
          <div className="flex items-center space-x-2">
            <Phone size={20} className="text-blue-600" />
            <span>+254 (99) 578-310 / +254 (97) 771-377</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={20} className="text-blue-600" />
            <span>contact@doogsanenterprise.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={20} className="text-blue-600" />
            <span>BBS MALL, EASTLEIGH, NAIROBI</span>
          </div>
          <div className="mt-6">
            <img src="src\public\img\LOGO-DOOGSAN.jpeg" alt="Doogsan Enterprise Logo" className="h-24 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
