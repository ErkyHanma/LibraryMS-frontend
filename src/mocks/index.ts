import {
  type Book,
  type NavLink,
  type User,
  type TableBook,
  type TableUser,
  type BorrowRecord,
  type TableBorrowRecord,
  type AccountRequest,
  type Category,
} from "../types/index";

// Navigation Links
export const HEADER_NAV_LINKS: NavLink[] = [
  { label: "Home", route: "/home" },
  { label: "Search", route: "/search" },
];

export const categories: Record<string, Category> = {
  programming: { categoryId: 1, name: "Programming" },
  interview: { categoryId: 2, name: "Interview Preparation" },
  cs: { categoryId: 3, name: "Computer Science" },
  design: { categoryId: 4, name: "Design" },
  education: { categoryId: 5, name: "Education" },
};

export const mockBook: Book = {
  bookId: "1",
  title: "Cracking the Coding Interview",
  author: "Gayle Laakmann McDowell",
  categories: [categories.programming, categories.interview, categories.cs],
  description:
    "A comprehensive guide to technical interview preparation featuring 189 programming questions and solutions. The book covers data structures, algorithms, and system design, helping software engineers prepare for interviews at top tech companies like Google, Microsoft, Amazon, and Facebook.",
  summary:
    "Cracking the Coding Interview is the definitive resource for anyone preparing for technical interviews at major technology companies. Written by Gayle Laakmann McDowell, a former software engineer at Google, Microsoft, and Apple, this book provides 189 programming interview questions with detailed solutions, step-by-step guidance, and insider tips.\n\nThe book covers essential topics including arrays, strings, linked lists, stacks, queues, trees, graphs, bit manipulation, math and logic puzzles, object-oriented design, recursion, dynamic programming, sorting and searching, testing, and scalability. Each problem includes hints, multiple solutions with different time and space complexity trade-offs, and explanations of the optimal approach.\n\nBeyond just coding problems, the book teaches you how to think like an interviewer, approach problems systematically using the author's proven strategies, and communicate your thought process effectively. It also includes behind-the-scenes insights into how top companies like Google, Amazon, Microsoft, Facebook, and Apple evaluate candidates, what they're looking for, and how to stand out.\n\nWhether you're a new graduate, an experienced engineer looking to switch companies, or simply want to sharpen your problem-solving skills, this book provides the preparation you need to ace the toughest technical interviews and land your dream job at a top tech company.",
  pages: 696,
  publishDate: "2015-07-01",
  coverUrl: "/images/book-2.png",
  totalCopies: 5,
  availableCopies: 3,
  createdAt: "2024-01-15T10:30:00Z",
};

