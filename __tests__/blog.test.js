const { getBlog, getBlogs, getComments } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');


describe('creates blog', () => {
  it('creates a blog', () => {
    return request(app)
      .post('/api/v1/blogs')
      .send({
        author: 'Author test',
        title: 'Title test',
        content: 'blah blah'
      })

      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          author: 'Author test',
          title: 'Title test',
          content: 'blah blah',
          __v: 0
        });
      });
  });

  it('gets a blog by id', async() => {
    const blog = await getBlog();
    // need comments as well since we are populating in route
    const comments = await getComments({ blogId: blog._id });

    return request(app)
      .get(`/api/v1/blogs/${blog._id}`)
      .then(res => {
        // {
        //   _id: '1111',
        //   author: 'spot',
        //   content: 'my blog',
        //   comments: [
        //     { },
        //     { },
        //     {}
        //   ]
        //   __v: 0
        // }
        expect(res.body).toEqual({
          ...blog,
          comments // because we populate in route
        });
        // expect(res.body).toEqual({
        //   _id: expect.any(String),
        //   author: 'test',
        //   content: 'test 1234',
        //   comments: expect.any(Array),
        //   __v: 0
        // });
        // expect(res.body.comments).toEqual(JSON.parse(JSON.stringify(comments)));
      });
  });

  it('gets all blogs', async() => {
    const blogs = await getBlogs();

    return request(app)
      .get('/api/v1/blogs')
      .then(res => {
        expect(res.body).toEqual(blogs);
        // expect(res.body).toHaveLength(3);
        // blogs.forEach(blog => {
        //   expect(res.body).toContainEqual({
        //     ...blog.toJSON(),
        //     _id: blog.id
        //   });
        // });
      });
  });

  it('updates a blog by id', async() => {
    const blog = await getBlog();

    return request(app)
      .patch(`/api/v1/blogs/${blog._id}`)
      .send({ content: '1234 test' })
      .then(res => {
        expect(res.body).toEqual({
          ...blog,
          content: '1234 test'
        });
        // expect(res.body).toEqual({
        //   _id: expect.any(String),
        //   author: 'test',
        //   content: '1234 test',
        //   __v: 0
        // });
      });
  });

  it('deletes a blog by id', async() => {
    const blog = await getBlog();
    
    return request(app)
      .delete(`/api/v1/blogs/${blog._id}`)
      .then(res => {
        expect(res.body).toEqual(blog);
        // expect(res.body).toEqual({
        //   _id: expect.any(String),
        //   author: 'test',
        //   content: 'test 1234',
        //   __v: 0
        // });
      });
  });
});
