import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Question from './models/Question.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing users and questions
    await User.deleteMany({});
    await Question.deleteMany({});

    // Create a dummy user
    const dummyPassword = await bcrypt.hash('password123', 10);
    const dummyUser = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: dummyPassword,
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=testuser'
    });

    console.log('👤 Dummy user created:', dummyUser.username);

    // Create dummy questions
    const questions = [
      {
        title: 'How to handle async/await with error handling in React?',
        description: 'I\'m trying to implement proper error handling with async/await in my React component. What\'s the best practice?',
        tags: ['React', 'JavaScript', 'Async'],
        author: dummyUser._id,
        views: 120,
        votes: [],
        answersCount: 2
      },
      {
        title: 'TypeScript generic constraints not working as expected',
        description: 'I have a generic function with constraints but TS allows invalid types. Here\'s my code...',
        tags: ['TypeScript', 'Generics'],
        author: dummyUser._id,
        views: 95,
        votes: [],
        answersCount: 0
      },
      {
        title: 'CSS Grid vs Flexbox - When to use which?',
        description: 'I\'m confused about when I should use CSS Grid versus Flexbox. Key differences and use cases?',
        tags: ['CSS', 'Grid', 'Flexbox'],
        author: dummyUser._id,
        views: 210,
        votes: [],
        answersCount: 4
      },
      {
        title: 'Node.js memory leak in production - help needed!',
        description: 'My Node.js app is leaking memory in production. Tried heapdump but couldn\'t pinpoint the issue.',
        tags: ['Node.js', 'Memory', 'Production'],
        author: dummyUser._id,
        views: 180,
        votes: [],
        answersCount: 1
      },
      {
        title: 'Best practices for React state management in 2024?',
        description: 'With options like Redux, Zustand, Context, what are the best practices for state management?',
        tags: ['React', 'State Management', 'Redux'],
        author: dummyUser._id,
        views: 445,
        votes: [],
        answersCount: 5
      }
    ];

    const insertedQuestions = await Question.insertMany(questions);
    console.log(`❓ Seeded ${insertedQuestions.length} questions`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedDatabase();
