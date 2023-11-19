import { useEffect,useState } from "react";

async function fetchProduct(name) {
    const url = `products.json`;
    const response = await fetch(url);
    return response.json();
  }

export default function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  useEffect (() => {
    (async () => { 
      const newProducts = await fetchProduct();
      setProducts(newProducts);
    })();
  },[]);
    return (
      <>
        <header>
          <h1>The Can Store</h1>
        </header>
        <div>
          <aside>
            <form onSubmit={(event) => {
              event.preventDefault();
              setCategory(event.target.elements.category.value);
              setSearch(event.target.elements.searchTerm.value);
            }}>
              <div>
                <label htmlFor="category">Choose a category:</label>
                <select id="category">
                  <option>All</option>
                  <option>Vegetables</option>
                  <option>Meat</option>
                  <option>Soup</option>
                </select>
              </div>
              <div>
                <label htmlFor="searchTerm">Enter search term:</label>
                <input type="text" id="searchTerm" placeholder="e.g. beans" />
              </div>
              <div>
                <button>Filter results</button>
              </div>
            </form>
          </aside>
          <main>
          {products.map((jsondata) => {
            if ((category.toLowerCase() === jsondata.type || category === "All") && jsondata.name.includes(search.toLowerCase())){
              return(
                  <section className={jsondata.type}>
                    <h2>{jsondata.name}</h2>
                    <p>${jsondata.price}</p>
                    <img src={"images/" + jsondata.image} alt={jsondata.name}/>
                  </section>
              )
            }
          })}
          </main>
        </div>
        <footer>
          <p>All icons found at the Noun Project:</p>
          <ul>
            <li>
              Bean can icon by{" "}
              <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
            </li>
            <li>
              Vegetable icon by{" "}
              <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
            </li>
            <li>
              Soup icon by{" "}
              <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
            </li>
            <li>
              Meat Chunk icon by{" "}
              <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
            </li>
          </ul>
        </footer>
      </>
    );
  }