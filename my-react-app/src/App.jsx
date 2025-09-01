import { useState } from 'react'
import './App.css'

function App() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [results, setResults] = useState([])
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!query.trim()){
      alert('Please enter a search term')
      return
    };

    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=12`)
      const data = await res.json()
      if (!data.results || data.results.length === 0) {
        alert('No results found')
        setResults([])
        return
      }
      setResults(data.results)
    } catch (error) {
      setError('Failed to fetch data', error)
    } finally {
      setLoading(false)
    }

  }

  const handleAddToFavorites = (song) => {
    if (!favorites.some((fav) => fav.trackId === song.trackId)) {
      setFavorites((prevFavorites) => [...prevFavorites, song])
    }
  }

  const handleRemoveFromFavorites = (id) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.trackId !== id))
  }

  if (error) return <div>{error.message}</div>
  if (loading) return <div>Loading...</div>

  return (
    <>
      <section>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a song..."
          />
          <button type="submit">Search</button>
        </form>

        <div>
          <h1>Results</h1>
          {results.length === 0 ? (
            <p>No results found</p>
          ) : (
            <div>
              {results.map((result) => (
                <div key={result.trackId}>
                  <img src={result.artworkUrl100} alt={result.trackName} />
                  <h2>{result.trackName}</h2>
                  <p>{result.artistName}</p>
                  <button onClick={() => handleAddToFavorites(result)}>Add to Favorites</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1>Favorites</h1>
          {favorites.length === 0 ? (
            <p>No favorites added</p>
          ) : (
            <div>
              {favorites.map((fav) => (
                <div key={fav.trackId}>
                  <img src={fav.artworkUrl100} alt={fav.trackName} />
                  <h2>{fav.trackName}</h2>
                  <p>{fav.artistName}</p>
                  <button onClick={() => handleRemoveFromFavorites(fav.trackId)}>Remove from Favorites</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default App

