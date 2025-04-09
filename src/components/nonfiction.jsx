import React from 'react'

import nf0 from "../assets/images/nf0.jpg";
import nf1 from "../assets/images/nf1.jpg";
import nf2 from "../assets/images/nf2.jfif";
import nf3 from "../assets/images/nf3.jpg";


const books = [
  { title: "Autobigraphy", image: nf0 },
  { title: "Biography", image: nf1 },
  { title: "Essays", image: nf2 },
  { title: "Self-Help", image: nf3 },
 
];

export default function NonFiction() {

  return (
    <div className="w-full px-4">
    <div className="flex overflow-x-auto space-x-6 scrollbar-hide py-4">
      {books.map((book, index) => (
        <div key={index} className="min-w-[140px] flex-shrink-0 text-center">
          <img
            src={book.image}
            alt={book.title}
            className="h-60 w-full object-cover rounded-md shadow-md"
          />
          <p className="mt-2 text-sm font-medium truncate">{book.title}</p>
        </div>
      ))}
    </div>
  </div>
  )
}
