import "./Categories.css";
import { useCategories } from "../../hooks/useCategories";
const Categories = () => {
const {
    categories,
    isLoading,
    isError,
    getCategoryImage,
    handleCategoryClick,
  } = useCategories();

  if (isLoading) {
    return (
      <section className="categories">
        <div
          className="container"
          style={{ textAlign: "center", color: "white", padding: "40px" }}
        >
          <p>Loading Categories...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="categories">
        <div
          className="container"
          style={{ textAlign: "center", color: "#ff6b6b", padding: "40px" }}
        >
          <p>Failed to load categories. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="categories">
      <div className="container">
        <h2 className="categories-title">CATEGORIES</h2>

        {categories.length === 0 ? (
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
            No categories available yet.
          </p>
        ) : (
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="category-image">
                  <img
                    src={getCategoryImage(category.name)}
                    alt={category.name}
                  />
                </div>
                <h3 className="category-title">{category.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
