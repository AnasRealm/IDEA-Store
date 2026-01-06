import './Categories.css';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: 'Games',
      image: '/imges/games.png',
      path: '/games'
    },
    {
      id: 2,
      title: 'Digital Cards',
      image: '/imges/Digital cards.png'
    },
    {
      id: 3,
      title: 'Account',
      image: '/imges/account.png'
    },
    {
      id: 4,
      title: 'Subscriptions',
      image: '/imges/Subscriptions.png'
    },
    {
      id: 5,
      title: 'Electronic Payment',
      image: '/imges/Electronic payment.png'
    },
    {
      id: 6,
      title: 'Chat Applications',
      image: '/imges/Chat applications.png'
    }
  ];

  const handleCategoryClick = (category) => {
    if (category.path) {
      navigate(category.path);
    }
  };

  return (
    <section className="categories">
      <div className="container">
        <h2 className="categories-title">CATEGORIES</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: category.path ? 'pointer' : 'default' }}
            >
              <div className="category-image">
                <img src={category.image} alt={category.title} />
              </div>
              <h3 className="category-title">{category.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;