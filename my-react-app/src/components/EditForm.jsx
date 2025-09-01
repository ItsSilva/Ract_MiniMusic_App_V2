import { useState } from "react"

const EditForm = ({ favorite, onSave, onCancel }) => {
  const [trackName, setTrackName] = useState(favorite.trackName)
  const [artistName, setArtistName] = useState(favorite.artistName)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...favorite,
      trackName,
      artistName
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <img src={favorite.artworkUrl100} alt={favorite.trackName} />
      <div>
        <label>Song Title:</label>
        <input
          type="text"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        />
      </div>
      <div>
        <label>Artist:</label>
        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  )
}

export default EditForm