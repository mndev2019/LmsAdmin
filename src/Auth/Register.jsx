import React, { useState } from "react";
import axios from "axios";
import { Base_Url } from "../API/Base_Url";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

   const handleRegister = async () => {
  try {
    const res = await axios.post(
      `${Base_Url}/register`,
      {
        ...form,
       isAdmin: true   // 👈 ye add karo
      }
    );

    alert("Registered Successfully ✅");
    console.log(res.data);

  } catch (err) {
    alert(err.response?.data?.msg || "Error");
  }
};

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Admin Register</h2>

                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    style={styles.input}
                />

                <button onClick={handleRegister} style={styles.button}>
                    Register
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f6fa",
    },
    card: {
        padding: "30px",
        width: "300px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        width: "100%",
        padding: "10px",
        background: "#6c5ce7",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Register;