export const mockBooks: Book[] = [
  {
    bookId: "1",
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    categories: [categories.programming, categories.interview, categories.cs],
    description:
      "A comprehensive guide to technical interview preparation featuring 189 programming questions and solutions. The book covers data structures, algorithms, and system design, helping software engineers prepare for interviews at top tech companies like Google, Microsoft, Amazon, and Facebook.",
    summary:
      "Cracking the Coding Interview is the definitive resource for anyone preparing for technical interviews at major technology companies. Written by Gayle Laakmann McDowell, a former software engineer at Google, Microsoft, and Apple, this book provides 189 programming interview questions with detailed solutions, step-by-step guidance, and insider tips.\n\nThe book covers essential topics including arrays, strings, linked lists, stacks, queues, trees, graphs, bit manipulation, math and logic puzzles, object-oriented design, recursion, dynamic programming, sorting and searching, testing, and scalability. Each problem includes hints, multiple solutions with different time and space complexity trade-offs, and explanations of the optimal approach.\n\nBeyond just coding problems, the book teaches you how to think like an interviewer, approach problems systematically using the author's proven strategies, and communicate your thought process effectively. It also includes behind-the-scenes insights into how top companies like Google, Amazon, Microsoft, Facebook, and Apple evaluate candidates, what they're looking for, and how to stand out.\n\nWhether you're a new graduate, an experienced engineer looking to switch companies, or simply want to sharpen your problem-solving skills, this book provides the preparation you need to ace the toughest technical interviews and land your dream job at a top tech company.",
    pages: 696,
    publishDate: "2015-07-01",
    coverUrl: "/images/book-2.png",
    totalCopies: 5,
    availableCopies: 3,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    bookId: "2",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    categories: [categories.programming, categories.design, categories.cs],
    description:
      "A groundbreaking exploration of how design serves as communication between objects and users. The book examines the psychology behind good and bad design, introducing concepts like affordances and signifiers while advocating for user-centered design principles.",
    summary:
      "The Design of Everyday Things is a powerful exploration of the psychology behind good and bad design. Don Norman, a cognitive scientist and design pioneer, demonstrates how everyday objects—from doors and light switches to smartphones and websites—communicate with users through their design.\n\nThe book introduces fundamental design principles including affordances (what actions an object suggests), signifiers (clues that indicate how to interact), mapping (the relationship between controls and their effects), feedback (how systems communicate their status), and constraints (how design limits possible actions). Norman shows how good design makes these elements obvious and intuitive, while poor design creates confusion and frustration.\n\nThrough entertaining real-world examples of both brilliant and terrible design, Norman reveals why we blame ourselves when we can't figure out how to use something, when the fault actually lies with the designer. He argues passionately for human-centered design that puts the user's needs, capabilities, and limitations first.\n\nThis revised and expanded edition includes updated examples from modern technology and digital interfaces, making the principles relevant to today's designers working on everything from physical products to mobile apps and websites. Essential reading for designers, engineers, and anyone who wants to understand why some things work beautifully while others drive us crazy.",
    pages: 368,
    publishDate: "2013-11-05",
    coverUrl: "/images/book-3.png",
    totalCopies: 3,
    availableCopies: 1,
    createdAt: "2024-02-20T14:15:00Z",
  },
  {
    bookId: "3",
    title:
      "Everything You Need to Ace Computer Science and Coding in One Big Fat Notebook",
    author: "Grant Smith",
    categories: [categories.education, categories.design, categories.cs],
    description:
      "A comprehensive middle school study guide covering computer science fundamentals, coding concepts, and programming languages including Scratch, Python, HTML, and CSS. Written in an accessible notebook format with key concepts, diagrams, and practice exercises.",
    summary:
      "A fun, visual study guide that makes computer science and coding easy to understand for middle schoolers and beginners.",
    pages: 576,
    publishDate: "2020-04-14",
    coverUrl: "/images/book-4.png",
    totalCopies: 8,
    availableCopies: 6,
    createdAt: "2023-11-10T09:00:00Z",
  },
  {
    bookId: "4",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    categories: [categories.education, categories.design, categories.cs],
    description:
      "A comprehensive guide examining the architecture of data systems and distributed data processing. The book explores the pros and cons of various technologies for processing and storing data, covering topics like reliability, scalability, fault tolerance, and the research underlying modern databases.",
    summary:
      "Navigate the complex world of distributed systems and databases with deep insights into building reliable, scalable data-intensive applications.",
    pages: 616,
    publishDate: "2017-03-16",
    coverUrl: "/images/book-5.png",
    totalCopies: 4,
    availableCopies: 2,
    createdAt: "2024-03-05T16:45:00Z",
  },
  {
    bookId: "5",
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    author: "David Thomas and Andrew Hunt",
    categories: [categories.education, categories.design, categories.cs],
    description:
      "A timeless guide to software craftsmanship covering personal responsibility, career development, and architectural techniques for writing flexible, adaptable code. The 20th Anniversary Edition re-examines what it means to be a modern programmer with updated examples and 30% new content.",
    summary:
      "Transform from a coder into a master programmer with timeless wisdom on craftsmanship, best practices, and professional growth.",
    pages: 352,
    publishDate: "2019-09-13",
    coverUrl: "/images/book-6.png",
    totalCopies: 6,
    availableCopies: 4,
    createdAt: "2024-01-28T11:20:00Z",
  },
  {
    bookId: "6",
    title:
      "Everything You Need to Ace Computer Science and Coding in One Big Fat Notebook",
    author: "Grant Smith",
    categories: [categories.education, categories.design, categories.cs],
    description:
      "A comprehensive middle school study guide covering computer science fundamentals, coding concepts, and programming languages including Scratch, Python, HTML, and CSS. Written in an accessible notebook format with key concepts, diagrams, and practice exercises.",
    summary:
      "A fun, visual study guide that makes computer science and coding easy to understand for middle schoolers and beginners.",
    pages: 576,
    publishDate: "2020-04-14",
    coverUrl: "/images/book-4.png",
    totalCopies: 8,
    availableCopies: 6,
    createdAt: "2023-11-10T09:00:00Z",
  },
];

