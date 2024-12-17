import React, { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  proficiency: string;
}

const CreateAccount: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    proficiency: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Validate form fields
  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last Name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format.";

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required.";
    else if (!phoneRegex.test(formData.phoneNumber))
      newErrors.phoneNumber = "Invalid phone number.";

    if (!formData.gender) newErrors.gender = "Gender selection is required.";
    if (!formData.proficiency.trim())
      newErrors.proficiency = "Language proficiency is required.";

    return newErrors;
  };

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Account created successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          gender: "",
          proficiency: "",
        });
      } else {
        alert("Failed to create account.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p style={{ color: "red" }}>{errors.firstName}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <p style={{ color: "red" }}>{errors.phoneNumber}</p>
          )}
        </div>

        <div>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
        </div>

        <div>
          <input
            type="text"
            name="proficiency"
            placeholder="Language Proficiency"
            value={formData.proficiency}
            onChange={handleChange}
          />
          {errors.proficiency && (
            <p style={{ color: "red" }}>{errors.proficiency}</p>
          )}
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
