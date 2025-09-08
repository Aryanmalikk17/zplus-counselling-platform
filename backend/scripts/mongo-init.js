// Switch to the application database
db = db.getSiblingDB('zplus_content');

// Create collections with validation
db.createCollection('assessments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['testType', 'title', 'questions'],
      properties: {
        testType: { bsonType: 'string' },
        title: { bsonType: 'string' },
        questions: { bsonType: 'array' }
      }
    }
  }
});

db.createCollection('articles', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'content', 'author'],
      properties: {
        title: { bsonType: 'string' },
        content: { bsonType: 'string' },
        author: { bsonType: 'string' }
      }
    }
  }
});

// Create indexes
db.assessments.createIndex({ 'testType': 1 });
db.articles.createIndex({ 'category': 1, 'publishedAt': -1 });

print('MongoDB initialization completed');
