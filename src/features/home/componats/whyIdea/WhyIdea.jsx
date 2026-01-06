import './WhyIdea.css';

const WhyIdea = () => {
  const features = [
    {
      img: '/imges/Overlay.png',
      title: 'Instant Delivery',
      description: 'Get your top-ups delivered in seconds'
    },
    {
      img: '/imges/Overlay (1).png',
      title: 'Competitive Pricing',
      description: 'Best prices in the market guaranteed'
    },
    {
      img: '/imges/Overlay (2).png',
      title: 'Secure Payments',
      description: '100% safe and encrypted transactions'
    },
    {
      img: '/imges/Overlay (3).png',
      title: 'Direct Support',
      description: '24/7 customer support via WhatsApp'
    } 
  ];

  return (
    <section className="why-idea">
      <div className="container">
        <div className="why-idea-header">
          <h2>Why Choose IDEA?</h2>
          <p>The smart way to power your gaming experience</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <img src={feature.img} alt={feature.title} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyIdea;