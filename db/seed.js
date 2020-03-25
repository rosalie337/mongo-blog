const Blog = require('../lib/models/Blog');
const Comment = require('../lib/routes/comment');
const chance = require('chance').Chance();

// specifying the number of blogs to create with our seed function
module.exports = async({ blogsToCreate = 10, commentsToCreate = 50 } = {}) => {
  // creating blogs
  // creating an array of blogsToCreate length
  // map through the array
  // -> for each item in the array we create an object with { author, title, content }
  // for each blog in the mapped array we create a blog in our mongodb
  const authors = ['foreverYoung', 'tooCoolForSchool', 'bbGurl4Ever'];
  const blogs = await Blog.create([...Array(blogsToCreate)].map(() => ({
    author: chance.pickone(authors),
    title: chance.sentence(),
    content: chance.paragraph({ sentences: 2 })
  })));
  await Comment.create([...Array(commentsToCreate)].map(() => ({
    blogId: chance.pickone(blogs)._id,
    author: chance.pickone(authors),
    content: chance.sentence()
  })));
};
