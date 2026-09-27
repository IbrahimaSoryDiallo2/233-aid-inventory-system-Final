import { useState } from 'react'
import './App.css'

function App() {
  const [donations, setDonations] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    item: '',
    category: '',
    quantity: '',
    donor: '',
    date: '',
  })

  const totalItems = donations.reduce(
    (total, donation) => total + Number(donation.quantity),
    0
  )

  const categories = new Set(
    donations.map((donation) => donation.category)
  ).size

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newDonation = {
      id: Date.now(),
      ...formData,
      quantity: Number(formData.quantity),
    }

    setDonations([...donations, newDonation])

    setFormData({
      item: '',
      category: '',
      quantity: '',
      donor: '',
      date: '',
    })

    setShowForm(false)
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>+233 Aid</h1>
          <p>Donation & Inventory Management System</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          + Add Donation
        </button>
      </header>

      <main className="dashboard">
        <section className="welcome">
          <p className="label">OVERVIEW</p>
          <h2>Inventory Dashboard</h2>
          <p>Track donations, available supplies, and distributions.</p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <p>Total Items Received</p>
            <h3>{totalItems}</h3>
            <span>All-time donations</span>
          </div>

          <div className="stat-card">
            <p>Current Inventory</p>
            <h3>{totalItems}</h3>
            <span>Items available</span>
          </div>

          <div className="stat-card">
            <p>Items Distributed</p>
            <h3>0</h3>
            <span>Items delivered</span>
          </div>

          <div className="stat-card">
            <p>Active Categories</p>
            <h3>{categories}</h3>
            <span>Types of supplies</span>
          </div>
        </section>

        {showForm && (
          <section className="donation-form">
            <div className="form-heading">
              <div>
                <h2>Add Donation</h2>
                <p>Record supplies received by +233 Aid.</p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <label>Item Name</label>
                  <input
                    name="item"
                    value={formData.item}
                    onChange={handleChange}
                    placeholder="Children's shirts"
                    required
                  />
                </div>

                <div>
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Food</option>
                    <option value="Toys">Toys</option>
                    <option value="Education">Education</option>
                    <option value="Medical">Medical</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="100"
                    required
                  />
                </div>

                <div>
                  <label>Donor</label>
                  <input
                    name="donor"
                    value={formData.donor}
                    onChange={handleChange}
                    placeholder="Donor name"
                    required
                  />
                </div>

                <div>
                  <label>Date Received</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button className="add-button" type="submit">
                Save Donation
              </button>
            </form>
          </section>
        )}

        <section className="inventory">
          <div className="section-header">
            <div>
              <h2>Inventory</h2>
              <p>Current donated resources available for distribution.</p>
            </div>

            <input type="text" placeholder="Search inventory..." />
          </div>

          {donations.length === 0 ? (
            <div className="empty-state">
              <h3>No inventory yet</h3>
              <p>Add your first donation to begin tracking supplies.</p>

              <button
                className="secondary-button"
                onClick={() => setShowForm(true)}
              >
                Add First Donation
              </button>
            </div>
          ) : (
            <div className="inventory-table">
              <div className="table-row table-header">
                <span>Item</span>
                <span>Category</span>
                <span>Quantity</span>
                <span>Donor</span>
                <span>Date</span>
              </div>

              {donations.map((donation) => (
                <div className="table-row" key={donation.id}>
                  <strong>{donation.item}</strong>
                  <span>{donation.category}</span>
                  <span>{donation.quantity}</span>
                  <span>{donation.donor}</span>
                  <span>{donation.date}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App