export const mockBorrowedBooks: BorrowRecord[] = [
  {
    book: mockBooks[1],
    borrowedDate: "Oct 15, 2023",
    dueDate: "Nov 01, 2023",
    status: "BORROWED",
  },
  {
    book: mockBooks[2],
    borrowedDate: "Oct 20, 2023",
    dueDate: "Nov 05, 2023",
    status: "OVERDUE",
  },
  {
    book: mockBooks[3],
    borrowedDate: "Oct 20, 2023",
    dueDate: "Nov 05, 2023",
    returnDate: "Sept 15, 2023",
    status: "RETURNED",
  },
  {
    book: mockBooks[4],
    borrowedDate: "Aug 10, 2023",
    dueDate: "Sept 15, 2023",
    returnDate: "Sept 15, 2023",
    status: "LATE RETURN",
  },
];

export const user1: User = {
  id: "a1b2c3d4-e5f6-4789-a012-3456789abcde",
  fullname: "María García",
  profileImage: "https://i.pravatar.cc/150?img=5",
  email: "maria.garcia@university.edu",
  universityId: "2024-0012",
  createdAt: "January 04, 2022",
  role: "USER",
  status: "APPROVED",
};

export const user2: User = {
  id: "f9e8d7c6-b5a4-4321-9876-543210fedcba",
  fullname: "Carlos Rodríguez",
  profileImage: "https://i.pravatar.cc/150?img=12",
  email: "carlos.rodriguez@university.edu",
  universityId: "2023-0056",
  createdAt: "August 24, 2021",
  role: "USER",
  status: "APPROVED",
};

export const user3: User = {
  id: "f9e8d7c6-cc96-4321-9876-543210fedcba",
  fullname: "Marco Navarro",
  profileImage: "https://i.pravatar.cc/150?img=10",
  email: "marco.navarro@university.eduwwwwwwww",
  universityId: "2024-0088",
  createdAt: "June 12, 2024",
  role: "USER",
  status: "APPROVED",
};

export const mockBorrowRequestBooks = [
  {
    book: mockBooks[1],
    requestDate: "Oct 15, 2023",
    user: user1,
  },
  {
    book: mockBooks[2],
    requestDate: "Oct 20, 2023",
    user: user2,
  },
  {
    book: mockBooks[4],
    requestDate: "Aug 10, 2024",
    user: user3,
  },

  {
    book: mockBooks[3],
    requestDate: "Aug 10, 2024",
    user: user2,
  },
];

export const mockUsers: User[] = [user1, user2, user3];

export const mockTableUsers: TableUser[] = [
  {
    id: "usr_5y6z7a8b",
    fullname: "Isabella Santos",
    profileImage: "https://i.pravatar.cc/150?img=9",
    email: "isabella.santos@example.com",
    role: "USER",
    status: "APPROVED",
    createdAt: "2024-01-10T12:00:00Z",
    universityId: "2024-1000",
    info: {
      fullname: "Isabella Santos",
      email: "isabella.santos@example.com",
      profileImage: "",
    },
    dateJoined: "2024-01-10",
    booksBorrowed: 5,
  },
  {
    id: "usr_9c0d1e2f",
    fullname: "Roberto Vargas",
    profileImage: "https://i.pravatar.cc/150?img=11",
    email: "roberto.vargas@example.com",
    role: "ADMIN",
    status: "APPROVED",
    createdAt: "2023-10-15T09:30:00Z",
    universityId: "",
    info: {
      fullname: "Roberto Vargas",
      email: "roberto.vargas@example.com",
      profileImage: "https://i.pravatar.cc/150?img=11",
    },
    dateJoined: "2023-10-15",
    booksBorrowed: 12,
  },
  {
    id: "usr_3g4h5i6j",
    fullname: "Valentina Morales",
    profileImage: "https://i.pravatar.cc/150?img=20",
    email: "valentina.morales@example.com",
    role: "USER",
    createdAt: "2024-02-28T15:45:00Z",
    status: "BLOCKED",
    universityId: "",
    info: {
      fullname: "Valentina Morales",
      email: "valentina.morales@example.com",
      profileImage: "https://i.pravatar.cc/150?img=20",
    },
    dateJoined: "2024-02-28",
    booksBorrowed: 3,
  },
];

