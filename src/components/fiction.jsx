import React from "react";


import f1 from "../assets/images/2.jpg";
import f2 from "../assets/images/03.jpg";
import f3 from "../assets/images/04.jpg";
import f4 from "../assets/images/05.jpg";
import f5 from "../assets/images/07.jpg";
import f6 from "../assets/images/08.jpg";
import f7 from "../assets/images/09.jpg";
import f8 from "../assets/images/011.jpg";
import f9 from "../assets/images/012.jpg";

const books = [
  { title: "Classics", image: f1 },
  { title: "Fairy Tales", image: f2 },
  { title: "Fantasy", image: f3 },
  { title: "Historical Fiction", image: f4 },
  { title: "Humour", image: f5 },
  { title: "Literary Fiction", image: f6 },
  { title: "Mystery", image: f7 },
  { title: "Plays", image: f8 },
  { title: "Romance", image: f9 },
];

export default function Fiction() {
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
  );
}
