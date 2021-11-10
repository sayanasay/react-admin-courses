const courses = [
  {
    id: 1,
    title: "Software Development Processes and Methodologies",
    slug: "software-processes",
    authorId: 1,
    category: "Software Practices",
  },
  {
    id: 2,
    title: "JavaScript Basics",
    slug: "javascript-basics",
    authorId: 2,
    category: "JavaScript",
  },
  {
    id: 3,
    title: "Front-End Web Development with React",
    slug: "front-end-react",
    authorId: 3,
    category: "JavaScript",
  },
  {
    id: 4,
    title: "Front-End JavaScript Frameworks: Angular",
    slug: "angular",
    authorId: 3,
    category: "JavaScript",
  },
  {
    id: 5,
    title: "Animation with JavaScript and jQuery",
    slug: "animation-javascript-jquery",
    authorId: 2,
    category: "JavaScript",
  },
  {
    id: 6,
    title: "Data Manipulation in JavaScript",
    slug: "javascript-data-manipulation",
    authorId: 2,
    category: "JavaScript",
  },
  {
    id: 7,
    title: "Lean Software Development",
    slug: "lean-software-development",
    authorId: 1,
    category: "Software Practices",
  },
  {
    id: 8,
    title: "Design patterns",
    slug: "design-patterns",
    authorId: 4,
    category: "Software Architecture",
  },
  {
    id: 9,
    title: "Software architecture",
    slug: "software-architecture",
    authorId: 4,
    category: "Software Architecture",
  },
  {
    id: 10,
    title: "Object-oriented design",
    slug: "object-oriented-design",
    authorId: 4,
    category: "Software Architecture",
  },
];

const authors = [
  { id: 1, name: "Praveen Mittal" },
  { id: 2, name: "William Mead" },
  { id: 3, name: "Jogesh K. Muppala" },
  { id: 4, name: "Kenny Wong" },
];

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: "",
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCourse,
  courses,
  authors,
};
