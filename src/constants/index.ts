import type { Book, NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/home" },
  { label: "Search", href: "/search" },
];

export const mockBook: Book = {
  id: "1",
  title: "Cracking the Coding Interview",
  author: "Gayle Laakmann McDowell",
  categories: ["Programming", "Interview Preparation", "Computer Science"],
  description:
    "A comprehensive guide to technical interview preparation featuring 189 programming questions and solutions. The book covers data structures, algorithms, and system design, helping software engineers prepare for interviews at top tech companies like Google, Microsoft, Amazon, and Facebook.",
  summary:
    "Master technical interviews with 189 coding problems, detailed solutions, and proven strategies for landing jobs at top tech companies.",
  pages: 696,
  date: "2015-07-01",
  image: "/public/images/book-2.png",
};

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    categories: ["Programming", "Interview Preparation", "Computer Science"],
    description:
      "A comprehensive guide to technical interview preparation featuring 189 programming questions and solutions. The book covers data structures, algorithms, and system design, helping software engineers prepare for interviews at top tech companies like Google, Microsoft, Amazon, and Facebook.",
    summary:
      "Cracking the Coding Interview is the definitive resource for anyone preparing for technical interviews at major technology companies. Written by Gayle Laakmann McDowell, a former software engineer at Google, Microsoft, and Apple, this book provides 189 programming interview questions with detailed solutions, step-by-step guidance, and insider tips.\n\nThe book covers essential topics including arrays, strings, linked lists, stacks, queues, trees, graphs, bit manipulation, math and logic puzzles, object-oriented design, recursion, dynamic programming, sorting and searching, testing, and scalability. Each problem includes hints, multiple solutions with different time and space complexity trade-offs, and explanations of the optimal approach.\n\nBeyond just coding problems, the book teaches you how to think like an interviewer, approach problems systematically using the author's proven strategies, and communicate your thought process effectively. It also includes behind-the-scenes insights into how top companies like Google, Amazon, Microsoft, Facebook, and Apple evaluate candidates, what they're looking for, and how to stand out.\n\nWhether you're a new graduate, an experienced engineer looking to switch companies, or simply want to sharpen your problem-solving skills, this book provides the preparation you need to ace the toughest technical interviews and land your dream job at a top tech company.",
    pages: 696,
    date: "2015-07-01",
    image: "/public/images/book-2.png",
  },
  {
    id: "2",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    categories: ["Design", "User Experience", "Psychology"],
    description:
      "A groundbreaking exploration of how design serves as communication between objects and users. The book examines the psychology behind good and bad design, introducing concepts like affordances and signifiers while advocating for user-centered design principles.",
    summary:
      "The Design of Everyday Things is a powerful exploration of the psychology behind good and bad design. Don Norman, a cognitive scientist and design pioneer, demonstrates how everyday objects—from doors and light switches to smartphones and websites—communicate with users through their design.\n\nThe book introduces fundamental design principles including affordances (what actions an object suggests), signifiers (clues that indicate how to interact), mapping (the relationship between controls and their effects), feedback (how systems communicate their status), and constraints (how design limits possible actions). Norman shows how good design makes these elements obvious and intuitive, while poor design creates confusion and frustration.\n\nThrough entertaining real-world examples of both brilliant and terrible design, Norman reveals why we blame ourselves when we can't figure out how to use something, when the fault actually lies with the designer. He argues passionately for human-centered design that puts the user's needs, capabilities, and limitations first.\n\nThis revised and expanded edition includes updated examples from modern technology and digital interfaces, making the principles relevant to today's designers working on everything from physical products to mobile apps and websites. Essential reading for designers, engineers, and anyone who wants to understand why some things work beautifully while others drive us crazy.",
    pages: 368,
    date: "2013-11-05",
    image: "/public/images/book-3.png",
  },
  {
    id: "3",
    title:
      "Everything You Need to Ace Computer Science and Coding in One Big Fat Notebook",
    author: "Grant Smith",
    categories: [
      "Computer Science",
      "Education",
      "Programming",
      "Middle School",
    ],
    description:
      "A comprehensive middle school study guide covering computer science fundamentals, coding concepts, and programming languages including Scratch, Python, HTML, and CSS. Written in an accessible notebook format with key concepts, diagrams, and practice exercises.",
    summary:
      "A fun, visual study guide that makes computer science and coding easy to understand for middle schoolers and beginners.",
    pages: 576,
    date: "2020-04-14",
    image: "/public/images/book-4.png",
  },
  {
    id: "4",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    categories: ["Software Architecture", "Distributed Systems", "Databases"],
    description:
      "A comprehensive guide examining the architecture of data systems and distributed data processing. The book explores the pros and cons of various technologies for processing and storing data, covering topics like reliability, scalability, fault tolerance, and the research underlying modern databases.",
    summary:
      "Navigate the complex world of distributed systems and databases with deep insights into building reliable, scalable data-intensive applications.",
    pages: 616,
    date: "2017-03-16",
    image: "/public/images/book-5.png",
  },
  {
    id: "5",
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    author: "David Thomas and Andrew Hunt",
    categories: [
      "Software Engineering",
      "Programming",
      "Professional Development",
    ],
    description:
      "A timeless guide to software craftsmanship covering personal responsibility, career development, and architectural techniques for writing flexible, adaptable code. The 20th Anniversary Edition re-examines what it means to be a modern programmer with updated examples and 30% new content.",
    summary:
      "Transform from a coder into a master programmer with timeless wisdom on craftsmanship, best practices, and professional growth.",
    pages: 352,
    date: "2019-09-13",
    image: "/public/images/book-6.png",
  },
  {
    id: "6",
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    author: "David Thomas and Andrew Hunt",
    categories: [
      "Software Engineering",
      "Programming",
      "Professional Development",
    ],
    description:
      "A timeless guide to software craftsmanship covering personal responsibility, career development, and architectural techniques for writing flexible, adaptable code. The 20th Anniversary Edition re-examines what it means to be a modern programmer with updated examples and 30% new content.",
    summary:
      "Transform from a coder into a master programmer with timeless wisdom on craftsmanship, best practices, and professional growth.",
    pages: 352,
    date: "2019-09-13",
    image: "/public/images/book-6.png",
  },
];