export const mockTableBooks: TableBook[] = [
  {
    bookId: "1",
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    categories: [categories.education, categories.design, categories.cs],
    description:
      "A comprehensive guide to technical interview preparation featuring 189 programming questions and solutions. The book covers data structures, algorithms, and system design, helping software engineers prepare for interviews at top tech companies like Google, Microsoft, Amazon, and Facebook.",
    summary:
      "Cracking the Coding Interview is the definitive resource for anyone preparing for technical interviews at major technology companies. Written by Gayle Laakmann McDowell, a former software engineer at Google, Microsoft, and Apple, this book provides 189 programming interview questions with detailed solutions, step-by-step guidance, and insider tips.\n\nThe book covers essential topics including arrays, strings, linked lists, stacks, queues, trees, graphs, bit manipulation, math and logic puzzles, object-oriented design, recursion, dynamic programming, sorting and searching, testing, and scalability. Each problem includes hints, multiple solutions with different time and space complexity trade-offs, and explanations of the optimal approach.\n\nBeyond just coding problems, the book teaches you how to think like an interviewer, approach problems systematically using the author's proven strategies, and communicate your thought process effectively. It also includes behind-the-scenes insights into how top companies like Google, Amazon, Microsoft, Facebook, and Apple evaluate candidates, what they're looking for, and how to stand out.\n\nWhether you're a new graduate, an experienced engineer looking to switch companies, or simply want to sharpen your problem-solving skills, this book provides the preparation you need to ace the toughest technical interviews and land your dream job at a top tech company.",
    pages: 696,
    publishDate: "2015-07-01",
    coverUrl: "/images/book-2.png",
    totalCopies: 5,
    availableCopies: 3,
    createdAt: "2024-01-15T10:30:00Z",
    info: {
      title: "Cracking the Coding Interview",
      coverUrl: "/images/book-2.png",
    },
  },
  {
    bookId: "2",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    categories: [categories.education, categories.design, categories.cs],
    description:
      "A groundbreaking exploration of how design serves as communication between objects and users. The book examines the psychology behind good and bad design, introducing concepts like affordances and signifiers while advocating for user-centered design principles.",
    summary:
      "The Design of Everyday Things is a powerful exploration of the psychology behind good and bad design. Don Norman, a cognitive scientist and design pioneer, demonstrates how everyday objects—from doors and light switches to smartphones and websites—communicate with users through their design.\n\nThe book introduces fundamental design principles including affordances (what actions an object suggests), signifiers (clues that indicate how to interact), mapping (the relationship between controls and their effects), feedback (how systems communicate their status), and constraints (how design limits possible actions). Norman shows how good design makes these elements obvious and intuitive, while poor design creates confusion and frustration.\n\nThrough entertaining real-world examples of both brilliant and terrible design, Norman reveals why we blame ourselves when we can't figure out how to use something, when the fault actually lies with the designer. He argues passionately for human-centered design that puts the user's needs, capabilities, and limitations first.\n\nThis revised and expanded edition includes updated examples from modern technology and digital interfaces, making the principles relevant to today's designers working on everything from physical products to mobile apps and websites. Essential reading for designers, engineers, and anyone who wants to understand why some things work beautifully while others drive us crazy.",
    pages: 368,
    publishDate: "2013-11-05",
    coverUrl: "/images/book-3.png",
    totalCopies: 3,
    availableCopies: 1,
    createdAt: "2024-02-20T14:15:00Z",
    info: {
      title: "The Design of Everyday Things",
      coverUrl: "/images/book-3.png",
    },
  },
  {
    bookId: "3",
    title:
      "Everything You Need to Ace Computer Science and Coding in One Big Fat Notebook",
    author: "Grant Smith",
    categories: [categories.education, categories.design, categories.cs],
    description:
      "A comprehensive middle school study guide covering computer science fundamentals, coding concepts, and programming languages including Scratch, Python, HTML, and CSS. Written in an accessible notebook format with key concepts, diagrams, and practice exercises.",
    summary:
      "A fun, visual study guide that makes computer science and coding easy to understand for middle schoolers and beginners.",
    pages: 576,
    publishDate: "2020-04-14",
    coverUrl: "/images/book-4.png",
    totalCopies: 8,
    availableCopies: 6,
    createdAt: "2023-11-10T09:00:00Z",
    info: {
      title:
        "Everything You Need to Ace Computer Science and Coding in One Big Fat Notebook",
      coverUrl: "/images/book-4.png",
    },
  },
  {
    bookId: "4",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    categories: [categories.education, categories.design, categories.cs],
    description:
      "A comprehensive guide examining the architecture of data systems and distributed data processing. The book explores the pros and cons of various technologies for processing and storing data, covering topics like reliability, scalability, fault tolerance, and the research underlying modern databases.",
    summary:
      "Navigate the complex world of distributed systems and databases with deep insights into building reliable, scalable data-intensive applications.",
    pages: 616,
    publishDate: "2017-03-16",
    coverUrl: "/images/book-5.png",
    totalCopies: 4,
    availableCopies: 2,
    createdAt: "2024-03-05T16:45:00Z",
    info: {
      title: "Designing Data-Intensive Applications",
      coverUrl: "/images/book-5.png",
    },
  },
  {
    bookId: "5",
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    author: "David Thomas and Andrew Hunt",
    categories: [categories.education, categories.design, categories.cs],
    description:
      "A timeless guide to software craftsmanship covering personal responsibility, career development, and architectural techniques for writing flexible, adaptable code. The 20th Anniversary Edition re-examines what it means to be a modern programmer with updated examples and 30% new content.",
    summary:
      "Transform from a coder into a master programmer with timeless wisdom on craftsmanship, best practices, and professional growth.",
    pages: 352,
    publishDate: "2019-09-13",
    coverUrl: "/images/book-6.png",
    totalCopies: 6,
    availableCopies: 4,
    createdAt: "2024-01-28T11:20:00Z",
    info: {
      title: "The Pragmatic Programmer: Your Journey to Mastery",
      coverUrl: "/images/book-6.png",
    },
  },
];

