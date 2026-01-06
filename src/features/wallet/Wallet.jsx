import './Wallet.css'

const Wallet = () => {
  return (
    <div className="wallet">
      <div className="wallet__container">
        <h2 className="wallet__title">Wallet</h2>
        
        <div className="wallet__field">
          <label>Choose Payment Gateway</label>
          <select className="wallet__select">
            <option>Choose Payment Gateway</option>
          </select>
        </div>
        
        <div className="wallet__field">
          <label>Amount In Dollars</label>
          <input type="number" placeholder="0" />
        </div>
        
        <div className="wallet__field">
          <label>Username</label>
          <div className="wallet__username-field">
            <input type="text" />
            <button className="wallet__file-btn">chose file</button>
          </div>
        </div>
        
        <button className="wallet__deposit-btn">Deposit</button>
      </div>
    </div>
  )
}

export default Wallet