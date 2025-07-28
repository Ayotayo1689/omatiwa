import React from 'react'
import BehindDoor from "../assets/BehindDoor.svg"
import Designers from "../assets/Designers.svg"
import UserJourney from "../assets/UserJourney.svg"
import Pencil from "../assets/Pencil.svg"

import Thriller1 from "../assets/Thriller1.svg"
import Thriller2 from "../assets/Thriller2.svg"
import Thriller3 from "../assets/Thriller3.svg"
import Thriller4 from "../assets/Thriller4.svg"



import Romance1 from "../assets/Romance1.svg"
import Romance2 from "../assets/Romance2.svg"
import Romance3 from "../assets/Romance3.svg"
import Romance4 from "../assets/Romance4.svg"



import Korean1 from "../assets/Korean1.svg"
import Korean2 from "../assets/Korean2.svg"
import Korean3 from "../assets/Korean3.svg"
import Korean4 from "../assets/Korean4.svg"



export const Fun = () =>  {
    const uxBooks = [
      {
        title: "Behind Closed Doors",
        author: "B.A Paris",
        image: BehindDoor,
      },
      {
        title: "Behind Closed Doors",
        author: "B.A Paris",
        image: Designers,
      },
      {
        title: "Behind Closed Doors",
        author: "B.A Paris",
        image: UserJourney,
      },
      {
        title: "Behind Closed Doors",
        author: "B.A Paris",
        image: Pencil,
      },
    ]
  
    const thrillers = [
      {
        title: "The Concubine",
        author: "Elechi Amadi",
        image: Thriller1,
      },
      {
        title: "Broken: Not a Halal Love Story",
        author: "Fatima Bala",
        image: Thriller2,
      },
      {
        title: "Honey & Spice",
        author: "Bolu Babalola",
        image: Thriller3,
      },
      {
        title: "An Unlikely Kind of Love",
        author: "Adesuwa Oman Nwokedi",
        image: Thriller4,
      },
    ]
  
    const romance = [
      {
        title: "Behind Closed Doors",
        author: "B.A Paris",
        image: Romance1,
      },
      {
        title: "The Nothing Man",
        author: "Catherine Ryan Howard",
        image: Romance2,
      },
      {
        title: "The Death of Vivek Oji",
        author: "Akwaeke Emezi",
        image: Romance3,
      },
      {
        title: "A Good Mother",
        author: "Lara Bazelon",
        image: Romance4,
      },
    ]
  
    const koreanSeries = [
      {
        title: "Memorist",
        author: "",
        image: Korean1,
      },
      {
        title: "A Virtuous Business",
        author: "",
        image: Korean2,
      },
      {
        title: "Flower of Evil",
        author: "",
        image: Korean3,
      },
      {
        title: "It's Okay to Not be Okay",
        author: "",
        image: Korean4,
      },
    ]
  
    const writings = [
      {
        title: "Behind Closed Doors",
        author: "B.A Paris",
        image: Romance1,
      },
      {
        title: "The Nothing Man",
        author: "Catherine Ryan Howard",
        image: Romance2,
      },
      {
        title: "The Death of Vivek Oji",
        author: "Akwaeke Emezi",
        image: Romance3,
      },
      {
        title: "A Good Mother",
        author: "Lara Bazelon",
        image: Romance4,
      },
    ]
  
    const MediaGrid = ({ items }) => (
      <div className=" scrollbar-hide overflow-x-auto">
        <div className="flex gap-4 md:grid md:grid-cols-4 md:gap-6 pb-4 md:pb-0">
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-[100vw] max-w-[300px] md:w-auto space-y-3">
              <div className="aspect-[3/4] border relative overflow-hidden ">
                <img src={item.image || "/placeholder.svg"} alt={item.title}  className="object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className=" font-[600] text-[14px] md:text-[18px] xl:text-[22px] leading-tight">{item.title}</h3>
                {item.author && <p className=" text-sm">{item.author}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  
    return (
      <div className="md:w-[90%] m-auto">
        <div className="  mx-auto  py-8 md:py-12">
          {/* Header Section */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-2xl md:text-[40px] font-[600] mb-6">Beyond the Screen</h1>
            <p className=" text-[14px] md:text-[18px] xl:text-[22px] leading-relaxed ">
              A glimpse into what I do for fun and fuels my mind outside design. I'm drawn to stories that challenge the
              mind and stir the soul, whether it's through thought-provoking books, visually striking films, or the pieces
              I write myself. From psychological thrillers and feminist fiction to mind-bending cinema, I seek narratives
              that leave a lasting impression.
            </p>
          </div>
  
          {/* UX Books Section */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-[28px] font-[600] mb-6 md:mb-8">UX Books</h2>
            <MediaGrid items={uxBooks} />
          </section>
  
          {/* Thrillers Section */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-[28px] font-[600] mb-6 md:mb-8">Thrillers</h2>
            <MediaGrid items={thrillers} />
          </section>
  
          {/* Romance Section */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-[28px] font-[600] mb-6 md:mb-8">Romance</h2>
            <MediaGrid items={romance} />
          </section>
  
          {/* Korean Series Section */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-[28px] font-[600] mb-6 md:mb-8">Korean Series</h2>
            <MediaGrid items={koreanSeries} />
          </section>
  
          {/* Writings Section */}
          <section>
            <h2 className="text-xl md:text-[28px] font-[600] mb-6 md:mb-8">Writings</h2>
            <MediaGrid items={writings} />
          </section>
        </div>
      </div>
    )
  }