export const mockTableBorrowedBooks: TableBorrowRecord[] = [
  {
    userInfo: {
      fullname: "Isabella Santos",
      email: "isabella.santos@example.com",
      profileImage: "https://i.pravatar.cc/150?img=9",
    },
    bookInfo: {
      title: "Cracking the Coding Interview",
      coverUrl: "/images/book-2.png",
    },
    status: "BORROWED",
    borrowedDate: "2025-12-20T10:30:00Z",
    returnDate: "",
    dueDate: "2026-01-20T23:59:59Z",
  },

  {
    userInfo: {
      fullname: "Roberto Vargas",
      email: "roberto.vargas@example.com",
      profileImage: "https://i.pravatar.cc/150?img=11",
    },
    bookInfo: {
      title: "The Design of Everyday Things",
      coverUrl: "/images/book-3.png",
    },
    status: "RETURNED",
    borrowedDate: "2025-11-20T14:15:00Z",
    returnDate: "2025-12-10T09:45:00Z",
    dueDate: "2025-12-20T23:59:59Z",
  },

  {
    userInfo: {
      fullname: "Valentina Morales",
      email: "valentina.morales@example.com",
      profileImage: "https://i.pravatar.cc/150?img=20",
    },
    bookInfo: {
      title:
        "Everything You Need to Ace Computer Science and Coding in One Big Fat Notebook",
      coverUrl: "/images/book-4.png",
    },
    status: "OVERDUE",
    borrowedDate: "2025-11-01T09:00:00Z",
    returnDate: "",
    dueDate: "2025-12-01T23:59:59Z",
  },

  {
    userInfo: {
      fullname: "Isabella Santos",
      email: "isabella.santos@example.com",
      profileImage: "https://i.pravatar.cc/150?img=9",
    },
    bookInfo: {
      title: "Designing Data-Intensive Applications",
      coverUrl: "/images/book-5.png",
    },
    status: "LATE_RETURN",
    borrowedDate: "2025-10-10T11:20:00Z",
    returnDate: "2025-11-15T16:30:00Z",
    dueDate: "2025-11-10T23:59:59Z",
  },
];

export const mockTableAccountRequest: AccountRequest[] = [
  {
    userInfo: {
      fullname: "Isabella Santos",
      email: "isabella.santos@example.com",
      profileImage: "https://i.pravatar.cc/150?img=9",
    },
    createdAt: "2024-12-15T10:30:00Z",
    universityId: "2024-0001",
    status: "PENDING",
  },
  {
    userInfo: {
      fullname: "Roberto Vargas",
      email: "roberto.vargas@example.com",
      profileImage: "https://i.pravatar.cc/150?img=11",
    },
    createdAt: "2024--22T10:30:00Z",
    universityId: "2024-0001",
    status: "APPROVED",
  },
  {
    userInfo: {
      fullname: "Valentina Morales",
      email: "valentina.morales@example.com",
      profileImage: "https://i.pravatar.cc/150?img=20",
    },
    createdAt: "2024-04-31T10:30:00Z",
    universityId: "2024-0001",
    status: "APPROVED",
  },
  {
    userInfo: {
      fullname: "Isabella Santos",
      email: "isabella.santos@example.com",
      profileImage: "https://i.pravatar.cc/150?img=9",
    },
    createdAt: "2024-01-15T10:30:00Z",
    universityId: "2024-0001",
    status: "REJECTED",
  },
  {
    userInfo: {
      fullname: "Roberto Vargas",
      email: "roberto.vargas@example.com",
      profileImage: "https://i.pravatar.cc/150?img=11",
    },
    createdAt: "2024-09-11T10:30:00Z",
    universityId: "2024-0001",
    status: "PENDING",
  },
];
