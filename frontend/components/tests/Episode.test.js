import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Episode from "../Episode"

// Example episode data
const exampleEpisodeData = {
  airdate: "2016-07-15",
  airstamp: "2016-07-15T12:00:00+00:00",
  airtime: "",
  id: 553946,
  image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
  name: "Chapter One: The Vanishing of Will Byers",
  number: 1,
  rating: { average: 8.2 },
  runtime: 49,
  season: 1,
  summary: "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
  type: "regular",
  url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
}

describe('Episode component', () => {
  test("renders without error", () => {
    render(<Episode episode={exampleEpisodeData} />)
    
  })

  test("renders texts and alt texts correctly", () => {
    // Render with the example data
    const { rerender } = render(<Episode episode={exampleEpisodeData} />)

    // Check if the summary text is present
    screen.getByText(exampleEpisodeData.summary)

    // Check if the alt text for the image is present
    screen.getByAltText('episode image')

    // Rerender with missing image data
    const { image, ...rest } = exampleEpisodeData
    rerender(<Episode episode={rest} />)
    expect(document.querySelector('img[src="https://i.ibb.co/2FsfXqM/stranger-things.png"]')).toBeInTheDocument()

    // Check if the default image appears

    // Check if the "generic episode image" alt text is present
    screen.getByAltText("generic episode image")

    // Rerender with undefined episode
    rerender(<Episode />)

    // Check if "Loading episode..." text is present
    screen.getByText("Loading episode...")
  })
})
