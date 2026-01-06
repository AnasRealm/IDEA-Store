import './OurPurpose.css';

const OurPurpose = () => {
  return (
    <section className="our-purpose">
      <div className="purpose-container">
        <div className="purpose-item">
          <div className="purpose-icon">
            <img src="/imges/Mask Group (8).png" alt="" />
          </div>
          <div className="purpose-content">
            <h3>Super fast</h3>
            <p>Instant digital download</p>
          </div>
        </div>

        <div className="purpose-item">
          <div className="purpose-icon">
            <img src="/imges/Mask Group (9).png" alt="" />
          </div>
          <div className="purpose-content">
            <h3>Reliable & safe</h3>
            <p>Over 20,000 games</p>
          </div>
        </div>

        <div className="purpose-item">
          <div className="purpose-icon">
            <img src="/imges/Mask Group (10).png" alt="" />
          </div>
          <div className="purpose-content">
            <h3>Customer support</h3>
            <p>Human support 24/7</p>
          </div>
        </div>

        <div className="trustpilot">
          <div className="trustpilot-logo"><img src="/imges/Img.png" alt="" /></div>
         <img src="/imges/Img (1).png" alt="" />
          <div className="trustpilot-score">
            TrustScore <strong>4.7</strong> | <strong>798,515</strong> reviews
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPurpose;