import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // Logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Wallet & transaction state
  const [balance, setBalance] = useState(0);
  const [receiverUpi, setReceiverUpi] = useState("");
  const [amount, setAmount] = useState("");

  // Add money modal state
  const [showModal, setShowModal] = useState(false);
  const [addAmount, setAddAmount] = useState("");

  // 🔹 Fetch wallet balance
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    API.get(`/wallet/${user.upiId}`)
      .then((res) => {
        setBalance(res.data.data.balance);
      })
      .catch(() => {
        alert("Failed to fetch wallet balance");
      });
  }, [navigate, user]);

  // 🔹 Add money
  function handleAddMoney() {
    if (!addAmount || Number(addAmount) < 1) {
      alert("Amount must be at least ₹1");
      return;
    }

    API.post("/wallet/add", {
      upiId: user.upiId,
      amount: Number(addAmount),
    })
      .then((res) => {
        setBalance(res.data.data.balance);
        setAddAmount("");
        setShowModal(false);
      })
      .catch(() => {
        alert("Failed to add money");
      });
  }

  // 🔹 Send money
  function handleSendMoney(e) {
    e.preventDefault();

    if (!receiverUpi) {
      alert("Receiver UPI ID required");
      return;
    }

    if (Number(amount) < 1) {
      alert("Amount must be at least ₹1");
      return;
    }

    API.post("/transaction/send", {
      senderUpi: user.upiId,
      receiverUpi: receiverUpi,
      amount: Number(amount),
    })
      .then((res) => {
        alert(res.data.message);
        setBalance(balance - Number(amount));
        setReceiverUpi("");
        setAmount("");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Transaction failed");
      });
  }

  // 🔹 Logout
  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="header">
        <div>
          <h2>MRUPay</h2>
          <p>Malla Reddy College of Engineering</p>
        </div>

        <div className="header-right">
          <span>
            Welcome, {user?.fullName || user?.name || user?.upiId}
          </span>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Wallet */}
      <div className="wallet-card">
        <h1>₹{balance.toFixed(2)}</h1>
        <button onClick={() => setShowModal(true)}>Add Money</button>
      </div>

      {/* Send Money */}
      <div className="send-card">
        <h3>Send Money</h3>

        <form onSubmit={handleSendMoney}>
          <label>Recipient UPI ID</label>
          <input
            type="text"
            value={receiverUpi}
            onChange={(e) => setReceiverUpi(e.target.value)}
            placeholder="Enter UPI ID"
            required
          />

          <label>Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />

          <button type="submit" className="send-btn">
            Send Money
          </button>
        </form>
      </div>

      {/* Add Money Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Enter amount to add</h4>

            <input
              type="number"
              placeholder="Amount"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={handleAddMoney}>OK</button>
              <button
                className="cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;